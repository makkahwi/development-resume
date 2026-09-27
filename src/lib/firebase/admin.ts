import "server-only";
import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getDatabase, type Database } from "firebase-admin/database";

export class FirebaseConfigurationError extends Error {
  constructor(message: string) { super(message); this.name = 'FirebaseConfigurationError'; }
}

function firebaseApp(): App {
  const existing = getApps()[0];
  if (existing) return existing;
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, FIREBASE_DATABASE_URL } = process.env;
  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY || !FIREBASE_DATABASE_URL) {
    throw new FirebaseConfigurationError("Firebase Admin configuration is incomplete. Check the FIREBASE_* server environment variables.");
  }
  const privateKey = FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n").trim();
  if (!privateKey.startsWith('-----BEGIN PRIVATE KEY-----') || !privateKey.endsWith('-----END PRIVATE KEY-----')) {
    throw new FirebaseConfigurationError('FIREBASE_PRIVATE_KEY must be the complete PEM private_key from a Firebase service-account JSON, including BEGIN/END PRIVATE KEY. Use its client_email for FIREBASE_CLIENT_EMAIL.');
  }
  let credential;
  try { credential = cert({ projectId: FIREBASE_PROJECT_ID, clientEmail: FIREBASE_CLIENT_EMAIL, privateKey }); }
  catch { throw new FirebaseConfigurationError('Firebase could not parse the service-account credentials. Copy the complete private_key and matching client_email from the service-account JSON.'); }
  return initializeApp({
    credential,
    databaseURL: FIREBASE_DATABASE_URL,
  });
}

export function getAdminDatabase(): Database {
  return getDatabase(firebaseApp());
}
