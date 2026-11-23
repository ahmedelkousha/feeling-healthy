/**
 * Feeling Healthy — Firebase Firestore Seed & Replace Script
 * 
 * Usage:
 *   npm run seed
 *   or
 *   node scripts/seed.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  writeBatch,
} from "firebase/firestore";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// Load .env.local if environment variables are not already set
function loadEnv() {
  const envPath = path.join(rootDir, ".env.local");
  if (!fs.existsSync(envPath)) return;

  const content = fs.readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnv();

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error("❌ Error: Missing Firebase credentials in .env.local");
  console.error("Please make sure NEXT_PUBLIC_FIREBASE_API_KEY and NEXT_PUBLIC_FIREBASE_PROJECT_ID are set.");
  process.exit(1);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Helper to sanitize payload for Firestore (strips undefined keys)
function sanitize(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Replace collection helper
async function replaceCollection(collectionName, items, getId) {
  console.log(`\n🔄 Replacing '${collectionName}' collection...`);
  const colRef = collection(db, collectionName);

  // 1. Fetch & delete existing documents
  const snapshot = await getDocs(colRef);
  let deletedCount = 0;
  if (!snapshot.empty) {
    // Delete in batches of up to 400
    let batch = writeBatch(db);
    let count = 0;
    for (const docSnap of snapshot.docs) {
      batch.delete(docSnap.ref);
      count++;
      deletedCount++;
      if (count >= 400) {
        await batch.commit();
        batch = writeBatch(db);
        count = 0;
      }
    }
    if (count > 0) {
      await batch.commit();
    }
  }
  console.log(`   ✓ Removed ${deletedCount} existing document(s) from '${collectionName}'`);

  // 2. Insert new documents
  const now = new Date().toISOString();
  let batch = writeBatch(db);
  let batchCount = 0;
  let insertedCount = 0;

  for (const item of items) {
    const docId = getId(item);
    const docRef = doc(db, collectionName, docId);
    const data = sanitize({
      ...item,
      id: docId,
      createdAt: item.createdAt || now,
      updatedAt: now,
    });

    batch.set(docRef, data);
    batchCount++;
    insertedCount++;

    if (batchCount >= 400) {
      await batch.commit();
      batch = writeBatch(db);
      batchCount = 0;
    }
  }

  if (batchCount > 0) {
    await batch.commit();
  }

  console.log(`   ✓ Seeded ${insertedCount} fresh document(s) to '${collectionName}'`);
  return { deleted: deletedCount, inserted: insertedCount };
}

async function runSeed() {
  console.log("==================================================");
  console.log("  Feeling Healthy — Firestore Seed & Replace");
  console.log("==================================================");
  console.log(`Project ID: ${firebaseConfig.projectId}`);

  try {
    // Import source data dynamically
    const { articles } = await import("../src/data/resources.ts");
    const { pemfThzProducts } = await import("../src/data/pemfThz.ts");
    const { services } = await import("../src/data/services.ts");

    // 1. Replace 'blogs'
    await replaceCollection("blogs", articles, (a) => a.slug);

    // 2. Replace 'products'
    await replaceCollection("products", pemfThzProducts, (p) => p.id);

    // 3. Replace 'services'
    await replaceCollection("services", services, (s) => s.slug);

    console.log("\n==================================================");
    console.log("✅ Successfully replaced all data in Firebase Firestore!");
    console.log("==================================================\n");
    process.exit(0);
  } catch (err) {
    console.error("\n❌ Seeding failed with error:", err);
    process.exit(1);
  }
}

runSeed();
