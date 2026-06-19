import "./globals.css"
import ClientHeader from "./components/ClientHeader"

export const metadata = {
  title: "Digidex",
  description: "Enciclopedia Digital de Digimon",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-950 text-gray-100 font-sans">
        <ClientHeader />

        <main className="container mx-auto p-6">{children}</main>

        <footer className="bg-gray-900 text-center py-4 mt-12 text-gray-400">
          <p>© 2026 Digidex - Powered by Digi API</p>
        </footer>
      </body>
    </html>
  )
}
