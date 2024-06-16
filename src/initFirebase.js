import firebaseConfig from "./env.js";
import { initializeApp } from "firebase/app";

export async function initFirebase() {
      initializeApp(firebaseConfig);
}
