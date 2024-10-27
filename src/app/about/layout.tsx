import Navbar from "../components/navbar"
import CustomFooter from "../components/customFooter"

export default function AboutLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
      <body>
        <section className="flex flex-col min-h-screen items-center pt-10">
          <Navbar/>
          {children}
        </section>
        <CustomFooter/>
      </body>
      </html>
    )
  }