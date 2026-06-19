"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const navItems = [
  { href: "/attributes", label: "Atributos" },
  { href: "/types", label: "Tipos" },
  { href: "/levels", label: "Niveles" },
]

export default function ClientHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname() ?? ""

  return (
    <header className="bg-gradient-to-r from-indigo-800 via-purple-900 to-pink-900 shadow-lg">
      <nav className="container mx-auto flex items-center justify-between p-4 relative">
        <div className="flex items-center gap-4">
          <Link href="/digimon" className="text-2xl font-extrabold text-yellow-400 tracking-wide">
            Digidex
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative group font-medium transition-colors duration-200 ${
                    active ? "text-yellow-300" : "text-gray-200 hover:text-yellow-300"
                  }`}
                >
                  {item.label}
                  <span
                    className="absolute left-0 -bottom-1 block w-full h-0.5 bg-yellow-300 
                               transform scale-x-0 transition-transform duration-200 ease-in-out 
                               origin-left group-hover:scale-x-100"
                  />
                </Link>
              )
            })}
          </div>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden">
          <button
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded-md text-gray-200 hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`absolute left-0 right-0 top-full z-20 md:hidden bg-gradient-to-r from-indigo-800 via-purple-900 to-pink-900 transform transition-all origin-top ${
            open ? "scale-y-100 opacity-100 pointer-events-auto" : "scale-y-0 opacity-0 pointer-events-none"
          }`}
          style={{ transformOrigin: "top" }}
        >
          <div className="container mx-auto p-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block py-2 px-3 rounded ${
                    pathname === item.href ? "text-yellow-300" : "text-gray-200 hover:text-yellow-300"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
