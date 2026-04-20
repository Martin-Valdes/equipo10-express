"use client"

import Image from "next/image"
import { Check } from "lucide-react"

const features = [
  "Crear emails con inteligencia artificial adaptados a tu marca",
  "Enviar correos desde la plataforma, sin herramientas externas",
  "Guardar, revisar y editar tus emails en cualquier momento",
  "Administrar tus listas de contactos de forma simple y ordenada",
]

export default function About() {
  return (
    <div id="about">
      {/* ── Sección "¿Qué es easyemail?" ── */}
      <section className="bg-[#EEF3F8] flex flex-col md:flex-row items-center justify-between px-8 md:px-16 lg:px-24 py-20 gap-10">
        {/* Left: illustration */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-[676px] h-[695px]">
            {/* Subtle grid background */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <Image
              src="/robot-arm.png"
              alt="Robot IA"
              fill
              className="object-contain relative z-10"
            />
          </div>
        </div>

        {/* Right: text */}
        <div className="w-full md:w-1/2 max-w-xl">
          <h2 className="text-3xl md:text-7xl font-bold text-[#1B3A5C] mb-4">
            ¿Qué es easyemail?
          </h2>
          <p className="text-orange-500 font-semibold text-base md:text-4xl mb-6">
            Menos tiempo escribiendo, más tiempo conectando...
          </p>
          <p className="text-gray-600 text-sm md:text-[24px] leading-relaxed mb-4">
            EasyEmail es una plataforma pensada para empresas que quieren
            optimizar su comunicación por correo sin depender de múltiples
            herramientas.
          </p>
          <p className="text-gray-600 text-sm md:text-[24px] leading-relaxed">
            Nuestra IA te ayuda a redactar mensajes efectivos en segundos,
            personalizados según tu rubro, tono y objetivos. Además, podés
            enviarlos desde el mismo lugar, gestionar tus contactos y tener un
            historial de todo lo que hiciste.
          </p>
        </div>
      </section>

      {/* ── Sección de features ── */}
      <section className="bg-[#EEF3F8] px-8 md:px-16 lg:px-24 py-20">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-[48px] font-bold text-[#1B3A5C] leading-snug mb-4">
            Ideal para equipos de marketing, ventas y atención al cliente.
          </h2>
          <p className="text-gray-600 text-sm md:text-[32px]">
            Automatizá tareas, ahorrá tiempo y conectá mejor con tus clientes.
          </p>
        </div>

        <ul className="max-w-2xl mx-auto flex flex-col gap-5">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-4 bg-white rounded-xl px-6 py-4 shadow-sm">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#1B4A6B] flex items-center justify-center">
                <Check className="w-4 h-4 text-white stroke-[2.5]" />
              </span>
              <span className="text-gray-700 text-sm md:text-[20px]">{feature}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
