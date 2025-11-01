// lib/firebaseClient.ts

import { initializeApp, getApps, getApp } from "firebase/app"
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  User,
  onAuthStateChanged,
} from "firebase/auth"

// ⚠️ Les clés Firebase côté front peuvent rester publiques, c'est normal avec Firebase Auth.
// Ne mets pas d'admin secret ici, jamais.
const firebaseConfig = {
  apiKey: "AIzaSyAY37wQDbs-0glpEtiTpSBQQpQHTcVjL0U",
  authDomain: "la-cota-1dd47.firebaseapp.com",
  projectId: "la-cota-1dd47",
  storageBucket: "la-cota-1dd47.firebasestorage.app",
  messagingSenderId: "422712993887",
  appId: "1:422712993887:web:10d7e281e10208092053ea",
}

// 1. Initialise l'app Firebase une seule fois (hot reload Next = attention)
function getFirebaseApp() {
  if (!getApps().length) {
    return initializeApp(firebaseConfig)
  }
  return getApp()
}

// 2. Récupère l'instance d'auth Firebase
export function getFirebaseAuth() {
  const app = getFirebaseApp()
  return getAuth(app)
}

// 3. Crée (ou récupère) le reCAPTCHA invisible
// - doit être appelé côté navigateur UNIQUEMENT
// - il faut absolument qu'il y ait <div id="recaptcha-container"></div> dans le DOM
function getOrCreateRecaptcha() {
  const auth = getFirebaseAuth()

  if (typeof window === "undefined") {
    // On est côté serveur → pas de recaptcha
    return null
  }

  if (!(window as any).recaptchaVerifier) {
    ;(window as any).recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          console.log("reCAPTCHA validé ✅")
        },
      }
    )
  }

  return (window as any).recaptchaVerifier as RecaptchaVerifier
}

// 4. Envoi du SMS OTP
//    phoneE164 doit être au format complet "+2250122334455"
export async function sendOtpToPhone(phoneE164: string): Promise<ConfirmationResult> {
  const auth = getFirebaseAuth()
  const verifier = getOrCreateRecaptcha()
  if (!verifier) {
    throw new Error("reCAPTCHA non initialisé (tu es côté serveur ?)")
  }

  const confirmationResult = await signInWithPhoneNumber(auth, phoneE164, verifier)
  return confirmationResult
}

// 5. Vérif du code OTP reçu par SMS
//    confirmationResult vient de sendOtpToPhone()
//    otpCode = "123456"
export async function confirmOtp(
  confirmationResult: ConfirmationResult,
  otpCode: string
): Promise<User> {
  const result = await confirmationResult.confirm(otpCode)
  // result.user = utilisateur Firebase connecté
  return result.user
}

// 6. Petit helper si tu veux savoir qui est connecté côté client (ex: pour ton dashboard)
export function listenFirebaseAuthState(callback: (user: User | null) => void) {
  const auth = getFirebaseAuth()
  return onAuthStateChanged(auth, callback)
}
