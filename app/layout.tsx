import "./globals.css"
import Link from "next/link"

export const metadata = {
  title: "Digidex",
  description: "Explora todos los Digimon con la Digi API",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900 font-sans">
        {/* 🔹 Barra de navegación */}
        <header className="bg-blue-600 text-white p-4">
          <nav className="flex gap-6">
            <Link href="/digimon" className="hover:underline">Digimon</Link>
            <Link href="/attributes" className="hover:underline">Atributos</Link>
            <Link href="/types" className="hover:underline">Tipos</Link>
            <Link href="/levels" className="hover:underline">Niveles</Link>
            <Link href="/fields" className="hover:underline">Campos</Link>
            <Link href="/skills" className="hover:underline">Skills</Link>
            <Link href="/favorites" className="hover:underline">Favoritos</Link>
          </nav>
        </header>

        {/* 🔹 Contenido dinámico */}
        <main className="p-6">{children}</main>

        {/* 🔹 Footer */}
        <footer className="bg-gray-200 text-center p-4 mt-10">
          <p>© 2026 Digidex - Construido con Next.js + Tailwind</p>
        </footer>
      </body>
    </html>
  )
}
