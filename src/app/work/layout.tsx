import Navbar from "../components/navbar"
import CustomFooter from "../components/customFooter"
import QueryProvider from "../components/wrapper/queryProvider"

export default function WorkLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>
          <QueryProvider>
            <section className="flex flex-col min-h-screen items-center pt-10">
              <Navbar/>
              {children}
            </section>
            <CustomFooter/>
          </QueryProvider>
        </body>
      </html>
    )
  }