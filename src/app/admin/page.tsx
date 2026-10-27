"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Package,
  MessageSquare,
  CreditCard,
  Mail,
  ExternalLink,
  LogOut,
  Loader2,
} from "lucide-react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import {
  BlogItem,
  ProductItem,
  InquiryItem,
  SubscriberItem,
  getBlogs,
  getProducts,
  getInquiries,
  getSubscribers,
} from "@/lib/firebase/services";
import { AdminOverview } from "@/components/admin/AdminOverview";
import { BlogManager } from "@/components/admin/BlogManager";
import { ProductManager } from "@/components/admin/ProductManager";
import { InquiriesManager } from "@/components/admin/InquiriesManager";
import { StripeOrdersManager, StripeOrder } from "@/components/admin/StripeOrdersManager";
import { SubscribersManager } from "@/components/admin/SubscribersManager";
import { Button } from "@/components/ui/button";
import { useLinkClickEvent } from "@/hooks/useLinkClickEvent";

export default function AdminPage() {
  const router = useRouter();
  const handleLinkClick = useLinkClickEvent();

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [activeTab, setActiveTab] = useState<string>("overview");
  const [loading, setLoading] = useState(true);

  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [subscribers, setSubscribers] = useState<SubscriberItem[]>([]);
  const [orders, setOrders] = useState<StripeOrder[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Authentication guard
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/admin/login");
      } else {
        setCurrentUser(user);
        setCheckingAuth(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.replace("/admin/login");
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [fetchedBlogs, fetchedProducts, fetchedInquiries, fetchedSubscribers] =
        await Promise.all([
          getBlogs(),
          getProducts(),
          getInquiries(),
          getSubscribers(),
        ]);

      setBlogs(fetchedBlogs);
      setProducts(fetchedProducts);
      setInquiries(fetchedInquiries);
      setSubscribers(fetchedSubscribers);
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadOrders = useCallback(async () => {
    setLoadingOrders(true);
    try {
      const res = await fetch("/api/admin/stripe/orders");
      const data = await res.json();
      if (data.orders) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error("Failed to load Stripe orders:", err);
    } finally {
      setLoadingOrders(false);
    }
  }, []);

  const refreshAll = useCallback(() => {
    loadData();
    loadOrders();
  }, [loadData, loadOrders]);

  useEffect(() => {
    if (!checkingAuth) {
      refreshAll();
    }
  }, [checkingAuth, refreshAll]);

  const newInquiriesCount = inquiries.filter((i) => i.status === "new").length;

  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "blogs", label: "Blogs", icon: BookOpen, badge: blogs.length },
    { id: "products", label: "Products", icon: Package, badge: products.length },
    {
      id: "inquiries",
      label: "Inquiries",
      icon: MessageSquare,
      badge: newInquiriesCount > 0 ? `${newInquiriesCount} new` : inquiries.length,
      badgeHighlight: newInquiriesCount > 0,
    },
    { id: "subscribers", label: "Newsletter", icon: Mail, badge: subscribers.length },
    { id: "stripe", label: "Stripe & Refunds", icon: CreditCard, badge: orders.length },
  ];

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="size-8 animate-spin text-brand" />
          <p className="text-sm text-muted-foreground font-medium">Loading admin workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur-md">
        <div className="container-page flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center group"
              onClick={(e) => handleLinkClick(e, "/")}
            >
              <img
                src="/images/logo.png"
                className="h-12 sm:h-14 w-auto object-contain"
                alt="Logo"
              />
              <span className="text-base sm:text-xl px-1 py-0.5 text-ink text-left font-semibold uppercase tracking-wider font-script">
                Admin Dashboard
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-1">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-medium px-1 py-1.5 rounded-md hover:bg-muted transition-colors"
            >
              <span>View Website</span>
              <ExternalLink className="size-3.5" />
            </Link>

            {currentUser && (
              <div className="hidden sm:flex flex-col text-left border-l border-border pl-3 pr-3">
                <span className="text-[10px] text-muted-foreground">Admin</span>
                <span className="text-xs font-medium text-foreground max-w-[150px]">
                  {currentUser.email}
                </span>
              </div>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="h-8 gap-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer"
            >
              <LogOut className="size-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="container-page sm:py-24 py-10 flex-1">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-border scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-brand text-primary-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                <Icon className="size-4" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={`ml-1 px-1.5 py-0.5 text-xs rounded-full font-medium ${
                      isActive
                        ? "bg-ink text-ink-foreground"
                        : tab.badgeHighlight
                          ? "bg-emerald-500 text-white font-bold animate-pulse"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <div className="mt-4">
          {activeTab === "overview" && (
            <AdminOverview
              stats={{
                blogsCount: blogs.length,
                productsCount: products.length,
                inquiriesCount: inquiries.length,
                ordersCount: orders.length,
                newInquiriesCount,
                subscribersCount: subscribers.length,
              }}
              loading={loading || loadingOrders}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onRefresh={refreshAll}
            />
          )}

          {activeTab === "blogs" && <BlogManager blogs={blogs} loading={loading} onRefresh={loadData} />}

          {activeTab === "products" && <ProductManager products={products} loading={loading} onRefresh={loadData} />}

          {activeTab === "inquiries" && (
            <InquiriesManager inquiries={inquiries} loading={loading} onRefresh={loadData} />
          )}

          {activeTab === "subscribers" && (
            <SubscribersManager subscribers={subscribers} loading={loading} onRefresh={loadData} />
          )}

          {activeTab === "stripe" && (
            <StripeOrdersManager orders={orders} loading={loadingOrders} onRefresh={loadOrders} />
          )}
        </div>
      </div>
    </div>
  );
}
