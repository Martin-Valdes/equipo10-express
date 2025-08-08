"use client"

import React, { useState, useEffect } from "react"
import { X, Trash2 } from "lucide-react"

interface Contact {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  jobTitle: string
}

interface EditContactModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (contact: Contact) => void
  contact: Contact | null
}

export default function EditContactModal({ isOpen, onClose, onSave, contact }: EditContactModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
  })

  // Pre-fill form when contact changes
  useEffect(() => {
    if (contact) {
      setFormData({
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: contact.phone,
        company: contact.company,
        jobTitle: contact.jobTitle,
      })
    }
  }, [contact])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.firstName && formData.lastName && formData.email && formData.phone && formData.company && formData.jobTitle && contact) {
      const updatedContact: Contact = {
        ...contact,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        jobTitle: formData.jobTitle,
      }
      onSave(updatedContact)
      onClose()
    }
  }

  const handleClose = () => {
    // Reset form to original contact data
    if (contact) {
      setFormData({
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: contact.phone,
        company: contact.company,
        jobTitle: contact.jobTitle,
      })
    }
    onClose()
  }

  if (!isOpen || !contact) return null

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
            <label htmlFor="edit-firstName" className="block text-lg font-medium text-gray-800 mb-3">
              Nombre
            </label>
            <input
              type="text"
              id="edit-firstName"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              placeholder="Ej: Juan"
              required
              className="w-full px-4 py-4 border border-gray-300 rounded-xl bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Last Name Field */}
          <div>
            <label htmlFor="edit-lastName" className="block text-lg font-medium text-gray-800 mb-3">
              Apellido
            </label>
            <input
              type="text"
              id="edit-lastName"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              placeholder="Ej: Pérez"
              required
              className="w-full px-4 py-4 border border-gray-300 rounded-xl bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="edit-email" className="block text-lg font-medium text-gray-800 mb-3">
              Email
            </label>
            <input
              type="email"
              id="edit-email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Ej: juan@ejemplo.com"
              required
              className="w-full px-4 py-4 border border-gray-300 rounded-xl bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="edit-phone" className="block text-lg font-medium text-gray-800 mb-3">
              Teléfono
            </label>
            <input
              type="tel"
              id="edit-phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Ej: +54 11 1234-5678"
              required
              className="w-full px-4 py-4 border border-gray-300 rounded-xl bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Company Field */}
          <div>
            <label htmlFor="edit-company" className="block text-lg font-medium text-gray-800 mb-3">
              Empresa
            </label>
            <input
              type="text"
              id="edit-company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Ej: Inmobiliaria XYZ"
              required
              className="w-full px-4 py-4 border border-gray-300 rounded-xl bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Job Title Field */}
          <div>
            <label htmlFor="edit-jobTitle" className="block text-lg font-medium text-gray-800 mb-3">
              Cargo
            </label>
            <input
              type="text"
              id="edit-jobTitle"
              value={formData.jobTitle}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
              placeholder="Ej: Gerente de Ventas"
              required
              className="w-full px-4 py-4 border border-gray-300 rounded-xl bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

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
              className="px-8 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors"
            >
              Editar contacto
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}