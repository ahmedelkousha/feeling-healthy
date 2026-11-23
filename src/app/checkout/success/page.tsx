import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  let session = null;

  if (session_id) {
    try {
      session = await stripe.checkout.sessions.retrieve(session_id);
    } catch {
      // invalid or expired session ID — show generic success
    }
  }

  const isProduct = session?.metadata?.type === "product";
  const amountDisplay = session?.amount_total
    ? `$${(session.amount_total / 100).toFixed(2)} ${(session.currency ?? "aud").toUpperCase()}`
    : null;

  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center pt-40 pb-20 text-center">
      <div className="grid size-20 place-items-center rounded-full bg-brand text-brand-foreground mb-6 animate-in zoom-in-75 duration-300">
        <CheckCircle2 className="size-10" />
      </div>

      <h1 className="text-2xl font-bold md:text-3xl">Payment Successful!</h1>

      <p className="mt-4 text-sm md:text-base max-w-md text-muted-foreground leading-relaxed">
        Thank you
        {session?.customer_email ? ` (${session.customer_email})` : ""}!
        {amountDisplay && (
          <>
            {" "}Your payment of <strong className="text-foreground">{amountDisplay}</strong> has
            been received.
          </>
        )}
        {" "}Our reception team will be in touch shortly to confirm your{" "}
        {isProduct ? "order and arrange delivery" : "appointment details"}.
      </p>

      {session?.metadata?.customerName && (
        <div className="mt-6 w-full max-w-sm rounded-2xl border border-brand bg-sand/50 p-5 text-xs sm:text-sm">
          <dl className="grid gap-2">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Name</dt>
              <dd className="font-medium">{session.metadata.customerName}</dd>
            </div>
            {session.metadata.slug && (
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">
                  {isProduct ? "Product" : "Service"}
                </dt>
                <dd className="font-medium">{session.metadata.slug}</dd>
              </div>
            )}
            {amountDisplay && (
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Amount Paid</dt>
                <dd className="font-semibold text-brand-dark">
                  {amountDisplay}
                </dd>
              </div>
            )}
          </dl>
        </div>
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild size="default">
          <Link href="/">Back to Home</Link>
        </Button>
        <Button asChild variant="outline" size="default">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </section>
  );
}
