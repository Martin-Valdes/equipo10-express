"use client"

import Link from "next/link"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 lg:px-24 py-16 min-h-[calc(100vh-72px)] bg-white">
      {/* Left: Text content */}
      <div className="max-w-lg w-full md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl md:text-[72px] font-bold text-[#33658A] leading-tight mb-6">
          Creá y enviá tus emails con IA, fácil y rápido.
        </h1>
        <p className="text-gray-500 text-base md:text-[24px] leading-relaxed mb-10">
          Con easyEmail, generá correos profesionales en segundos, enviá
          campañas directamente desde la plataforma y gestioná tus contactos
          sin complicaciones.
        </p>
        <Link
          href="#about"
          className="inline-block px-10 py-4 border border-[#33658A] text-[#33658A] font-semibold text-[20px] rounded hover:bg-[#33658A] hover:text-white transition-all duration-200"
        >
          Conocer más
        </Link>
      </div>

      {/* Right: Robot illustration */}
      <div className="relative flex items-center justify-center w-full md:w-1/2 mt-12 md:mt-0">
        {/* Glow background */}
        <div className="absolute w-[380px] h-[380px] rounded-full bg-gradient-to-br from-orange-200 via-rose-100 to-pink-100 blur-3xl opacity-60" />
        {/* Replace /ai-robot.png with your robot illustration */}
        <Image
          src="/ai-robot.png"
          alt="Asistente IA"
          width={460}
          height={460}
          className="relative z-10 object-contain drop-shadow-xl"
          priority
        />
      </div>
    </section>
  )
}

