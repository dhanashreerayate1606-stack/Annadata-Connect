import * as functions from "firebase-functions";
import { createNextJsHandler } from "@firebase/nextjs-functions";

export const nextServer = createNextJsHandler({
  distDir: ".next",
});const functions = require("firebase-functions");
const { createNextJsHandler } = require("@firebase/nextjs-functions");

exports.nextServer = createNextJsHandler({
  distDir: ".next",
});
