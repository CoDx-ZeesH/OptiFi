// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Read Firebase config from Vite env vars (frontend/.env)
// Vite exposes env vars via import.meta.env when prefixed with VITE_
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase app only if config appears present. This avoids
// runtime crashes when env vars are missing in dev/test environments.
let app = null;
try {
  if (firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId && firebaseConfig.appId) {
    app = initializeApp(firebaseConfig);
  } else {
    console.warn('[firebase] missing VITE_FIREBASE_* env vars; firebase will not be initialized');
  }
} catch (err) {
  console.warn('[firebase] failed to initialize app', err);
}

// Load analytics lazily because some browser extensions (adblock/privacy)
// block `firebase_analytics` module which can cause a runtime failure and
// a blank page. We attempt a dynamic import and gracefully continue if it
// fails.
// Analytics is optional and may be blocked by extensions; skip initialization
// to avoid runtime failures. If you need analytics, initialize it explicitly
// in a separate module with `import { getAnalytics } from 'firebase/analytics'`.
const analytics = null;

import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const auth = app ? getAuth(app) : null;
const googleProvider = new GoogleAuthProvider();

function isConfigPresent(cfg) {
  return cfg && cfg.apiKey && cfg.authDomain && cfg.projectId && cfg.appId;
}

const isFirebaseConfigured = () => isConfigPresent(firebaseConfig) && !!auth;

export { app, analytics, auth, googleProvider, isFirebaseConfigured };