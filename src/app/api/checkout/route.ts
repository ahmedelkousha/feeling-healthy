import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { services } from "@/data/services";
import { pemfThzProducts } from "@/data/pemfThz";

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

    /* ────────────────────────────────────────────
     * Look up price SERVER-SIDE so clients can't
     * tamper with the amount they're charged.
     * ──────────────────────────────────────────── */
    let itemName: string;
    let unitAmount: number;
    let currency: string = "aud";
    let description: string;

    if (type === "service") {
      const service = services.find((s) => s.slug === slug);
      if (!service) {
        return NextResponse.json(
          { error: `Service "${slug}" not found.` },
          { status: 400 }
        );
      }
      itemName = service.name;
      unitAmount = service.priceInCents;
      currency = "aud";
      description = `Feeling Healthy — ${service.name} appointment`;
    } else if (type === "product") {
      const product = pemfThzProducts.find((p) => p.id === slug);
      if (!product) {
        return NextResponse.json(
          { error: `Product "${slug}" not found.` },
          { status: 400 }
        );
      }
      itemName = product.name;
      unitAmount = product.priceInCents;
      currency = product.currency;
      description = `Feeling Healthy — ${product.name} device`;
    } else {
      return NextResponse.json(
        { error: "Invalid type. Must be 'service' or 'product'." },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create(
      {
        mode: "payment",
        customer_email: customerEmail || undefined,
        currency,
        line_items: [
          {
            price_data: {
              currency,
              product_data: {
                name: itemName,
                description,
              },
              unit_amount: unitAmount,
            },
            quantity: quantity || 1,
          },
        ],
        metadata: {
          type,
          slug,
          customerName: customerName || "",
          ...metadata,
        },
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/cancel`,
      },
      {
        idempotencyKey: slug,
      }
    );

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    console.error("Stripe checkout error:", err);
    const message =
      err instanceof Error ? err.message : "Unknown error creating checkout session.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
