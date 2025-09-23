import { initClient } from "./src/client";
import {
  signInWithGithub,
  signInWithGoogle,
  signInWithMicrosoft,
  signInWithApple,
  signInWithYahoo,
  signInWithGooglePlayGames,
  signInWithAppleGameCenter,
  signInWithFacebook,
  signInWithTwitter,
} from "./src/auth";
import {
  createDocument,
  readDocuments,
  readDocument,
  updateDocument,
  deleteDocument,
} from "./src/store";

export {
  initClient,
  signInWithGithub,
  signInWithGoogle,
  signInWithMicrosoft,
  signInWithApple,
  signInWithYahoo,
  signInWithGooglePlayGames,
  signInWithAppleGameCenter,
  signInWithFacebook,
  signInWithTwitter,
  createDocument,
  readDocuments,
  readDocument,
  updateDocument,
  deleteDocument,
};
