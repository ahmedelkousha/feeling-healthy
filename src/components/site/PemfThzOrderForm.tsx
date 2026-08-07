"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, ShoppingBag, Truck, MapPin, Sparkles, Send, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { pemfThzProducts } from "@/data/pemfThz";

interface PemfThzOrderFormProps {
  selectedProductId: string;
  onProductChange: (productId: string) => void;
}

export function PemfThzOrderForm({
  selectedProductId,
  onProductChange,
}: PemfThzOrderFormProps) {
  const [formData, setFormData] = useState({
    productId: selectedProductId || pemfThzProducts[0].id,
    quantity: "1",
    deliveryMethod: "pickup",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
    requestConsultation: true,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Sync prop changes into state
  useEffect(() => {
    if (selectedProductId) {
      setFormData((prev) => ({ ...prev, productId: selectedProductId }));
    }
  }, [selectedProductId]);

  const selectedProduct =
    pemfThzProducts.find((p) => p.id === formData.productId) || pemfThzProducts[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!formData.phone.trim()) {
      setError("Please provide a contact phone number.");
      return;
    }
    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    // Simulate submission delivery
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      productId: pemfThzProducts[0].id,
      quantity: "1",
      deliveryMethod: "pickup",
      fullName: "",
      email: "",
      phone: "",
      address: "",
      notes: "",
      requestConsultation: true,
    });
  };

  return (
    <div id="order-form" className="relative scroll-mt-24">
      <div className="overflow-hidden rounded-lg border border-brand/40 bg-card shadow-lift p-6 sm:p-10 md:p-12">
        {submitted ? (
          /* Submission Success State */
          <div className="flex flex-col items-center text-center py-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="grid size-16 place-items-center rounded-full bg-brand text-brand-dark mb-6">
              <CheckCircle2 className="size-10" />
            </div>
            <span className="rounded-full bg-sand px-3 py-1 text-xs font-bold text-brand-dark mb-2">
              Order Inquiry Received
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Thank You, {formData.fullName}!
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Your request for the <strong className="text-foreground">{selectedProduct.name}</strong> (Qty: {formData.quantity}) has been sent to our clinic reception team at Feeling Healthy.
            </p>

            <div className="mt-6 w-full max-w-md rounded-sm bg-sand/60 p-5 text-left text-xs space-y-2 border border-border/60">
              <div className="flex justify-between border-b border-border/40 pb-2">
                <span className="text-muted-foreground">Selected Product:</span>
                <span className="font-semibold text-foreground">{selectedProduct.name}</span>
              </div>
              <div className="flex justify-between border-b border-border/40 pb-2">
                <span className="text-muted-foreground">Product Price:</span>
                <span className="font-bold text-brand-dark">{selectedProduct.price}</span>
              </div>
              <div className="flex justify-between border-b border-border/40 pb-2">
                <span className="text-muted-foreground">Delivery Option:</span>
                <span className="font-semibold text-foreground">
                  {formData.deliveryMethod === "pickup" ? "Clinic Pick-up (Tweed Heads)" : "Express Shipping"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Contact Phone:</span>
                <span className="font-semibold text-foreground">{formData.phone}</span>
              </div>
            </div>

            <p className="mt-6 text-xs text-muted-foreground max-w-sm">
              We will call or email you within 1 business day to confirm payment details and arrange pick-up or dispatch.
            </p>

            <div className="mt-8 flex gap-4">
              <Button onClick={handleReset} variant="outline" className="cursor-pointer">
                Order Another Product
              </Button>
            </div>
          </div>
        ) : (
          /* Order Form */
          <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/60 pb-6 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-sand px-3 py-1 text-xs font-bold text-muted-foreground mb-2">
                  <ShoppingBag className="size-3.5" />
                  <span>Direct Product Order Request</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  Place Your PEMF / THz Order
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-xl">
                  Select your product and enter your details below. Our reception team will reach out to fulfill your order and answer any questions.
                </p>
              </div>
              <div className="rounded-sm bg-sand p-3 text-right hidden lg:block">
                <p className="text-[0.68rem] uppercase font-bold text-muted-foreground">Selected Item</p>
                <p className="text-sm font-bold text-brand-dark">{selectedProduct.name}</p>
                <p className="text-xs font-semibold text-foreground">{selectedProduct.price}</p>
              </div>
            </div>

            {error && (
              <div className="mb-6 rounded-sm bg-destructive/10 border border-destructive/20 p-4 text-xs font-semibold text-destructive">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Selection Dropdown & Quantity */}
              <div className="grid gap-6 sm:grid-cols-3">
                <div className="sm:col-span-2 space-y-2">
                  <Label htmlFor="product-select" className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Select Product to Fulfill *
                  </Label>
                  <select
                    id="product-select"
                    value={formData.productId}
                    onChange={(e) => {
                      setFormData({ ...formData, productId: e.target.value });
                      onProductChange(e.target.value);
                    }}
                    className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm font-semibold text-foreground shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
                  >
                    {pemfThzProducts.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.name} — {prod.price} ({prod.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Quantity
                  </Label>
                  <select
                    id="quantity"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full rounded-sm border border-input bg-background px-4 py-3 text-sm font-semibold text-foreground shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "unit" : "units"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Delivery Option Selector */}
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Fulfillment Method
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`flex items-center gap-3 rounded-sm border p-4 cursor-pointer transition-colors ${
                      formData.deliveryMethod === "pickup"
                        ? "border-brand bg-brand font-semibold text-foreground shadow-xs"
                        : "border-border bg-background hover:bg-sand text-muted-foreground"
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="pickup"
                      checked={formData.deliveryMethod === "pickup"}
                      onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value })}
                      className="sr-only"
                    />
                    <MapPin className="size-5 shrink-0 text-brand-dark" />
                    <div>
                      <p className="text-xs font-bold text-foreground">Clinic Pick-up (Free)</p>
                      <p className="text-[0.7rem] text-muted-foreground">17 Bay St, Tweed Heads NSW</p>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-3 rounded-sm border p-4 cursor-pointer transition-colors ${
                      formData.deliveryMethod === "shipping"
                        ? "border-brand bg-brand font-semibold text-foreground shadow-xs"
                        : "border-border bg-background hover:bg-sand text-muted-foreground"
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="shipping"
                      checked={formData.deliveryMethod === "shipping"}
                      onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value })}
                      className="sr-only"
                    />
                    <Truck className="size-5 shrink-0 text-brand-dark" />
                    <div>
                      <p className="text-xs font-bold text-foreground">Express Australia-wide Delivery</p>
                      <p className="text-[0.7rem] text-muted-foreground">Dispatched directly to your home address</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid gap-5 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="e.g. Jane Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                    className="rounded-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="e.g. 0400 123 456"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="rounded-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="e.g. jane@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="rounded-sm"
                  />
                </div>
              </div>

              {/* Address Field if Delivery Selected */}
              {formData.deliveryMethod === "shipping" && (
                <div className="space-y-2 animate-in fade-in duration-200">
                  <Label htmlFor="address" className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Shipping Address *
                  </Label>
                  <Input
                    id="address"
                    placeholder="Street address, suburb, state, postcode"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="rounded-sm"
                  />
                </div>
              )}

              {/* Special Notes & Practitioner Guidance Checkbox */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-xs font-bold uppercase tracking-wider text-foreground">
                    Special Notes or Health Goals (Optional)
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Mention any specific areas of pain, conditions, or delivery instructions..."
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="rounded-sm"
                  />
                </div>

                <label className="flex items-center gap-3 rounded-sm bg-sand/50 p-3.5 cursor-pointer hover:bg-sand transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.requestConsultation}
                    onChange={(e) => setFormData({ ...formData, requestConsultation: e.target.checked })}
                    className="size-4 rounded border-input text-brand-dark focus:ring-brand accent-brand-dark"
                  />
                  <div className="flex items-center gap-2 text-xs text-foreground font-medium">
                    <PhoneCall className="size-4 text-brand-dark shrink-0" />
                    <span>I would like Rosanna or Edmore to give me quick phone guidance on using this device.</span>
                  </div>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-between gap-4 flex-wrap">
                <p className="text-xs text-muted-foreground">
                  🔒 No payment taken immediately. We will confirm availability & invoice upon phone/email contact.
                </p>

                <Button
                  type="submit"
                  disabled={loading}
                  size="lg"
                  className="w-full sm:w-auto gap-2 font-bold px-8 shadow-soft cursor-pointer"
                >
                  {loading ? (
                    <span>Processing Order...</span>
                  ) : (
                    <>
                      <Send className="size-4" />
                      <span>Submit Order Request</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
