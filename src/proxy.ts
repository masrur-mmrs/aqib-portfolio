import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authMiddleware } from "next-firebase-auth-edge";

const authConfig = {
  loginPath: "/api/login",
  logoutPath: "/api/logout",
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  cookieName: process.env.AUTH_COOKIE_NAME!,
  cookieSignatureKeys: [
    process.env.AUTH_COOKIE_SIGNATURE_KEY_CURRENT!,
    process.env.AUTH_COOKIE_SIGNATURE_KEY_PREVIOUS!,
  ],
  cookieSerializeOptions: {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 12 * 60 * 60 * 24, // twelve days
  },
  serviceAccount: {
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL!,
    privateKey: process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_PRIVATE_KEY!.replace(
      /\\n/g,
      "\n"
    ),
  },
};

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();

  if (url.pathname === "/") {
    url.pathname = "/work"
    return NextResponse.redirect(url);
  }

  return authMiddleware(request, {
...authConfig,

    handleValidToken: async (_tokens, headers) => {
      return NextResponse.next({ request: { headers } });
    },

    handleInvalidToken: async () => {
      return NextResponse.next();
    },

    handleError: async (error) => {
      console.error("[proxy] auth error:", error);
      return NextResponse.next();
    },
  });
}

export const config = {
  matcher: [
    "/",
    "/admin",
    "/api/login",
    "/api/logout",
    "/login",
    "/register",
    "/reset-password"
  ],
};