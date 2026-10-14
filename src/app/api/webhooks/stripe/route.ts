import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";


// NOT YET INTEGRATED!!!


export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { error: "Missing stripe-signature header." },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown";
    console.error(`⚠️  Webhook signature verification failed: ${message}`);
    return NextResponse.json(
      { error: "Invalid signature." },
      { status: 400 }
    );
  }

  /* ────────────────────────────────────────────
   * Handle relevant Stripe events
   * ──────────────────────────────────────────── */
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("✅ Payment succeeded!", {
        email: session.customer_email,
        amount: session.amount_total,
        currency: session.currency,
        metadata: session.metadata,
      });

      break;
    }

    case "checkout.session.expired": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("⏰ Checkout session expired:", session.id);
      break;
    }

    case "payment_intent.payment_failed": {
      const intent = event.data.object as Stripe.PaymentIntent;
      console.log(
        "❌ Payment failed:",
        intent.last_payment_error?.message
      );
      break;
    }

    default:
      console.log(`ℹ️  Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
