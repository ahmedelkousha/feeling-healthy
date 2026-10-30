import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";
import { articles, Article } from "@/data/resources";
import { pemfThzProducts, PemfThzProduct } from "@/data/pemfThz";

export type BlogItem = Article & { id?: string; createdAt?: string };
export type ProductItem = PemfThzProduct & {
  createdAt?: string;
  feePercent?: number;
};

export type InquiryItem = {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  status: "new" | "in_progress" | "resolved";
  createdAt?: string;
};

export type SubscriberItem = {
  id?: string;
  name: string;
  email: string;
  createdAt?: string;
};

/* ────────────────────────────────────────────
 * BLOGS CRUD
 * ──────────────────────────────────────────── */
export async function getBlogs(): Promise<BlogItem[]> {
  try {
    const colRef = collection(db, "blogs");
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) return articles;
    return snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as BlogItem[];
  } catch (error) {
    console.warn("Could not fetch blogs from Firebase, using local fallback:", error);
    return articles;
  }
}

export async function addBlog(blog: Omit<BlogItem, "id">): Promise<string> {
  const colRef = collection(db, "blogs");
  const docRef = await addDoc(colRef, {
    ...blog,
    createdAt: new Date().toISOString(),
  });
  return docRef.id;
}

export async function updateBlog(id: string, blog: Partial<BlogItem>): Promise<void> {
  const docRef = doc(db, "blogs", id);
  await updateDoc(docRef, blog);
}

export async function deleteBlog(id: string): Promise<void> {
  const docRef = doc(db, "blogs", id);
  await deleteDoc(docRef);
}

/* ────────────────────────────────────────────
 * PRODUCTS CRUD
 * ──────────────────────────────────────────── */
export async function getProducts(): Promise<ProductItem[]> {
  try {
    const colRef = collection(db, "products");
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) return pemfThzProducts;
    return snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as ProductItem[];
  } catch (error) {
    console.warn("Could not fetch products from Firebase, using local fallback:", error);
    return pemfThzProducts;
  }
}

export async function addProduct(product: ProductItem): Promise<string> {
  const docId = product.id || product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const docRef = doc(db, "products", docId);
  await setDoc(docRef, {
    ...product,
    id: docId,
    createdAt: new Date().toISOString(),
  });
  return docId;
}

export async function updateProduct(id: string, product: Partial<ProductItem>): Promise<void> {
  const docRef = doc(db, "products", id);
  await updateDoc(docRef, product);
}

export async function deleteProduct(id: string): Promise<void> {
  const docRef = doc(db, "products", id);
  await deleteDoc(docRef);
}

/* ────────────────────────────────────────────
 * INQUIRIES CRUD
 * ──────────────────────────────────────────── */
export async function getInquiries(): Promise<InquiryItem[]> {
  try {
    const colRef = collection(db, "inquiries");
    const snapshot = await getDocs(colRef);
    const list = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as InquiryItem[];
    // Sort descending by date
    return list.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
  } catch (error) {
    console.warn("Could not fetch inquiries:", error);
    return [];
  }
}

export async function addInquiry(inquiry: Omit<InquiryItem, "id" | "status" | "createdAt">): Promise<string> {
  const colRef = collection(db, "inquiries");
  const docRef = await addDoc(colRef, {
    ...inquiry,
    status: "new",
    createdAt: new Date().toISOString(),
  });
  return docRef.id;
}

export async function updateInquiryStatus(id: string, status: InquiryItem["status"]): Promise<void> {
  const docRef = doc(db, "inquiries", id);
  await updateDoc(docRef, { status });
}

export async function deleteInquiry(id: string): Promise<void> {
  const docRef = doc(db, "inquiries", id);
  await deleteDoc(docRef);
}

/* ────────────────────────────────────────────
 * NEWSLETTER SUBSCRIBERS
 * ──────────────────────────────────────────── */
export async function getSubscribers(): Promise<SubscriberItem[]> {
  try {
    const colRef = collection(db, "subscribers");
    const q = query(colRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as SubscriberItem[];
  } catch (error) {
    console.warn("Could not fetch subscribers from Firebase:", error);
    return [];
  }
}

export async function addSubscriber(data: { name: string; email: string }): Promise<string> {
  const colRef = collection(db, "subscribers");
  const emailClean = data.email.toLowerCase().trim();

  // Check if subscriber already exists
  const snapshot = await getDocs(colRef);
  const exists = snapshot.docs.some(
    (d) => (d.data().email || "").toLowerCase().trim() === emailClean
  );

  if (exists) {
    throw new Error("This email is already subscribed to our newsletter!");
  }

  const docRef = await addDoc(colRef, {
    name: data.name.trim() || "Community Member",
    email: emailClean,
    createdAt: new Date().toISOString(),
  });

  return docRef.id;
}

export async function deleteSubscriber(id: string): Promise<void> {
  const docRef = doc(db, "subscribers", id);
  await deleteDoc(docRef);
}

/* ────────────────────────────────────────────
 * SEED DEFAULT DATA TO FIRESTORE
 * ──────────────────────────────────────────── */
export async function seedInitialData(): Promise<{ blogsCount: number; productsCount: number }> {
  // Seed blogs
  for (const article of articles) {
    const blogDoc = doc(db, "blogs", article.slug);
    await setDoc(blogDoc, {
      ...article,
      createdAt: new Date().toISOString(),
    });
  }

  // Seed products
  for (const product of pemfThzProducts) {
    const prodDoc = doc(db, "products", product.id);
    await setDoc(prodDoc, {
      ...product,
      createdAt: new Date().toISOString(),
    });
  }

  return { blogsCount: articles.length, productsCount: pemfThzProducts.length };
}
