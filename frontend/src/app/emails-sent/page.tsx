"use client"
    /* eslint-disable @typescript-eslint/no-explicit-any */
    
import { Trash2, Star } from "lucide-react"
import Sidebar from "@/components/Sidebar/Sidebar"
import { useEffect, useState } from "react"

interface SentEmail {
  id: string
  recipient: string
  subject: string
  body: string
  isFavorite: boolean
  sentDate?: string
}
export default function EmailsSent() {
  const [sentEmails, setSentEmails] = useState<SentEmail[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchEmails = async () => {
      setLoading(true)
      setError("")
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/email-response`)
        if (!res.ok) throw new Error("No se pudo obtener los emails enviados")
        const data = await res.json()
        // Map API response to SentEmail[]
        const mapped: SentEmail[] = (Array.isArray(data) ? data : []).map((item: any) => ({
          id: String(item.id),
          recipient: item.client?.email || "",
          subject: item.content.split('\n')[0].trim().replace('Asunto:', '') || "(Sin asunto)",
          body: item.content || "",
          isFavorite: false,
          sentDate: item.createdAt || undefined,
        }))
        setSentEmails(mapped)
      } catch (err: any) {
        setError(err.message || "Error desconocido")
      } finally {
        setLoading(false)
      }
    }
    fetchEmails()
  }, [])

  const handleDelete = (emailId: string) => {
    console.log("Delete email:", emailId)
    // TODO: Implement delete functionality with confirmation
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
        <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Emails Enviados</h1>

        <div className="max-w-6xl mx-auto">
          {loading && (
            <div className="text-center py-12 text-blue-600">Cargando emails enviados...</div>
          )}
          {error && (
            <div className="text-center py-12 text-red-600">{error}</div>
          )}
          {/* Email Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sentEmails.map((email) => (
              <div
                key={email.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                {/* Action Buttons */}
                <div className="flex justify-end space-x-2 mb-4">
                  <button
                    onClick={() => handleDelete(email.id)}
                    className="p-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <Trash2 size={16} />
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
                    <div className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">{email.body.slice(0, 300)}...</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state when no emails */}
          {!loading && sentEmails.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">No hay emails enviados</div>
              <div className="text-gray-500 text-sm">Los emails que envíes aparecerán aquí</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
