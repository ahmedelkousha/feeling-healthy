"use client";

import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { addInquiry } from "@/lib/firebase/services";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  service: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Please tell us a little more").max(1000),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
    const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const data = Object.fromEntries(form);
    const result = schema.safeParse(data);

    if (!result.success) {
      const next: Errors = {};
      for (const issue of result.error.issues) {
        next[issue.path[0] as keyof Errors] = issue.message;
      }
      setErrors(next);
      toast.error("Please check the highlighted fields.");
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await addInquiry({
        name: result.data.name,
        email: result.data.email,
        phone: result.data.phone || "",
        service: result.data.service || "",
        message: result.data.message,
      });

      setSent(true);
      toast.success("Message sent successfully!", {
        description: "Our clinic team will get back to you shortly.",
      });
    } catch (err: any) {
      toast.error(err.message || "Failed to submit enquiry. Please call us.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-lg bg-card p-8 shadow-soft" role="status">
        <p className="script-accent text-2xl">Thank you</p>
        <h3 className="mt-3 text-xl font-semibold">Your message has been received</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          We have recorded your enquiry and a member of the Feeling Healthy team will be in touch soon.
          If your request is urgent, please feel free to call us at {site.contact.phone}.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setSent(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-lg bg-card p-6 shadow-soft md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" error={errors.name} required />
        <Field label="Email" name="email" type="email" error={errors.email} required />
        <Field label="Phone" name="phone" type="tel" error={errors.phone} />
        <div className="grid gap-2">
          <Label htmlFor="service">Service of interest</Label>
          <select
            id="service"
            name="service"
            defaultValue=""
            className="h-11 rounded-sm border border-input bg-background px-3 text-sm"
          >
            <option value="">Not sure yet</option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 grid gap-2">
        <Label htmlFor="message">
          Message <span aria-hidden="true">*</span>
        </Label>
        <Textarea id="message" name="message" rows={5} maxLength={1000} className="rounded-sm" />
        {errors.message ? (
          <p className="text-sm text-destructive" role="alert">
            {errors.message}
          </p>
        ) : null}
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="mt-6 w-full sm:w-auto">
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string | undefined;
  required?: boolean | undefined;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>
        {label} {required ? <span aria-hidden="true">*</span> : null}
      </Label>
      <Input id={name} name={name} type={type} className="h-11 rounded-sm" />
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
