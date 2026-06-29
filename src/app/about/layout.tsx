import Navbar from "../components/navbar"
import CustomFooter from "../components/customFooter"

export default function AboutLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <>
        <section className="flex flex-col min-h-screen items-center pt-10">
          <Navbar/>
          {children}
        </section>
        <CustomFooter/>
      </>
    )
  }