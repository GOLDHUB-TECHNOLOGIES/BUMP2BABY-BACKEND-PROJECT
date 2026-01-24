import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// Initialize Firebase Admin only if not already initialized
if (!admin.apps.length) {
  try {
    // Check if we have the service account key path or individual env vars
    // For this implementation, we'll try to use default application credentials
    // or specific env vars if you prefer.
    // A common pattern is using a JSON content in an ENV var for Heroku/Render configs

    // If you have a specific way the user sets this up, adapt here.
    // For now, we assume GOOGLE_APPLICATION_CREDENTIALS is set OR parameters are in env.

    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
      ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
      : undefined;

    if (serviceAccount) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } else {
      // Fallback or just standard initialization (relies on GOOGLE_APPLICATION_CREDENTIALS env var)
      admin.initializeApp();
    }
  } catch (error) {
    console.error("Firebase Admin Initialization Error:", error);
  }
}

export default admin;
