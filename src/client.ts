import {
  type FirebaseApp,
  type FirebaseOptions,
  initializeApp,
  getApps,
  getApp,
} from "firebase/app";

let options: FirebaseOptions = {};
let cachedClient: FirebaseApp | null = null;

export function initClient(options: FirebaseOptions) {
  options = options;
}

export function getFirebaseApp(): FirebaseApp {
  if (cachedClient) return cachedClient;

  cachedClient = getApps().length ? getApp() : initializeApp(options);
  return cachedClient;
}
