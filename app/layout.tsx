import "./globals.css"
import Link from "next/link"

export const metadata = {
  title: "Digidex",
  description: "Enciclopedia Digital de Digimon",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-950 text-gray-100 font-sans">
        {/* Header */}
          <header className="bg-gradient-to-r from-indigo-800 via-purple-900 to-pink-900 shadow-lg">
            <nav className="container mx-auto flex justify-between items-center p-4">
              {/* Logo */}
              <Link href="/digimon" className="text-2xl font-extrabold text-yellow-400 tracking-wide">
                Digidex
              </Link>

              {/* Links */}
              <div className="flex space-x-8">
                {[
                  { href: "/digimon", label: "Digimon" },
                  { href: "/attributes", label: "Atributos" },
                  { href: "/types", label: "Tipos" },
                  { href: "/levels", label: "Niveles" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative text-gray-200 font-medium transition-colors duration-300 ease-in-out hover:text-yellow-300"
                  >
                    {item.label}
                    <span
                      className="absolute left-0 -bottom-1 block w-full h-0.5 bg-yellow-300 
                                transform scale-x-0 transition-transform duration-300 ease-in-out 
                                origin-left group-hover:scale-x-100"
                    ></span>
                  </Link>
                ))}
              </div>
            </nav>
          </header>

        {/* Main content */}
        <main className="container mx-auto p-6">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-900 text-center py-4 mt-12 text-gray-400">
          <p>© 2026 Digidex - Powered by Digi API</p>
        </footer>
      </body>
    </html>
  )
}
