"use client";

import { useState } from "react";
import { CreditCard, RotateCcw, Search, CheckCircle, AlertCircle, RefreshCw, X, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export interface StripeOrder {
  id: string;
  created: number;
  customerName: string;
  customerEmail: string;
  amountTotal: number;
  amountRefunded: number;
  currency: string;
  paymentStatus: string;
  refundStatus: "none" | "partial" | "full";
  paymentIntentId: string | null;
  metadata: Record<string, string>;
  items: Array<{
    description: string;
    quantity: number;
    amount: number;
  }>;
}

interface StripeOrdersManagerProps {
  orders: StripeOrder[];
  loading: boolean;
  onRefresh: () => void;
}

export function StripeOrdersManager({ orders, loading, onRefresh }: StripeOrdersManagerProps) {
  const [search, setSearch] = useState("");
  const [refundModalOrder, setRefundModalOrder] = useState<StripeOrder | null>(null);
  const [refundAmount, setRefundAmount] = useState<string>("");
  const [refundReason, setRefundReason] = useState<string>("requested_by_customer");
  const [processingRefund, setProcessingRefund] = useState(false);

  const openRefundModal = (order: StripeOrder) => {
    setRefundModalOrder(order);
    const remainingCents = order.amountTotal - order.amountRefunded;
    setRefundAmount((remainingCents / 100).toFixed(2));
    setRefundReason("requested_by_customer");
  };

  const handleProcessRefund = async () => {
    if (!refundModalOrder) return;

    const amountInDollars = parseFloat(refundAmount);
    if (isNaN(amountInDollars) || amountInDollars <= 0) {
      toast.error("Please enter a valid refund amount.");
      return;
    }

    const amountInCents = Math.round(amountInDollars * 100);
    const maxRefundable = refundModalOrder.amountTotal - refundModalOrder.amountRefunded;

    if (amountInCents > maxRefundable) {
      toast.error(`Refund amount cannot exceed remaining balance of $${(maxRefundable / 100).toFixed(2)}.`);
      return;
    }

    setProcessingRefund(true);
    try {
      const res = await fetch("/api/admin/stripe/refund", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentIntentId: refundModalOrder.paymentIntentId,
          sessionId: refundModalOrder.id,
          amount: amountInCents,
          reason: refundReason,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Refund request failed.");
      }

      toast.success(`Successfully refunded $${amountInDollars.toFixed(2)} to customer!`);
      setRefundModalOrder(null);
      onRefresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to process refund.");
    } finally {
      setProcessingRefund(false);
    }
  };

  const filtered = orders.filter((o) => {
    const q = search.toLowerCase();
    return (
      o.customerName.toLowerCase().includes(q) ||
      o.customerEmail.toLowerCase().includes(q) ||
      o.id.toLowerCase().includes(q) ||
      o.items.some((it) => it.description.toLowerCase().includes(q))
    );
  });

  const formatCurrency = (cents: number, currency: string) => {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: currency.toUpperCase() || "AUD",
    }).format(cents / 100);
  };

  return (
    <div className="space-y-6">
      {/* Search & Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders by customer, email, or service..."
            className="pl-9"
          />
        </div>
        <Button variant="outline" size="sm" onClick={onRefresh} disabled={loading} className="gap-2">
          <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Orders Table */}
      <div className="rounded-xl border border-border bg-card shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/60 text-xs text-muted-foreground uppercase tracking-wider border-b border-border">
              <tr>
                <th className="px-5 py-3.5">Customer & Date</th>
                <th className="px-5 py-3.5">Service / Item</th>
                <th className="px-5 py-3.5">Amount</th>
                <th className="px-5 py-3.5">Payment Status</th>
                <th className="px-5 py-3.5">Refund Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground">
                    <RefreshCw className="size-6 animate-spin mx-auto mb-2 text-primary" />
                    Fetching latest orders from Stripe...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground">
                    No Stripe checkout orders found.
                  </td>
                </tr>
              ) : (
                filtered.map((order) => {
                  const dateStr = new Date(order.created * 1000).toLocaleDateString("en-AU", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });
                  const isPaid = order.paymentStatus === "paid";
                  const canRefund = isPaid && order.refundStatus !== "full" && order.paymentIntentId;

                  return (
                    <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-foreground">{order.customerName}</p>
                        <p className="text-xs text-muted-foreground">{order.customerEmail}</p>
                        <span className="text-[11px] text-muted-foreground/80">{dateStr}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="space-y-0.5 max-w-xs">
                          {order.items.length > 0 ? (
                            order.items.map((it, idx) => (
                              <p key={idx} className="text-xs font-medium text-foreground">
                                {it.quantity > 1 ? `${it.quantity}x ` : ""}
                                {it.description}
                              </p>
                            ))
                          ) : (
                            <p className="text-xs text-muted-foreground">
                              {order.metadata?.type ? `${order.metadata.type}: ${order.metadata.slug}` : "Booking Order"}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap font-medium text-foreground">
                        {formatCurrency(order.amountTotal, order.currency)}
                        {order.amountRefunded > 0 && (
                          <span className="block text-[11px] text-destructive">
                            -{formatCurrency(order.amountRefunded, order.currency)} refunded
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        {isPaid ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 px-2.5 py-0.5 text-xs font-semibold">
                            <CheckCircle className="size-3" /> Paid
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-muted text-muted-foreground px-2.5 py-0.5 text-xs font-semibold">
                            {order.paymentStatus}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        {order.refundStatus === "full" ? (
                          <span className="inline-flex items-center rounded-full bg-destructive/10 text-destructive px-2.5 py-0.5 text-xs font-semibold">
                            Fully Refunded
                          </span>
                        ) : order.refundStatus === "partial" ? (
                          <span className="inline-flex items-center rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 px-2.5 py-0.5 text-xs font-semibold">
                            Partially Refunded
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">None</span>
                        )}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-right">
                        {canRefund ? (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => openRefundModal(order)}
                            className="h-8 gap-1.5 text-xs font-medium"
                          >
                            <RotateCcw className="size-3.5" />
                            Refund
                          </Button>
                        ) : (
                          <span className="text-xs text-muted-foreground italic">
                            {!isPaid ? "Unpaid" : "Refunded"}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Refund Confirmation Modal */}
      {refundModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-2xl bg-card border border-border p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2 text-destructive">
                <ShieldAlert className="size-5" />
                <h3 className="text-lg font-bold text-foreground">Issue Stripe Refund</h3>
              </div>
              <button
                onClick={() => setRefundModalOrder(null)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-md"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="mt-5 space-y-4 text-sm">
              <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Customer:</span>
                  <span className="font-semibold text-foreground">{refundModalOrder.customerName}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="text-foreground">{refundModalOrder.customerEmail}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Original Charge:</span>
                  <span className="font-semibold text-foreground">
                    {formatCurrency(refundModalOrder.amountTotal, refundModalOrder.currency)}
                  </span>
                </div>
                {refundModalOrder.amountRefunded > 0 && (
                  <div className="flex justify-between text-xs text-destructive">
                    <span>Already Refunded:</span>
                    <span>-{formatCurrency(refundModalOrder.amountRefunded, refundModalOrder.currency)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs pt-1 border-t border-border">
                  <span className="text-muted-foreground">Remaining Refundable:</span>
                  <span className="font-bold text-foreground">
                    {formatCurrency(
                      refundModalOrder.amountTotal - refundModalOrder.amountRefunded,
                      refundModalOrder.currency
                    )}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="refund-amount">Refund Amount ({refundModalOrder.currency.toUpperCase()})</Label>
                <Input
                  id="refund-amount"
                  type="number"
                  step="0.01"
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(e.target.value)}
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="refund-reason">Refund Reason</Label>
                <select
                  id="refund-reason"
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="requested_by_customer">Customer Request / Cancellation</option>
                  <option value="duplicate">Duplicate Charge</option>
                  <option value="fraudulent">Fraudulent Charge</option>
                </select>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Refunding directly credits the customer&apos;s original payment method via Stripe. Stripe processing
                fees are non-reversible.
              </p>

              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setRefundModalOrder(null)}
                  disabled={processingRefund}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleProcessRefund}
                  disabled={processingRefund}
                  className="gap-2"
                >
                  <RotateCcw className={`size-4 ${processingRefund ? "animate-spin" : ""}`} />
                  {processingRefund ? "Processing..." : "Confirm & Execute Refund"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
