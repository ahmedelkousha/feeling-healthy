import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { services } from "@/data/services";
import { pemfThzProducts } from "@/data/pemfThz";
import { getProducts, ProductItem } from "@/lib/firebase/services";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      type, // "service" | "product"
      slug, // service slug or product ID — used for server-side price lookup
      quantity,
      customerEmail,
      customerName,
      metadata,
    } = body;

    // Whole number between 1 and 10
    const qty = Math.min(Math.max(Math.floor(Number(quantity)) || 1, 1), 10);

    /* ────────────────────────────────────────────
     * Look up price SERVER-SIDE so clients can't
     * tamper with the amount they're charged.
     * ──────────────────────────────────────────── */
    let itemName: string;
    let unitAmount: number;
    let currency: string = "aud";
    let description: string;
    let feePercent = 0;

    if (type === "service") {
      const service = services.find((s) => s.slug === slug);
      if (!service) {
        return NextResponse.json({ error: `Service "${slug}" not found.` }, { status: 400 });
      }
      const option = service.options?.find((o) => o.id === body.optionId);
      itemName = option ? `${service.name} (${option.name})` : service.name;
      unitAmount = option ? option.priceInCents : service.priceInCents;
      currency = "aud";
      description = option?.note || `Feeling Healthy — ${itemName} appointment`;
    } else if (type === "product") {
      const allProducts = await getProducts();
      const product: ProductItem | undefined =
        allProducts.find((p) => p.id === slug) || pemfThzProducts.find((p) => p.id === slug);
      if (!product) {
        return NextResponse.json({ error: `Product "${slug}" not found.` }, { status: 400 });
      }
      itemName = product.name;
      unitAmount = product.priceInCents;
      currency = product.currency;
      description = `Feeling Healthy — ${product.name} device`;
      feePercent = Math.min(100, Math.max(0, Number(product.feePercent) || 0));
    } else {
      return NextResponse.json(
        { error: "Invalid type. Must be 'service' or 'product'." },
        { status: 400 },
      );
    }

    /* ────────────────────────────────────────────
     * Fee = percentage of the subtotal (price × qty),
     * rounded to the nearest cent. Same formula as the
     * order form so the totals match.
     * ──────────────────────────────────────────── */
    const subtotalInCents = unitAmount * qty;
    const feeInCents = Math.round((subtotalInCents * feePercent) / 100);

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency,
          product_data: {
            name: itemName,
            description,
          },
          unit_amount: unitAmount,
        },
        quantity: qty,
      },
    ];

    if (feeInCents > 0) {
      lineItems.push({
        price_data: {
          currency,
          product_data: {
            name: `Shipping Fee (${feePercent}%)`,
          },
          unit_amount: feeInCents,
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: customerEmail || undefined,
      currency,
      line_items: lineItems,
      metadata: {
        type,
        slug,
        customerName: customerName || "",
        quantity: String(qty),
        feePercent: String(feePercent),
        feeInCents: String(feeInCents),
        ...metadata,
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    console.error("Stripe checkout error:", err);
    const message = err instanceof Error ? err.message : "Unknown error creating checkout session.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}