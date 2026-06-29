import { requireAuth } from "@/lib/auth";
import QueryProvider from "../components/wrapper/queryProvider";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth();

  return (
    <QueryProvider>
      {children}
    </QueryProvider>
  );
}