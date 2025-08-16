"use client";

import Link from "next/link";
import { PhoneCall } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-color">
      <div className="max-w-7xl mx-auto px-8 py-8 flex justify-between items-center">
        <Link href="/" className="text-xl font-semibold">
          <img src="/logo.png" alt="MGallagher Construction Logo" className="mx-auto max-w-50" />
        </Link>

        <button
          className="md:hidden text-5xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          ☰
        </button>
        <nav className="hidden md:flex space-x-6 font-bold text-xl text-white items-center">
          <Link href="/services" className="hover:text-black">Services</Link>
          <Link href="/portfolio" className="hover:text-black">Our Work</Link>
          <Link href="/about" className="hover:text-black">About</Link>
          <Link href="/contact" className="hover:text-black">Contact</Link>
          <Link
            href="tel:8565551234"
            className="ml-4 py-3 px-8 bg-black text-white rounded-full flex items-center gap-2 hover:bg-stone-950 text-xl"
          >
            <PhoneCall size={18} className="text-white" />
            (856) 889-7887
          </Link>
        </nav>
      </div>

      {/* Mobile nav dropdown */}
      {
        menuOpen && (
          <nav className="md:hidden px-8 pb-4 space-y-3 font-bold text-l capitalize">
            <Link href="/services" className="block">Services</Link>
            <Link href="/portfolio" className="block">Portfolio</Link>
            <Link href="/contact" className="block">Contact</Link>
            <Link
              href="tel:8565551234"
              className="block px-4 py-2 bg-black text-white rounded-full flex items-center gap-2 
                       hover:bg-gray-700 transition shadow-[0_0_10px_rgba(255,0,0,0.3)] 
                       hover:shadow-[0_0_15px_rgba(255,0,0,0.9)] mt-2"
            >
              <PhoneCall size={16} className="text-red-500" />
              (856) 889-7887
            </Link>
          </nav>
        )
      }
    </header >
  );
}


