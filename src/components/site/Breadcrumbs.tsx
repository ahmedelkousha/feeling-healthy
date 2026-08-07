import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string; to?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        <li>
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
        </li>
        {items.map((item, i) => {
          const href = item.href || item.to;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              <ChevronRight className="size-3.5 shrink-0" aria-hidden="true" />
              {href && i < items.length - 1 ? (
                <Link href={href} className="hover:text-foreground">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="font-medium text-foreground">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export const breadcrumbJsonLd = (items: { name: string; item: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((entry, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: entry.name,
    item: entry.item,
  })),
});
