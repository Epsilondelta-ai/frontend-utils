import {
  FacebookAuthProvider,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  linkWithCredential,
  OAuthCredential,
  OAuthProvider,
  signInWithPopup,
  TwitterAuthProvider,
  type Auth,
  type AuthProvider,
  type User,
} from "firebase/auth";

import { getFirebaseApp } from "./client";
import type { FirebaseError } from "firebase/app";

export function auth(): Auth {
  return getAuth(getFirebaseApp());
}

/** @throws {FirebaseError} error.code === "auth/popup-blocked" 일 경우 사용자에게 팝업 차단 해제를 요청해야 합니다. */
export function signInWithGithub(): Promise<User> {
  return signInWith("github.com");
}
/** @throws {FirebaseError} error.code === "auth/popup-blocked" 일 경우 사용자에게 팝업 차단 해제를 요청해야 합니다. */
export function signInWithGoogle(): Promise<User> {
  return signInWith("google.com");
}
/** @throws {FirebaseError} error.code === "auth/popup-blocked" 일 경우 사용자에게 팝업 차단 해제를 요청해야 합니다. */
export function signInWithMicrosoft(): Promise<User> {
  return signInWith("microsoft.com");
}
/** @throws {FirebaseError} error.code === "auth/popup-blocked" 일 경우 사용자에게 팝업 차단 해제를 요청해야 합니다. */
export function signInWithApple(): Promise<User> {
  return signInWith("apple.com");
}
/** @throws {FirebaseError} error.code === "auth/popup-blocked" 일 경우 사용자에게 팝업 차단 해제를 요청해야 합니다. */
export function signInWithYahoo(): Promise<User> {
  return signInWith("yahoo.com");
}
/** @throws {FirebaseError} error.code === "auth/popup-blocked" 일 경우 사용자에게 팝업 차단 해제를 요청해야 합니다. */
export function signInWithGooglePlayGames(): Promise<User> {
  return signInWith("playgames.google.com");
}
/** @throws {FirebaseError} error.code === "auth/popup-blocked" 일 경우 사용자에게 팝업 차단 해제를 요청해야 합니다. */
export function signInWithAppleGameCenter(): Promise<User> {
  return signInWith("applegamecenter.com");
}
/** @throws {FirebaseError} error.code === "auth/popup-blocked" 일 경우 사용자에게 팝업 차단 해제를 요청해야 합니다. */
export function signInWithFacebook(): Promise<User> {
  return signInWith("facebook.com");
}
/** @throws {FirebaseError} error.code === "auth/popup-blocked" 일 경우 사용자에게 팝업 차단 해제를 요청해야 합니다. */
export function signInWithTwitter(): Promise<User> {
  return signInWith("twitter.com");
}

function getVerifiedProvidersFromError(error: FirebaseError): string[] {
  return (error.customData!._tokenResponse as any).verifiedProvider as string[];
}

const PROVIDERS: Record<string, () => AuthProvider> = {
  "github.com": () => new GithubAuthProvider(),
  "google.com": () => new GoogleAuthProvider(),
  "microsoft.com": () => new OAuthProvider("microsoft.com"),
  "apple.com": () => new OAuthProvider("apple.com"),
  "yahoo.com": () => new OAuthProvider("yahoo.com"),
  "playgames.google.com": () => new OAuthProvider("playgames.google.com"),
  "applegamecenter.com": () => new OAuthProvider("applegamecenter.com"),
  "facebook.com": () => new FacebookAuthProvider(),
  "twitter.com": () => new TwitterAuthProvider(),
};

function credentialFromError(
  providerId: string,
  error: FirebaseError
): OAuthCredential | null {
  switch (providerId) {
    case "github.com":
      return GithubAuthProvider.credentialFromError(error);
    case "google.com":
      return GoogleAuthProvider.credentialFromError(error);
    case "twitter.com":
      return TwitterAuthProvider.credentialFromError(error);
  }
  return OAuthCredential.fromJSON(error.customData!._tokenResponse as any);
}

function signInWith(providerId: string): Promise<User> {
  const provider = PROVIDERS[providerId]();

  return signInWithPopup(auth(), provider)
    .then((credential) => {
      return credential.user;
    })
    .catch((error: FirebaseError) => {
      if (error.code !== "auth/account-exists-with-different-credential") {
        throw error;
      }

      const verifiedProviders = getVerifiedProvidersFromError(error);
      if (!PROVIDERS[verifiedProviders[0]!]) {
        throw error;
      }

      const credential = credentialFromError(providerId, error);
      if (!credential) {
        throw error;
      }

      return linkWith(PROVIDERS[providerId](), credential);
    });
}

/** @throws {FirebaseError} error.code === "auth/popup-blocked" 일 경우 사용자에게 팝업 차단 해제를 요청해야 합니다. */
function linkWith(
  provider: AuthProvider,
  credential: OAuthCredential
): Promise<User> {
  return signInWithPopup(auth(), provider)
    .then((result) => {
      const user = result.user;

      return linkWithCredential(user, credential)
        .then((userCredential) => {
          return userCredential.user;
        })
        .catch((error: FirebaseError) => {
          throw error;
        });
    })
    .catch((error: FirebaseError) => {
      throw error;
    });
}
