"use client"

import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-12 py-5 bg-white">
      {/* Logo */}
      <Link href="/">
        <Image
          src="/easyemail-logo.png"
          alt="easyEmail logo"
          width={243}
          height={49}
          className="object-contain"
          priority
        />
      </Link>

      {/* Nav links */}
      <div className="flex gap-30">
      <div className="hidden md:flex items-center gap-8 text-gray-700 text-xl font-medium">
        <Link href="/" className="hover:text-gray-900 transition-colors">
          Home
        </Link>
        <Link href="#about" className="hover:text-gray-900 transition-colors">
          ¿Qué es easyemail?
        </Link>
        <Link href="#qa" className="hover:text-gray-900 transition-colors">
          Q&A
        </Link>
      </div>

      {/* Auth buttons */}
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="px-6 py-2 rounded-full border border-[#1B4A6B] text-[#1B4A6B] text-[20px] font-medium hover:bg-[#1B4A6B] hover:text-white transition-all duration-200"
        >
          Sign in
        </Link>
        <Link
          href="/register"
          className="px-6 py-2 rounded-full bg-[#1B4A6B] text-white text-[20px] font-medium hover:bg-[#153d5a] transition-all duration-200"
        >
          Sign up
        </Link>
      </div>
      </div>
    </nav>
  )
}
