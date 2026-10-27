"use client";

import { useState } from "react";
import { Search, Mail, Phone, Calendar, Trash2, CheckCircle2, Clock, Inbox, Eye, X, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InquiryItem, updateInquiryStatus, deleteInquiry } from "@/lib/firebase/services";
import { toast } from "sonner";

interface InquiriesManagerProps {
  inquiries: InquiryItem[];
  loading?: boolean;
  onRefresh: () => void;
}

export function InquiriesManager({ inquiries, loading, onRefresh }: InquiriesManagerProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "new" | "in_progress" | "resolved">("all");
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);

  const handleStatusChange = async (id: string, newStatus: InquiryItem["status"]) => {
    try {
      await updateInquiryStatus(id, newStatus);
      toast.success(`Inquiry marked as ${newStatus.replace("_", " ")}`);
      onRefresh();
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry({ ...selectedInquiry, status: newStatus });
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update status.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this customer inquiry?")) return;
    try {
      await deleteInquiry(id);
      toast.success("Inquiry removed.");
      onRefresh();
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
    } catch (err: any) {
      toast.error(err.message || "Failed to delete inquiry.");
    }
  };

  const filtered = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.email.toLowerCase().includes(search.toLowerCase()) ||
      (inq.service && inq.service.toLowerCase().includes(search.toLowerCase())) ||
      inq.message.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "all" || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: InquiryItem["status"]) => {
    switch (status) {
      case "new":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            New
          </span>
        );
      case "in_progress":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
            <Clock className="size-3" />
            In Progress
          </span>
        );
      case "resolved":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <CheckCircle2 className="size-3" />
            Resolved
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search inquiries by name, email, or content..."
            className="pl-9"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-muted/60 p-1 rounded-lg">
          {(["all", "new", "in_progress", "resolved"] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors capitalize ${
                statusFilter === st
                  ? "bg-card text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {st.replace("_", " ")}
            </button>
          ))}
        </div>

        <Button variant="outline" size="sm" onClick={onRefresh} disabled={loading} className="gap-2">
          <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Inquiries Table */}
      <div className="rounded-xl border border-border bg-card shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/60 text-xs text-muted-foreground uppercase tracking-wider border-b border-border">
              <tr>
                <th className="px-5 py-3.5">Customer</th>
                <th className="px-5 py-3.5">Service of Interest</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    <Inbox className="size-8 mx-auto mb-2 opacity-40" />
                    No inquiries match your current filter.
                  </td>
                </tr>
              ) : (
                filtered.map((inq) => (
                  <tr key={inq.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-foreground">{inq.name}</p>
                      <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mail className="size-3" /> {inq.email}
                        </span>
                        {inq.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="size-3" /> {inq.phone}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-xs font-medium">
                      {inq.service || <span className="text-muted-foreground">General Question</span>}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      {getStatusBadge(inq.status)}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-xs text-muted-foreground">
                      {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : "Recent"}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-right space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedInquiry(inq)}
                        className="h-8 gap-1.5 text-xs"
                      >
                        <Eye className="size-3.5" />
                        View
                      </Button>
                      <button
                        onClick={() => inq.id && handleDelete(inq.id)}
                        className="inline-flex p-1.5 text-destructive rounded-md hover:bg-destructive/10"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-2xl bg-card border border-border p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div>
                <h3 className="text-lg font-bold">{selectedInquiry.name}</h3>
                <p className="text-xs text-muted-foreground">
                  Received: {selectedInquiry.createdAt ? new Date(selectedInquiry.createdAt).toLocaleString() : "Recent"}
                </p>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-md"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="mt-5 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-lg bg-muted/40 border border-border">
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Email</span>
                  <p className="font-medium text-foreground">{selectedInquiry.email}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Phone</span>
                  <p className="font-medium text-foreground">{selectedInquiry.phone || "Not provided"}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Service of interest</span>
                  <p className="font-medium text-foreground">{selectedInquiry.service || "General / Not sure yet"}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Current Status</span>
                  <div className="mt-0.5">{getStatusBadge(selectedInquiry.status)}</div>
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Message</span>
                <div className="mt-1.5 p-4 rounded-lg bg-background border border-border whitespace-pre-wrap text-foreground leading-relaxed">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Status Update Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Set status:</span>
                  {(["new", "in_progress", "resolved"] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => selectedInquiry.id && handleStatusChange(selectedInquiry.id, st)}
                      className={`px-2.5 py-1 text-xs rounded-md border ${
                        selectedInquiry.status === st
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-input hover:bg-muted text-muted-foreground"
                      } capitalize`}
                    >
                      {st.replace("_", " ")}
                    </button>
                  ))}
                </div>

                <a
                  href={`mailto:${selectedInquiry.email}?subject=Regarding your Feeling Healthy enquiry`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground text-xs font-medium hover:bg-secondary/80"
                >
                  <Mail className="size-3.5" />
                  Reply via Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
