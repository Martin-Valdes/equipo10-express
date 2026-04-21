"use client"

import { useState } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "¿Necesito saber redactar o tener experiencia en email marketing?",
    answer:
      "No. easyEmail está diseñada para que cualquier persona pueda generar correos profesionales en pocos clics, incluso sin experiencia previa.",
  },
  {
    question: "¿Puedo enviar los correos desde la plataforma?",
    answer:
      "Sí. Podés enviar campañas directamente desde easyEmail sin necesidad de usar herramientas externas.",
  },
  {
    question: "¿Puedo guardar y editar mis emails después?",
    answer:
      "Claro. Todos tus emails quedan guardados en tu historial y podés editarlos o reutilizarlos cuando quieras.",
  },
  {
    question: "¿Cómo cargo mis contactos?",
    answer:
      "Podés agregar contactos manualmente o importarlos desde un archivo. La plataforma te permite organizarlos en listas.",
  },
  {
    question: "¿Qué tan personalizada es la IA?",
    answer:
      "La IA adapta el contenido según el rubro, tono y objetivos que vos definís. Cada email se genera acorde a tu marca.",
  },
]

export default function QA() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section id="qa" className="bg-[#FAF0EB] px-8 md:px-16 lg:px-24 py-20">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-[48px] font-bold text-[#1B3A5C] underline underline-offset-4 decoration-[#1B3A5C] mb-4">
          Q&A
        </h2>
        <p className="text-[#625B5B] font-semibold text-sm md:text-[32px]">
          Resolvé tus dudas y descubrí cómo aprovechar easyEmail al máximo.
        </p>
      </div>

      {/* Accordion */}
      <div className="max-w-2xl mx-auto flex flex-col gap-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-white border border-[#1B4A6B] rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between px-6 py-4 text-left"
            >
              <span
                className={`text-sm md:text-[20px] font-medium ${
                  openIndex === i ? "text-orange-500" : "text-[#1B3A5C]"
                }`}
              >
                {faq.question}
              </span>
              {openIndex === i ? (
                <ChevronUp className="flex-shrink-0 w-5 h-5 text-[#1B3A5C]" />
              ) : (
                <ChevronDown className="flex-shrink-0 w-5 h-5 text-[#1B3A5C]" />
              )}
            </button>

            {openIndex === i && (
              <div className="px-6 pb-5">
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
