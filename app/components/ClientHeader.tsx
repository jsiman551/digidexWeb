'use client';

import Link from 'next/link';

export default function ClientHeader() {
  return (
    <header className="bg-gradient-to-r from-indigo-800 via-purple-900 to-pink-900 shadow-lg">
      <nav className="container mx-auto flex items-center justify-center p-4">
        {/* Logo SEO-friendly */}
        <Link
          href="/digimon"
          className="text-3xl font-extrabold text-yellow-400 tracking-wide"
          aria-label="Ir a la página principal de Digidex"
        >
          <h1 className="sr-only">Digidex</h1>
          <span aria-hidden="true">Digidex</span>
        </Link>
      </nav>
    </header>
  );
}
