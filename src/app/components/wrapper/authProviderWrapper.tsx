import { filterStandardClaims } from "next-firebase-auth-edge/auth/claims";
import type { Tokens } from "next-firebase-auth-edge";
import type { User } from "../../../utils/AuthContext";
import { AuthProvider } from "../../../utils/AuthProvider";

function toUser({ decodedToken }: Tokens): User {
  const {
    uid,
    email,
    picture: photoURL,
    email_verified: emailVerified,
    phone_number: phoneNumber,
    name: displayName,
    source_sign_in_provider: signInProvider,
  } = decodedToken;

  return {
    uid,
    email: email ?? null,
    displayName: displayName ?? null,
    photoURL: photoURL ?? null,
    phoneNumber: phoneNumber ?? null,
    emailVerified: emailVerified ?? false,
    providerId: signInProvider,
    customClaims: filterStandardClaims(decodedToken),
  };
}

interface AuthProviderWrapperProps {
  children: React.ReactNode;
  tokens: Tokens | null;
}

export default function AuthProviderWrapper({
  children,
  tokens,
}: AuthProviderWrapperProps) {
  const user = tokens ? toUser(tokens) : null;

  return <AuthProvider user={user}>{children}</AuthProvider>;
}