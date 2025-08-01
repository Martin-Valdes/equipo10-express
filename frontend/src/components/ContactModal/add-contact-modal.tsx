"use client"

import React, { useState } from "react"
import { X, Trash2 } from "lucide-react"

interface AddContactModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (contact: { firstName: string; lastName: string; email: string; phone: string; company: string; jobTitle: string }) => void
}

export default function AddContactModal({ isOpen, onClose, onSave }: AddContactModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // API function to create contact (moved inside component)
  const createContact = async (contactData: any) => {
    // Debug: Check all localStorage keys
    console.log('All localStorage keys:', Object.keys(localStorage))
    console.log('localStorage length:', localStorage.length)
    
    // Debug: Check specific keys
    const accessTocken = localStorage.getItem('accessTocken')
    const accessToken = localStorage.getItem('accessToken')
    const token = localStorage.getItem('token')
    const authToken = localStorage.getItem('authToken')
    
    console.log('accessTocken:', accessTocken ? 'Found' : 'Not found')
    console.log('accessToken:', accessToken ? 'Found' : 'Not found') 
    console.log('token:', token ? 'Found' : 'Not found')
    console.log('authToken:', authToken ? 'Found' : 'Not found')
    
    // Try to get any token
    const finalToken = accessTocken || accessToken || token || authToken
    
    console.log('Final token found:', finalToken ? 'Yes' : 'No')
    console.log('Final token value:', finalToken ? finalToken.substring(0, 20) + '...' : 'null')
    
    // Check if token exists
    if (!finalToken) {
      throw new Error('No se encontró token de autenticación. Por favor, inicia sesión.')
    }
    
    const response = await fetch('https://equipo10-express.onrender.com/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${finalToken}`
      },
      body: JSON.stringify(contactData)
    })
    
    // If unauthorized, suggest re-login
    if (response.status === 401) {
      throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.')
    }
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al crear el contacto')
    }
    
    return response.json()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formData.firstName && formData.lastName && formData.email && formData.phone && formData.company && formData.jobTitle) {
      setIsLoading(true)
      setError("")
      
      try {
        // Prepare the data for the API
        const contactData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          jobTitle: formData.jobTitle,
          isFavorite: false
        }

        // Create the contact using the API function
        const createdContact = await createContact(contactData)
        
        // Pass the created contact to the parent component
        onSave(formData)
        setFormData({ firstName: "", lastName: "", email: "", phone: "", company: "", jobTitle: "" })
        onClose()
        console.log('Contact created successfully:', createdContact)
      } catch (error: any) {
        setError(error.message || 'Error de conexión. Por favor, intenta de nuevo.')
        console.error('Error creating contact:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleClose = () => {
    setFormData({ firstName: "", lastName: "", email: "", phone: "", company: "", jobTitle: "" })
    setError("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-blue-50 rounded-2xl p-8 w-full max-w-lg mx-4 relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Name Field */}
          <div>
            <label htmlFor="firstName" className="block text-lg font-medium text-gray-800 mb-3">
              Nombre
            </label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              placeholder="Ej: Juan"
              required
              className="w-full px-4 py-4 border border-gray-300 rounded-xl bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Last Name Field */}
          <div>
            <label htmlFor="lastName" className="block text-lg font-medium text-gray-800 mb-3">
              Apellido
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              placeholder="Ej: Pérez"
              required
              className="w-full px-4 py-4 border border-gray-300 rounded-xl bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-800 mb-3">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Ej: juan@ejemplo.com"
              required
              className="w-full px-4 py-4 border border-gray-300 rounded-xl bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-lg font-medium text-gray-800 mb-3">
              Teléfono
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Ej: +54 11 1234-5678"
              required
              className="w-full px-4 py-4 border border-gray-300 rounded-xl bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Company Field */}
          <div>
            <label htmlFor="company" className="block text-lg font-medium text-gray-800 mb-3">
              Empresa
            </label>
            <input
              type="text"
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Ej: Inmobiliaria XYZ"
              required
              className="w-full px-4 py-4 border border-gray-300 rounded-xl bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Job Title Field */}
          <div>
            <label htmlFor="jobTitle" className="block text-lg font-medium text-gray-800 mb-3">
              Cargo
            </label>
            <input
              type="text"
              id="jobTitle"
              value={formData.jobTitle}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
              placeholder="Ej: Gerente de Ventas"
              required
              className="w-full px-4 py-4 border border-gray-300 rounded-xl bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={handleClose}
              className="flex items-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 transition-colors"
            >
              <Trash2 size={18} />
              <span>Cancelar</span>
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Creando...' : 'Agregar contacto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}