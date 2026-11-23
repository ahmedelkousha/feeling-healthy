import Link from "next/link";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutCancelPage() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center pt-40 pb-20 text-center">
      <div className="grid size-20 place-items-center rounded-full bg-sand text-muted-foreground mb-6 animate-in zoom-in-75 duration-300">
        <XCircle className="size-10" />
      </div>

      <h1 className="text-2xl font-bold md:text-3xl">Payment Cancelled</h1>

      <p className="mt-4 max-w-md text-sm md:text-base text-muted-foreground leading-relaxed">
        No worries — you haven&apos;t been charged. You can try again or contact
        us directly if you&apos;d prefer to arrange payment another way.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild size="default">
          <Link href="/book">Try Again</Link>
        </Button>
        <Button asChild variant="outline" size="default">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </section>
  );
}
