// lib/firebaseClient.ts
import { initializeApp, getApps, getApp } from "firebase/app"
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
  GoogleAuthProvider,
  ConfirmationResult,
  User,
  onAuthStateChanged,
} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAY37wQDbs-0glpEtiTpSBQQpQHTcVjL0U",
  authDomain: "la-cota-1dd47.firebaseapp.com",
  projectId: "la-cota-1dd47",
  storageBucket: "la-cota-1dd47.firebasestorage.app",
  messagingSenderId: "422712993887",
  appId: "1:422712993887:web:10d7e281e10208092053ea",
}

// ✅ Initialise Firebase une seule fois
export function getFirebaseApp() {
  if (typeof window === "undefined") return null // ⛔️ skip côté serveur
  if (!getApps().length) {
    return initializeApp(firebaseConfig)
  }
  return getApp()
}

// ✅ Récupère Auth (client only)
export function getFirebaseAuth() {
  if (typeof window === "undefined") return null
  const app = getFirebaseApp()
  if (!app) return null
  return getAuth(app)
}

// ✅ Crée reCAPTCHA uniquement côté client
function getOrCreateRecaptcha() {
  if (typeof window === "undefined") return null
  const auth = getFirebaseAuth()
  if (!auth) return null

  if (!(window as any).recaptchaVerifier) {
    ;(window as any).recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
      callback: () => console.log("reCAPTCHA validé ✅"),
    })
  }

  return (window as any).recaptchaVerifier as RecaptchaVerifier
}

// ✅ Envoi OTP
export async function sendOtpToPhone(phoneE164: string): Promise<ConfirmationResult> {
  const auth = getFirebaseAuth()
  const verifier = getOrCreateRecaptcha()
  if (!auth || !verifier) throw new Error("Firebase non initialisé (build ou SSR ?)")
  return signInWithPhoneNumber(auth, phoneE164, verifier)
}

// ✅ Vérif OTP
export async function confirmOtp(confirmationResult: ConfirmationResult, otpCode: string): Promise<User> {
  const result = await confirmationResult.confirm(otpCode)
  return result.user
}

// ✅ Suivi d’état Auth
export function listenFirebaseAuthState(callback: (user: User | null) => void) {
  const auth = getFirebaseAuth()
  if (!auth) return () => {}
  return onAuthStateChanged(auth, callback)
}

// ✅ Connexion Google
export async function signInWithGoogle() {
  if (typeof window === "undefined") return
  const auth = getFirebaseAuth()
  if (!auth) return
  const provider = new GoogleAuthProvider()

  try {
    const result = await signInWithPopup(auth, provider)
    const user = result.user

    const [firstName, ...rest] = (user.displayName || "").split(" ")
    const lastName = rest.join(" ")

    const response = await fetch("/api/upsert-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        firstName,
        lastName,
        role: "passenger",
        provider: "google",
      }),
    })

    if (!response.ok) {
      const err = await response.json()
      console.error("❌ Erreur API /upsert-user :", err)
      throw new Error("Erreur lors de la création du compte")
    }

    console.log("✅ Utilisateur Google enregistré :", user.email)
    return user
  } catch (err) {
    console.error("Erreur Google Auth:", err)
    throw err
  }
}
