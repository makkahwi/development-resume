import "server-only";
import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getDatabase, type Database } from "firebase-admin/database";

function firebaseApp(): App {
  const existing = getApps()[0];
  if (existing) return existing;
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, FIREBASE_DATABASE_URL } = process.env;
  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY || !FIREBASE_DATABASE_URL) {
    throw new Error("Firebase Admin configuration is incomplete");
  }
  return initializeApp({
    credential: cert({ projectId: FIREBASE_PROJECT_ID, clientEmail: FIREBASE_CLIENT_EMAIL, privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n") }),
    databaseURL: FIREBASE_DATABASE_URL,
  });
}

export function getAdminDatabase(): Database {
  return getDatabase(firebaseApp());
}
