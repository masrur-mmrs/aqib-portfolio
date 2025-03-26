import QueryProvider from "../components/wrapper/queryProvider";

export default async function RootLayout({
  children,
}: {
  children: JSX.Element
}) {
  
 
  return (
    <html lang="en">
      <head />
      <body>
        <QueryProvider>
            {children}
        </QueryProvider>
      </body>
    </html>
  );
}