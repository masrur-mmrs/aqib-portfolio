import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getTokens } from "next-firebase-auth-edge";
import type { Tokens } from "next-firebase-auth-edge";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  cookieName: process.env.AUTH_COOKIE_NAME!,
  cookieSignatureKeys: [
    process.env.AUTH_COOKIE_SIGNATURE_KEY_CURRENT!,
    process.env.AUTH_COOKIE_SIGNATURE_KEY_PREVIOUS!,
  ],
  serviceAccount: {
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL!,
    privateKey: process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_PRIVATE_KEY!.replace(
      /\\n/g,
      "\n"
    ),
  },
};

export const getUser = cache(async (): Promise<Tokens | null> => {
  try {
    const cookieStore = await cookies();
    return await getTokens(cookieStore, firebaseConfig);
  } catch {
    return null;
  }
});

export async function requireAuth(): Promise<Tokens> {
  const tokens = await getUser();
  if (!tokens) redirect("/login");
  return tokens;
}

export async function requireGuest(): Promise<void> {
  const tokens = await getUser();
  if (tokens) redirect("/admin");
}