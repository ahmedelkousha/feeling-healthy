import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe secret key is not configured." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { paymentIntentId, sessionId, amount, reason } = body;

    let targetPaymentIntent = paymentIntentId;

    // If session ID was provided without paymentIntentId, retrieve session to get payment_intent
    if (!targetPaymentIntent && sessionId) {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (typeof session.payment_intent === "string") {
        targetPaymentIntent = session.payment_intent;
      }
    }

    if (!targetPaymentIntent) {
      return NextResponse.json(
        { error: "No valid PaymentIntent ID found for this order to refund." },
        { status: 400 }
      );
    }

    // Process refund with Stripe
    const refund = await stripe.refunds.create({
      payment_intent: targetPaymentIntent,
      amount: amount ? Math.round(amount) : undefined, // full refund if omitted
      reason: reason || "requested_by_customer",
    });

    return NextResponse.json({
      success: true,
      refundId: refund.id,
      status: refund.status,
      amount: refund.amount,
      currency: refund.currency,
    });
  } catch (error: any) {
    console.error("Stripe refund error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process refund on Stripe." },
      { status: 500 }
    );
  }
}
