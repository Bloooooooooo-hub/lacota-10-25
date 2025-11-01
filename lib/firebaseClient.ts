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

// 1️⃣ Initialise Firebase une seule fois
function getFirebaseApp() {
  if (!getApps().length) {
    return initializeApp(firebaseConfig)
  }
  return getApp()
}

// 2️⃣ Récupère Auth
export function getFirebaseAuth() {
  const app = getFirebaseApp()
  return getAuth(app)
}

// 3️⃣ reCAPTCHA invisible pour OTP
function getOrCreateRecaptcha() {
  const auth = getFirebaseAuth()

  if (typeof window === "undefined") return null

  if (!(window as any).recaptchaVerifier) {
    ;(window as any).recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
      callback: () => console.log("reCAPTCHA validé ✅"),
    })
  }

  return (window as any).recaptchaVerifier as RecaptchaVerifier
}

// 4️⃣ Envoi OTP
export async function sendOtpToPhone(phoneE164: string): Promise<ConfirmationResult> {
  const auth = getFirebaseAuth()
  const verifier = getOrCreateRecaptcha()
  if (!verifier) throw new Error("reCAPTCHA non initialisé (tu es côté serveur ?)")
  return signInWithPhoneNumber(auth, phoneE164, verifier)
}

// 5️⃣ Vérif OTP
export async function confirmOtp(confirmationResult: ConfirmationResult, otpCode: string): Promise<User> {
  const result = await confirmationResult.confirm(otpCode)
  return result.user
}

// 6️⃣ Suivi d’état Auth
export function listenFirebaseAuthState(callback: (user: User | null) => void) {
  const auth = getFirebaseAuth()
  return onAuthStateChanged(auth, callback)
}

// 7️⃣ Connexion Google
export async function signInWithGoogle() {
  const auth = getFirebaseAuth()
  const provider = new GoogleAuthProvider()

  try {
    const result = await signInWithPopup(auth, provider)
    const user = result.user

    const [firstName, ...rest] = (user.displayName || "").split(" ")
    const lastName = rest.join(" ")

    // 🔁 Enregistrement / MAJ côté Hasura
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

// ✅ 8️⃣ Export direct pour compatibilité avec tes composants
export const auth = getFirebaseAuth()
