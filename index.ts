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
  createDocuments,
  createDocument,
  readDocuments,
  readDocument,
  updateDocuments,
  updateDocument,
  deleteDocuments,
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
  createDocuments,
  createDocument,
  readDocuments,
  readDocument,
  updateDocuments,
  updateDocument,
  deleteDocuments,
  deleteDocument,
};
