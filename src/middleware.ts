import { NextRequest, NextResponse } from "next/server";
import { authMiddleware, redirectToLogin, redirectToPath } from "next-firebase-auth-edge";

const PUBLIC_PATHS = ['/login', '/register', '/reset-password'];

export async function middleware(request: NextRequest) {
  return authMiddleware(request, {
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    cookieName: process.env.AUTH_COOKIE_NAME!,
    cookieSignatureKeys: [process.env.AUTH_COOKIE_SIGNATURE_KEY_CURRENT!, process.env.AUTH_COOKIE_SIGNATURE_KEY_PREVIOUS!],
    cookieSerializeOptions: {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "lax" as const,
      maxAge: 12 * 60 * 60 * 24, // Twelve days
    },
    serviceAccount: {
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL!,
      privateKey: process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_PRIVATE_KEY!.replace(/\\n/g, '\n')!,
    },
    handleValidToken: async ({ token, decodedToken }, headers) => {
      console.log("Valid token", token, decodedToken);
      if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
        return redirectToPath(request, '/admin');
      }
      return NextResponse.next({
        request: {
          headers
        }
      });
    },
    handleInvalidToken: async () => {
      if (!PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
        return redirectToLogin(request, {
          path: '/login',
          publicPaths: PUBLIC_PATHS
        });
      }
      return NextResponse.next();
    },
  });
}

export const config = {
  matcher: [
    "/admin",
    "/api/login",
    "/api/logout",
    "/login",
    "/register",
    "/reset-password"
  ],
};