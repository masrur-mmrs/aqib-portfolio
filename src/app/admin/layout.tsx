export default async function RootLayout({
  children,
}: {
  children: JSX.Element
}) {
  
 
  return (
    <html lang="en">
      <head />
      <body>
            {children}
      </body>
    </html>
  );
}