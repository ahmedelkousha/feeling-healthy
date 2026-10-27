import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

export async function GET(req: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe secret key is not configured." },
        { status: 500 }
      );
    }

    // Fetch recent checkout sessions and recent refunds in parallel
    const [sessions, refunds] = await Promise.all([
      stripe.checkout.sessions.list({
        limit: 50,
        expand: ["data.line_items", "data.payment_intent"],
      }),
      stripe.refunds.list({ limit: 100 }),
    ]);

    // Group successful refund amounts by payment_intent ID
    const refundsByPaymentIntent = new Map<string, number>();
    for (const refund of refunds.data) {
      if (refund.status === "succeeded" && refund.payment_intent) {
        const piId =
          typeof refund.payment_intent === "string"
            ? refund.payment_intent
            : refund.payment_intent.id;
        const current = refundsByPaymentIntent.get(piId) || 0;
        refundsByPaymentIntent.set(piId, current + (refund.amount || 0));
      }
    }

    const orders = sessions.data.map((session) => {
      const pi = session.payment_intent as Stripe.PaymentIntent | null;
      const paymentIntentId =
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : pi?.id || null;

      const totalAmount = session.amount_total ?? 0;
      const amountRefunded = paymentIntentId
        ? refundsByPaymentIntent.get(paymentIntentId) || 0
        : 0;

      const isRefunded = amountRefunded >= totalAmount && totalAmount > 0;
      const isPartiallyRefunded = amountRefunded > 0 && !isRefunded;

      let refundStatus: "none" | "partial" | "full" = "none";
      if (isRefunded) refundStatus = "full";
      else if (isPartiallyRefunded) refundStatus = "partial";

      const items =
        session.line_items?.data.map((item) => ({
          description: item.description || item.price?.nickname || "Service / Product",
          quantity: item.quantity || 1,
          amount: item.amount_total,
        })) || [];

      return {
        id: session.id,
        created: session.created,
        customerName:
          session.metadata?.customerName ||
          session.customer_details?.name ||
          "Guest Customer",
        customerEmail:
          session.customer_details?.email || session.customer_email || "N/A",
        amountTotal: totalAmount,
        amountRefunded,
        currency: session.currency || "aud",
        paymentStatus: session.payment_status,
        refundStatus,
        paymentIntentId,
        metadata: session.metadata || {},
        items,
      };
    });

    return NextResponse.json({ orders });
  } catch (error: any) {
    console.error("Error fetching Stripe orders:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch Stripe orders" },
      { status: 500 }
    );
  }
}
