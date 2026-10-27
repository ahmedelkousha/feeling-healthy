"use client";

import { useState } from "react";
import { BookOpen, Package, MessageSquare, CreditCard, Sparkles, RefreshCw, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { seedInitialData } from "@/lib/firebase/services";
import { toast } from "sonner";

interface AdminOverviewProps {
  stats: {
    blogsCount: number;
    productsCount: number;
    inquiriesCount: number;
    ordersCount: number;
    newInquiriesCount: number;
    subscribersCount: number;
  };
  loading?: boolean;
  onRefresh: () => void;
  onNavigateTab: (tab: string) => void;
}

export function AdminOverview({ stats, loading, onRefresh, onNavigateTab }: AdminOverviewProps) {
  // const [seeding, setSeeding] = useState(false);

  // const handleSeed = async () => {
  //   if (!confirm("This will upload initial blog articles and products into your Firebase Firestore. Continue?")) {
  //     return;
  //   }
  //   setSeeding(true);
  //   try {
  //     const res = await seedInitialData();
  //     toast.success(`Successfully seeded ${res.blogsCount} blogs and ${res.productsCount} products to Firebase!`);
  //     onRefresh();
  //   } catch (err: any) {
  //     toast.error(err.message || "Failed to seed data to Firebase.");
  //   } finally {
  //     setSeeding(false);
  //   }
  // };

  const cards = [
    {
      title: "Blog Articles",
      value: stats.blogsCount,
      desc: "Published guides & articles",
      icon: BookOpen,
      tab: "blogs",
      color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
    },
    {
      title: "Active Products",
      value: stats.productsCount,
      desc: "PEMF & Terahertz catalog",
      icon: Package,
      tab: "products",
      color: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
    },
    {
      title: "Customer Inquiries",
      value: stats.inquiriesCount,
      desc: `${stats.newInquiriesCount} new unread inquiries`,
      icon: MessageSquare,
      tab: "inquiries",
      color: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
    },
    {
      title: "Stripe Orders",
      value: stats.ordersCount,
      desc: "Checkout sessions & payments",
      icon: CreditCard,
      tab: "stripe",
      color: "bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300",
    },
    {
      title: "Newsletter",
      value: stats.subscribersCount,
      desc: "Subscribed contacts",
      icon: Mail,
      tab: "subscribers",
      color: "bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl bg-card p-6 shadow-soft border border-border">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Clinic & Store Dashboard</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your dynamic blog posts, product catalog, customer inquiries, and Stripe orders.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={onRefresh} disabled={loading} className="gap-2">
            <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          {/* <Button
            size="sm"
            onClick={handleSeed}
            disabled={seeding}
            className="gap-2 bg-brand/80 text-primary-foreground"
          >
            <Sparkles className="size-4" />
            {seeding ? "Seeding..." : "Seed Default Data"}
          </Button> */}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              onClick={() => onNavigateTab(card.tab)}
              className="group cursor-pointer rounded-xl bg-card p-5 shadow-soft border border-border transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">{card.title}</span>
                <div className={`rounded-lg p-2.5 ${card.color}`}>
                  <Icon className="size-5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-extrabold tracking-tight">{card.value}</span>
                <p className="mt-1 text-xs text-muted-foreground">{card.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Tips */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
        <h3 className="font-semibold text-base mb-2">Management Highlights</h3>
        <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span><strong>Blogs:</strong> Changes made here dynamically reflect on the public <code className="text-xs bg-muted px-1.5 py-0.5 rounded">/resources</code> page.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span><strong>Products:</strong> Add or modify PEMF & Terahertz devices with immediate price and image updates.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span><strong>Inquiries:</strong> Form submissions from the Contact Us page appear instantly for tracking and resolution.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span><strong>Stripe Refunds:</strong> Trigger instant, secure refunds directly to customer cards with full audit tracking.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
