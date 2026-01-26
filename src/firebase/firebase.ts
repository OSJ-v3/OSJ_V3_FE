import { initializeApp } from "firebase/app"
import { getMessaging, isSupported, type Messaging } from "firebase/messaging"

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const firebaseApp = initializeApp(firebaseConfig)

let messaging: Messaging | null = null

export async function getFirebaseMessaging() {
    if (messaging) return messaging

    const supported = await isSupported()
    if (!supported) return null

    messaging = getMessaging(firebaseApp)
    return messaging
}
