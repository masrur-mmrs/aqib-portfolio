import { filterStandardClaims } from "next-firebase-auth-edge/lib/auth/claims";
import { Tokens, getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { User } from "../../../utils/AuthContext";
import { AuthProvider } from "../../../utils/AuthProvider";

const toUser = ({ decodedToken }: Tokens): User => {
    const {
      uid,
      email,
      picture: photoURL,
      email_verified: emailVerified,
      phone_number: phoneNumber,
      name: displayName,
      source_sign_in_provider: signInProvider,
    } = decodedToken;
   
    const customClaims = filterStandardClaims(decodedToken);
   
    return {
      uid,
      email: email ?? null,
      displayName: displayName ?? null,
      photoURL: photoURL ?? null,
      phoneNumber: phoneNumber ?? null,
      emailVerified: emailVerified ?? false,
      providerId: signInProvider,
      customClaims,
    };
  };

import React from 'react';

interface AuthProviderWrapperProps {
    children: React.ReactNode;
}

const AuthProviderWrapper: React.FC<AuthProviderWrapperProps> = async ({children}) => {
    const tokens = await getTokens(cookies(), {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
        cookieName: process.env.AUTH_COOKIE_NAME!,
        cookieSignatureKeys: [process.env.AUTH_COOKIE_SIGNATURE_KEY_CURRENT!, process.env.AUTH_COOKIE_SIGNATURE_KEY_PREVIOUS!],
        serviceAccount: {
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
          clientEmail: process.env.FIREBASE_ADMIN_PROJECT_ID!,
          privateKey: process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_PRIVATE_KEY!.replace(/\\n/g, '\n')!
        },
      });
      const user = tokens ? toUser(tokens) : null;
    return (
            <AuthProvider user={user}>
                {children}
            </AuthProvider>
    );
};


export default AuthProviderWrapper;