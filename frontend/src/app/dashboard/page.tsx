"use client";

import { useState } from "react";
import { Upload, Trash2, Copy, Bookmark } from "lucide-react";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function Dashboard() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedTones, setSelectedTones] = useState<string[]>([]);
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [replyToSpecific, setReplyToSpecific] = useState(false);
  const [originalEmailText, setOriginalEmailText] = useState("");

  const topics = [
    "Seguimiento",
    "Contenido útil",
    "Propuesta de reunión",
    "Promoción de productos",
    "Invitación",
  ];

  const tones = [
    "Profesional",
    "Cercano",
    "Inspirador",
    "Informal",
    "Urgente",
    "Educativo",
  ];

  const toggleSelection = (
    item: string,
    selectedItems: string[],
    setSelectedItems: (items: string[]) => void
  ) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex">
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-semibold text-blue-800 mb-8 text-center">
            Dashboard
          </h1>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Email Topic Section */}
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                ¿Sobre qué trata el email?
              </h2>
              <div className="flex flex-wrap gap-3">
                {topics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() =>
                      toggleSelection(topic, selectedTopics, setSelectedTopics)
                    }
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                      selectedTopics.includes(topic)
                        ? "bg-blue-100 border-blue-300 text-blue-700"
                        : "bg-white border-gray-300 text-gray-700 hover:border-blue-300 hover:text-blue-600"
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Email Tone Section */}
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                ¿Cómo querés que suene el email?
              </h2>
              <div className="flex flex-wrap gap-3">
                {tones.map((tone) => (
                  <button
                    key={tone}
                    onClick={() =>
                      toggleSelection(tone, selectedTones, setSelectedTones)
                    }
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                      selectedTones.includes(tone)
                        ? "bg-blue-100 border-blue-300 text-blue-700"
                        : "bg-white border-gray-300 text-gray-700 hover:border-blue-300 hover:text-blue-600"
                    }`}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>

            {/* Recipient Section */}
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                ¿Para quién es este email?
              </h2>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Ej. Nuevos usuarios, un cliente, el equipo de ventas"
                className="w-full p-4 border border-gray-300 rounded-lg text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Subject Section */}
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                ¿Qué asunto querés ponerle al email?
              </h2>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Ej. Bienvenida, recordatorio de pago, lanzamiento de un producto"
                className="w-full p-4 border border-gray-300 rounded-lg text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Message Section */}
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                ¿Qué mensaje querés enviar?
              </h2>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Contame qué mensaje querés generar..."
                rows={6}
                className="w-full p-4 border border-gray-300 rounded-lg text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Reply Toggle */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-lg font-medium text-gray-800">
                  ¿Te gustaría responder a un mensaje específico?
                </span>
                <button
                  onClick={() => setReplyToSpecific(!replyToSpecific)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    replyToSpecific ? "bg-orange-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      replyToSpecific ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Conditional textarea that appears when toggle is on */}
              {replyToSpecific && (
                <div className="transition-all duration-300 ease-in-out">
                  <textarea
                    value={originalEmailText}
                    onChange={(e) => setOriginalEmailText(e.target.value)}
                    placeholder="Pega el texto completo o el fragmento del email original para que podamos ayudarte a generar la mejor respuesta."
                    rows={6}
                    className="w-full p-4 border border-gray-300 rounded-lg text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              )}
            </div>

            {/* Generate Button */}
            <div className="flex justify-end">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors">
                Generar Email
              </button>
            </div>

            {/* Suggested Text Section */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                Texto sugerido para el email
              </h2>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="text-gray-400 mb-4">Placeholder</div>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors">
                      <Trash2 size={16} />
                      <span>Eliminar</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors">
                      <Copy size={16} />
                      <span>Copiar</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors">
                      <Bookmark size={16} />
                      <span>Guardar</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Send email Button */}
            <div className="flex justify-end">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors">
                Enviar Email
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              ¿Tenés algo para adjuntar?
            </h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="mx-auto mb-3 text-gray-400" size={32} />
              <h4 className="text-gray-600 font-medium mb-2">
                Adjuntar archivos
              </h4>
              <p className="text-sm text-gray-500">
                Formatos permitidos: PDF, JPG, PNG Max: 5MB
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
