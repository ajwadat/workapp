import { initializeApp, getApps, type FirebaseOptions } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyAANStFRV94tVZ3zYpUNXplxwdXTXao9p4",
  authDomain: "workapp-8c578.firebaseapp.com",
  projectId: "workapp-8c578",
  storageBucket: "workapp-8c578.firebasestorage.app",
  messagingSenderId: "662994837106",
  appId: "1:662994837106:web:ccfcf3228e91340a27aceb",
  measurementId: "G-Q181FGBP32",
}

let app
let auth
let db
let analytics

if (typeof window !== "undefined") {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig)
  } else {
    app = getApps()[0]
  }
  auth = getAuth(app)
  db = getFirestore(app)
  analytics = getAnalytics(app)
}

export { app, auth, db, analytics }

