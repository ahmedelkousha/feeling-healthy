import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative overflow-hidden z-0 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium cursor-pointer transition-all duration-300 ease-[var(--ease-calm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&>*]:relative [&>*]:z-10 after:absolute after:inset-0 [-webkit-mask-image:-webkit-radial-gradient(white,black)] after:-z-10 after:[clip-path:inset(0%_0%_0%_0%_round_150%_150%_0%_0%)] after:translate-y-full hover:after:scale-140 hover:after:translate-y-0 after:transition-all after:duration-1000 after:ease-[var(--ease-calm)]",  {
    variants: {
      variant: {
            default: "bg-brand text-brand-foreground shadow-soft hover:shadow-lift after:bg-ink/10",
        ink: "bg-ink text-ink-foreground shadow-soft hover:shadow-lift after:bg-brand/80 after:text-brand-foreground hover:text-brand-foreground",
        outline: "border border-ink/25 bg-transparent text-foreground after:bg-ink/10",
        onDark: "border border-ink-foreground/30 bg-transparent text-ink-foreground after:bg-ink-foreground/15",
        onBrand: "border border-brand-foreground/25 bg-transparent text-brand-foreground after:bg-brand-foreground/15",
        secondary: "bg-secondary text-secondary-foreground after:bg-secondary-foreground/10",
        destructive: "bg-destructive text-destructive-foreground after:bg-black/20",
        ghost: "after:bg-accent",
        link: "rounded-none text-foreground underline-offset-4 hover:underline after:hidden",
      },
      size: {
        default: "h-11 px-6 text-sm",
        sm: "h-9 px-4 text-sm",
        lg: "h-13 px-8 text-base",
        xl: "h-14 px-9 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
