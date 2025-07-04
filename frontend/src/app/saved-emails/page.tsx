"use client"

import { Edit, Star } from "lucide-react"
import Sidebar from "@/components/Sidebar/Sidebar"

interface SavedEmail {
  id: string
  recipient: string
  subject: string
  body: string
  isFavorite: boolean
}

export default function SavedEmails() {
  // Mock data for saved emails
  const savedEmails: SavedEmail[] = [
    {
      id: "1",
      recipient: "cliente2@gmail.com",
      subject: "Potenciemos tu marca con...",
      body: "Hola Cliente2,\nEstuve analizando tu marca y creo que podemos ayudarte a crecer con una propuesta de marketing 100% enfocada en tus objetivos.\nNos especializamos en estrategias pe...",
      isFavorite: false,
    },
    {
      id: "2",
      recipient: "cliente2@gmail.com",
      subject: "Potenciemos tu marca con...",
      body: "Hola Cliente2,\nEstuve analizando tu marca y creo que podemos ayudarte a crecer con una propuesta de marketing 100% enfocada en tus objetivos.\nNos especializamos en estrategias pe...",
      isFavorite: false,
    },
    {
      id: "3",
      recipient: "cliente2@gmail.com",
      subject: "Potenciemos tu marca con...",
      body: "Hola Cliente2,\nEstuve analizando tu marca y creo que podemos ayudarte a crecer con una propuesta de marketing 100% enfocada en tus objetivos.\nNos especializamos en estrategias pe...",
      isFavorite: false,
    },
    {
      id: "4",
      recipient: "cliente2@gmail.com",
      subject: "Potenciemos tu marca con...",
      body: "Hola Cliente2,\nEstuve analizando tu marca y creo que podemos ayudarte a crecer con una propuesta de marketing 100% enfocada en tus objetivos.\nNos especializamos en estrategias pe...",
      isFavorite: false,
    },
  ]

  const handleEdit = (emailId: string) => {
    console.log("Edit email:", emailId)
    // TODO: Implement edit functionality
  }

  const handleToggleFavorite = (emailId: string) => {
    console.log("Toggle favorite:", emailId)
    // TODO: Implement favorite toggle functionality
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Emails Guardados</h1>

        <div className="max-w-6xl mx-auto">
          {/* Email Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedEmails.map((email) => (
              <div
                key={email.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                {/* Action Buttons */}
                <div className="flex justify-end space-x-2 mb-4">
                  <button
                    onClick={() => handleEdit(email.id)}
                    className="p-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleToggleFavorite(email.id)}
                    className={`p-2 border rounded-lg transition-colors ${
                      email.isFavorite
                        ? "text-yellow-500 border-yellow-500 bg-yellow-50"
                        : "text-blue-600 border-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    <Star size={16} fill={email.isFavorite ? "currentColor" : "none"} />
                  </button>
                </div>

                {/* Email Content */}
                <div className="space-y-4">
                  {/* Recipient */}
                  <div className="flex">
                    <span className="text-orange-500 font-medium text-sm min-w-fit mr-4">Destinatario:</span>
                    <span className="text-gray-800 text-sm">{email.recipient}</span>
                  </div>

                  {/* Subject */}
                  <div className="flex">
                    <span className="text-orange-500 font-medium text-sm min-w-fit mr-4">Asunto:</span>
                    <span className="text-gray-800 text-sm">{email.subject}</span>
                  </div>

                  {/* Body */}
                  <div>
                    <span className="text-orange-500 font-medium text-sm block mb-2">Cuerpo:</span>
                    <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{email.body}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}