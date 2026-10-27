"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Search, ExternalLink, X, Package, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ProductItem, addProduct, updateProduct, deleteProduct } from "@/lib/firebase/services";
import { toast } from "sonner";
import Link from "next/link";

interface ProductManagerProps {
  products: ProductItem[];
  loading?: boolean;
  onRefresh: () => void;
}

export function ProductManager({ products, loading, onRefresh }: ProductManagerProps) {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [saving, setSaving] = useState(false);

  // Form State
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [category, setCategory] = useState<"Terahertz" | "PEMF" | "Dual-Tech">("Terahertz");
  const [badge, setBadge] = useState("");
  const [price, setPrice] = useState("$499 AUD");
  const [priceInCents, setPriceInCents] = useState(49900);
  const [currency, setCurrency] = useState<"usd" | "aud">("aud");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("/images/pemf-thz/classic.webp");
  const [benefitsText, setBenefitsText] = useState("");
  const [specsText, setSpecsText] = useState("");

  const openAddModal = () => {
    setEditingProduct(null);
    setId("");
    setName("");
    setTagline("");
    setCategory("Terahertz");
    setBadge("");
    setPrice("$499 AUD");
    setPriceInCents(49900);
    setCurrency("aud");
    setDescription("");
    setImage("/images/pemf-thz/classic.webp");
    setBenefitsText("");
    setSpecsText("");
    setModalOpen(true);
  };

  const openEditModal = (product: ProductItem) => {
    setEditingProduct(product);
    setId(product.id);
    setName(product.name);
    setTagline(product.tagline);
    setCategory(product.category);
    setBadge(product.badge || "");
    setPrice(product.price);
    setPriceInCents(product.priceInCents);
    setCurrency(product.currency);
    setDescription(product.description);
    setImage(product.image);
    setBenefitsText(product.benefits ? product.benefits.join("\n") : "");
    setSpecsText(product.specs ? product.specs.join("\n") : "");
    setModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingProduct) {
      setId(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      );
    }
  };

  const handlePriceChange = (val: string) => {
    setPrice(val);
    // Attempt to extract numeric digits
    const digits = val.replace(/[^0-9]/g, "");
    if (digits) {
      setPriceInCents(parseInt(digits, 10) * 100);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !description) {
      toast.error("Please fill in name, price, and description.");
      return;
    }

    setSaving(true);
    try {
      const benefits = benefitsText
        .split("\n")
        .map((b) => b.trim())
        .filter(Boolean);

      const specs = specsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

      const payload: ProductItem = {
        id: id || name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        name,
        tagline: tagline || name,
        category,
        badge: badge ? badge : undefined,
        price,
        priceInCents: Number(priceInCents) || 10000,
        currency,
        description,
        image: image || "/images/pemf-thz/classic.webp",
        benefits: benefits.length > 0 ? benefits : ["Cellular revitalization", "Non-invasive therapy"],
        specs: specs.length > 0 ? specs : ["Standard 110V/240V Support"],
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, payload);
        toast.success("Product updated successfully!");
      } else {
        await addProduct(payload);
        toast.success("Product added successfully!");
      }

      setModalOpen(false);
      onRefresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to save product.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product: ProductItem) => {
    if (!confirm(`Are you sure you want to delete "${product.name}"?`)) return;

    try {
      await deleteProduct(product.id);
      toast.success("Product deleted!");
      onRefresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete product.");
    }
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by name or category..."
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onRefresh} disabled={loading} className="gap-2">
            <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button size='sm' onClick={openAddModal} className="gap-2">
            <Plus className="size-4" />
            Add New Product
          </Button>
        </div>
      </div>

      {/* Products Table */}
      <div className="rounded-xl border border-border bg-card shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/60 text-xs text-muted-foreground uppercase tracking-wider border-b border-border">
              <tr>
                <th className="px-5 py-3.5">Product</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Price</th>
                <th className="px-5 py-3.5">Badge</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    No products found. Click &quot;Add New Product&quot; to add to catalog.
                  </td>
                </tr>
              ) : (
                filtered.map((prod) => (
                  <tr key={prod.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.image || "/images/pemf-thz/classic.webp"}
                          alt={prod.name}
                          className="size-12 rounded-md object-cover border border-border shrink-0 bg-background"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-foreground line-clamp-1">{prod.name}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">{prod.tagline}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center rounded-full bg-secondary text-secondary-foreground px-2.5 py-0.5 text-xs font-medium">
                        {prod.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap font-medium text-foreground">
                      {prod.price}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      {prod.badge ? (
                        <span className="inline-flex items-center rounded-full text-ink px-2 py-0.5 text-xs font-medium">
                          {prod.badge}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-right space-x-2">
                      <Link
                        href={`/pemf-thz#devices`}
                        target="_blank"
                        className="inline-flex p-1.5 text-muted-foreground hover:text-foreground rounded-md hover:bg-foreground/10"
                        title="View on Store"
                      >
                        <ExternalLink className="size-4" />
                      </Link>
                      <button
                        onClick={() => openEditModal(prod)}
                        className="inline-flex p-1.5 text-brand rounded-md hover:bg-brand/10"
                        title="Edit Product"
                      >
                        <Edit2 className="size-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(prod)}
                        className="inline-flex p-1.5 text-destructive hover:text-destructive rounded-md hover:bg-destructive/10"
                        title="Delete Product"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl bg-card border border-border p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Package className="size-5 text-primary" />
                <h3 className="text-lg font-bold">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-md"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="prod-name">Product Name *</Label>
                  <Input
                    id="prod-name"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. iTeraCare Classic 2.0"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="prod-id">Unique ID (Slug) *</Label>
                  <Input
                    id="prod-id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="thz-classic"
                    disabled={!!editingProduct}
                    required
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="prod-tagline">Tagline</Label>
                  <Input
                    id="prod-tagline"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="Daily Cellular Revitalization for Home Wellness"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="prod-cat">Category</Label>
                  <select
                    id="prod-cat"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  >
                    <option value="Terahertz">Terahertz</option>
                    <option value="PEMF">PEMF</option>
                    <option value="Dual-Tech">Dual-Tech</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="prod-badge">Badge Label (optional)</Label>
                  <Input
                    id="prod-badge"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="Most Popular / Best Seller"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="prod-price">Display Price *</Label>
                  <Input
                    id="prod-price"
                    value={price}
                    onChange={(e) => handlePriceChange(e.target.value)}
                    placeholder="$499 AUD"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="prod-cents">Stripe Amount (Cents) *</Label>
                  <Input
                    id="prod-cents"
                    type="number"
                    value={priceInCents}
                    onChange={(e) => setPriceInCents(Number(e.target.value))}
                    placeholder="49900"
                    required
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="prod-image">Image URL or Local Path</Label>
                  <Input
                    id="prod-image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="/images/pemf-thz/classic.webp"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="prod-desc">Description *</Label>
                  <Textarea
                    id="prod-desc"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder="Detailed device description..."
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="prod-benefits">Key Benefits (One per line)</Label>
                  <Textarea
                    id="prod-benefits"
                    value={benefitsText}
                    onChange={(e) => setBenefitsText(e.target.value)}
                    rows={4}
                    placeholder="Deep thermal penetration&#10;Micro-circulation support&#10;Safe for daily family use"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="prod-specs">Specifications (One per line)</Label>
                  <Textarea
                    id="prod-specs"
                    value={specsText}
                    onChange={(e) => setSpecsText(e.target.value)}
                    rows={4}
                    placeholder="3 Speed / Heat settings&#10;800W power output&#10;Certified EMF tested"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-border">
                <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving..." : editingProduct ? "Update Product" : "Add Product"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
