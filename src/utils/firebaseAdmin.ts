// lib/firebase-admin.ts
import * as admin from 'firebase-admin';

export function initFirebase() {
  if (admin.apps.length > 0) {
    return admin.app();
  }

  const serviceAccount = {
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_PRIVATE_KEY!.replace(/\\n/g, '\n')!,
  };

  if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
    throw new Error('Missing Firebase Admin SDK credentials');
  }

  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}