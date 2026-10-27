"use client";

import { useState, useEffect } from "react";
import { Check, ShoppingBag, Info, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pemfThzProducts, type PemfThzProduct } from "@/data/pemfThz";
import { getProducts } from "@/lib/firebase/services";
import { cn } from "@/lib/utils";

interface PemfThzProductsProps {
  onSelectProduct: (productId: string) => void;
}

export function PemfThzProducts({ onSelectProduct }: PemfThzProductsProps) {
  const [items, setItems] = useState<PemfThzProduct[]>(pemfThzProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalProduct, setActiveModalProduct] = useState<PemfThzProduct | null>(null);

  useEffect(() => {
    getProducts()
      .then((res) => {
        if (res && res.length > 0) setItems(res);
      })
      .catch(() => {});
  }, []);

  const categories = ["All", "Terahertz", "PEMF", "Dual-Tech"];

  const filteredProducts =
    selectedCategory === "All" ? items : items.filter((p) => p.category === selectedCategory);

  const handleOrderClick = (productId: string) => {
    onSelectProduct(productId);
    const orderFormEl = document.getElementById("order-form");
    if (orderFormEl) {
      orderFormEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="products" className="py-4 md:scroll-mt-90 scroll-mt-76">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer",
              selectedCategory === cat
                ? "bg-brand text-brand-foreground shadow-sm scale-105"
                : "bg-sand text-muted-foreground hover:bg-sand/70",
            )}
          >
            {cat === "All" ? "All Products" : `${cat} Series`}
          </button>
        ))}
      </div>

      {/* Product Cards Grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="relative flex flex-col justify-between overflow-hidden rounded-xl border-2 border-border/80 bg-card p-6 shadow-soft transition-all duration-300 hover:shadow-lift hover:border-brand/50"
          >
            {/* <div className="absolute top-5 left-5  flex flex-wrap gap-1.5 z-10">
              {product.badge && (
                <span className="rounded-full bg-brand px-3 py-1 text-[0.7rem] font-bold text-brand-foreground shadow-sm">
                  {product.badge}
                </span>
              )}
              <span className="rounded-full bg-ink/80 backdrop-blur-md px-2.5 py-1 text-[0.68rem] font-medium text-ink-foreground">
                {product.category}
              </span>
            </div> */}
            <div>
              {/* Product Image & Badges */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="size-full object-cover transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Title & Price */}
              <div className="mt-5 flex items-center justify-between gap-2">
                <div>
                  <h3 className="font-display text-base md:text-lg font-bold leading-snug text-foreground">
                    {product.name}
                  </h3>
                  {/* <p className="text-xs text-muted-foreground font-medium mt-0.5">{product.tagline}</p> */}
                </div>
                <span className="shrink-0 rounded-lg bg-sand px-3 py-1 text-sm font-extrabold text-brand-dark">
                  {product.price}
                </span>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                {product.description}
              </p>

              {/* Benefits Bullet List */}
              {/* <div className="mt-4 pt-3 border-t border-border/60">
                <p className="text-[0.7rem] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  Key Benefits
                </p>
                <ul className="space-y-1.5">
                  {product.benefits.slice(0, 3).map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-foreground/90 leading-tight">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-brand-dark" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div> */}
            </div>

            {/* Card Action Footer */}
            <div className="mt-6 pt-4 border-t border-border/60 flex flex-col gap-2">
              <Button
                onClick={() => handleOrderClick(product.id)}
                className="w-full gap-2 font-semibold shadow-sm"
                size="default"
              >
                <ShoppingBag className="size-4" />
                <span>Order {product.name.split(" ")[0]}</span>
                <ArrowDown className="size-3.5 ml-auto opacity-70" />
              </Button>

              <button
                type="button"
                onClick={() => setActiveModalProduct(product)}
                className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground py-1 transition-colors cursor-pointer"
              >
                <Info className="size-3.5" />
                <span>View Full Specifications</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Specifications Quick Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-lg bg-background border border-border p-6 sm:p-8 shadow-lift max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="rounded-full bg-sand px-3 py-1 text-xs font-bold text-muted-foreground">
                  {activeModalProduct.category}
                </span>
                <h3 className="mt-2 font-display text-2xl font-bold text-foreground">
                  {activeModalProduct.name}
                </h3>
                <p className="text-sm font-semibold text-brand-dark mt-0.5">
                  {activeModalProduct.price}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalProduct(null)}
                className="rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-foreground cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {activeModalProduct.description}
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  All Key Benefits
                </h4>
                <ul className="space-y-2">
                  {activeModalProduct.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand-dark" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg bg-sand/60 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground/80 mb-2">
                  Technical Specifications
                </h4>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {activeModalProduct.specs.map((spec, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-brand-dark shrink-0" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <Button
                onClick={() => {
                  const id = activeModalProduct.id;
                  setActiveModalProduct(null);
                  handleOrderClick(id);
                }}
                className="flex-1 gap-2 cursor-pointer"
              >
                <ShoppingBag className="size-4" />
                <span>Select & Place Order</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => setActiveModalProduct(null)}
                className="cursor-pointer"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
