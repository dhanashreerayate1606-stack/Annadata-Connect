import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const nextServer = functions.https.onRequest((req, res) => {
  // This is the Next.js SSR handler
  res.send("Next.js SSR will work here");
});

