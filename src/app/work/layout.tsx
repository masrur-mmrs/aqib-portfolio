import Navbar from "../components/navbar"

export default function WorkLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section className="flex flex-col min-h-screen items-center pt-10">
        <Navbar/>
        {children}
      </section>
    )
  }