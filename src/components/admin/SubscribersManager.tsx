"use client";

import { useState } from "react";
import {
  Search,
  Mail,
  Calendar,
  Trash2,
  Download,
  Users,
  RefreshCw,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubscriberItem, deleteSubscriber } from "@/lib/firebase/services";
import { toast } from "sonner";

interface SubscribersManagerProps {
  subscribers: SubscriberItem[];
  loading?: boolean;
  onRefresh: () => void;
}

export function SubscribersManager({
  subscribers,
  loading,
  onRefresh,
}: SubscribersManagerProps) {
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, email: string) => {
    if (!confirm(`Are you sure you want to remove ${email} from the newsletter subscriber list?`)) {
      return;
    }

    setDeletingId(id);
    try {
      await deleteSubscriber(id);
      toast.success(`Removed ${email} from subscriber list.`);
      onRefresh();
    } catch (err: any) {
      console.error("Delete subscriber error:", err);
      toast.error(err.message || "Failed to delete subscriber.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleExportCSV = () => {
    if (subscribers.length === 0) {
      toast.error("No subscribers to export.");
      return;
    }

    const headers = ["Name", "Email", "Subscribed At"];
    const rows = subscribers.map((sub) => [
      `"${(sub.name || "").replace(/"/g, '""')}"`,
      `"${(sub.email || "").replace(/"/g, '""')}"`,
      `"${sub.createdAt ? new Date(sub.createdAt).toLocaleString("en-AU") : "N/A"}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `feeling-healthy-subscribers-${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(`Exported ${subscribers.length} subscribers to CSV!`);
  };

  const filtered = subscribers.filter((sub) => {
    const q = search.toLowerCase();
    return (
      (sub.name || "").toLowerCase().includes(q) ||
      (sub.email || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Mail className="size-5 text-brand" />
            Newsletter Subscribers
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Community members who have subscribed for holistic wellness updates and clinic announcements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            disabled={subscribers.length === 0}
            className="gap-2 cursor-pointer h-9 text-xs"
          >
            <Download className="size-3.5" />
            Export CSV ({subscribers.length})
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={loading}
            className="gap-2 cursor-pointer h-9 text-xs"
          >
            <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or email address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 h-10 bg-card border-border text-sm"
        />
      </div>

      {/* Subscribers Table Card */}
      <div className="rounded-xl border border-border bg-card shadow-soft overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <div className="mx-auto grid size-12 place-items-center rounded-full bg-muted text-muted-foreground mb-3">
              <Users className="size-6" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">
              {search ? "No matching subscribers found" : "No subscribers yet"}
            </h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
              {search
                ? "Try searching for a different name or email."
                : "When visitors subscribe on the Feeling Healthy website, they will appear here."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/40 text-xs font-semibold text-muted-foreground border-b border-border">
                <tr>
                  <th className="py-3.5 px-6">Subscriber</th>
                  <th className="py-3.5 px-6">Email Address</th>
                  <th className="py-3.5 px-6">Subscribed Date</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filtered.map((sub) => (
                  <tr
                    key={sub.id || sub.email}
                    className="hover:bg-muted/30 transition-colors group"
                  >
                    <td className="py-4 px-6 font-medium text-foreground">
                      <div className="flex items-center gap-2.5">
                        <div className="grid size-8 place-items-center rounded-full bg-brand/10 text-brand font-semibold text-xs">
                          {(sub.name || "S")[0].toUpperCase()}
                        </div>
                        <span>{sub.name || "Community Member"}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-muted-foreground">
                      <a
                        href={`mailto:${sub.email}`}
                        className="hover:text-brand hover:underline flex items-center gap-1.5"
                      >
                        <Mail className="size-3.5 text-muted-foreground" />
                        {sub.email}
                      </a>
                    </td>
                    <td className="py-4 px-6 text-muted-foreground text-xs">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="size-3.5 text-muted-foreground" />
                        {sub.createdAt
                          ? new Date(sub.createdAt).toLocaleDateString("en-AU", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "Recently"}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Button
                        variant='ghost'
                        onClick={() => sub.id && handleDelete(sub.id, sub.email)}
                        disabled={deletingId === sub.id}
                        className="h-8 w-8 p-0 text-destructive"
                        title="Remove subscriber"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
