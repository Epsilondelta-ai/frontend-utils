import {
  type FirebaseApp,
  type FirebaseOptions,
  initializeApp,
  getApps,
  getApp,
} from "firebase/app";

let OPTIONS: FirebaseOptions = {};
let cachedClient: FirebaseApp | null = null;

export function initClient(options: FirebaseOptions) {
  OPTIONS = { ...options };
}

export function getFirebaseApp(): FirebaseApp {
  if (cachedClient) return cachedClient;

  cachedClient = getApps().length ? getApp() : initializeApp(OPTIONS);
  return cachedClient;
}
