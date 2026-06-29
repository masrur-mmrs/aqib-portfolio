import React from "react";
import { requireGuest } from "@/lib/auth";
import QueryProvider from "../components/wrapper/queryProvider";

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireGuest();

  return <QueryProvider>{children}</QueryProvider>;
}