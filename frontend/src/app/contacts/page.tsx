"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Edit, ChevronRight } from "lucide-react"
import Sidebar from "@/components/Sidebar/Sidebar"
import AddContactModal from "@/components/ContactModal/add-contact-modal"
import EditContactModal from "@/components/ContactModal/edit-contact-modal"

interface Contact {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  jobTitle: string
}

export default function Contacts() {
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // API function to fetch contacts
  const fetchContacts = async () => {
    try {
      setLoading(true)
      setError("")

      // Get token from localStorage
      const token = localStorage.getItem('accessTocken') || localStorage.getItem('accessToken') || localStorage.getItem('token') || localStorage.getItem('authToken')
      
      if (!token) {
        setError('No se encontró token de autenticación. Por favor, inicia sesión.')
        return
      }

      const response = await fetch('https://equipo10-express.onrender.com/contacts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.status === 401) {
        setError('Sesión expirada. Por favor, inicia sesión nuevamente.')
        return
      }

      if (!response.ok) {
        const errorData = await response.json()
        setError(errorData.message || 'Error al cargar los contactos')
        return
      }

      const data = await response.json()
      setContacts(data)
    } catch (error: any) {
      setError('Error de conexión. Por favor, intenta de nuevo.')
      console.error('Error fetching contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch contacts on component mount
  useEffect(() => {
    fetchContacts()
  }, [])

  const handleSelectContact = (contactId: string) => {
    setSelectedContacts((prev) =>
      prev.includes(contactId) ? prev.filter((id) => id !== contactId) : [...prev, contactId],
    )
  }

  const handleSelectAll = () => {
    if (selectedContacts.length === contacts.length) {
      setSelectedContacts([])
    } else {
      setSelectedContacts(contacts.map((contact) => contact.id))
    }
  }

  const handleDeleteSelected = () => {
    setContacts((prev) => prev.filter((contact) => !selectedContacts.includes(contact.id)))
    setSelectedContacts([])
  }

  const handleAddContact = () => {
    setIsAddModalOpen(true)
  }

  const handleSaveNewContact = (_newContact: { firstName: string; lastName: string; email: string; phone: string; company: string; jobTitle: string }) => {
    // Refresh the contacts list after adding a new contact
    fetchContacts()
  }

  const handleEditContact = (contactId: string) => {
    const contact = contacts.find((c) => c.id === contactId)
    if (contact) {
      setEditingContact(contact)
      setIsEditModalOpen(true)
    }
  }

  const handleSaveEditedContact = (updatedContact: Contact) => {
    setContacts((prev) => prev.map((contact) => (contact.id === updatedContact.id ? updatedContact : contact)))
  }

  const handleDeleteContact = (contactId: string) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== contactId))
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <h1 className="text-4xl font-semibold text-blue-600 mb-8 text-center">Mis Contactos</h1>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Lista de contactos</h2>
              <p className="text-gray-600">Lista de contactos agregados</p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddContact}
                className="flex items-center space-x-2 px-6 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors border border-blue-500"
              >
                <Plus size={16} />
                <span>Agregar nuevo contacto</span>
              </button>

              <button
                onClick={handleDeleteSelected}
                disabled={selectedContacts.length === 0}
                className="flex items-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Trash2 size={20} />
                <span>Eliminar</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 m-4 rounded-xl">
                {error}
                <button 
                  onClick={fetchContacts}
                  className="ml-2 text-red-800 underline hover:text-red-900"
                >
                  Intentar de nuevo
                </button>
              </div>
            )}
            
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-2 text-gray-600">Cargando contactos...</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="w-12 p-4">
                      <input
                        type="checkbox"
                        checked={selectedContacts.length === contacts.length && contacts.length > 0}
                        onChange={handleSelectAll}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </th>
                    <th className="text-left p-4 font-semibold text-gray-700">Nombre</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Email</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Teléfono</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Empresa</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Cargo</th>
                    <th className="text-left p-4 font-semibold text-gray-700">Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-gray-500">
                        No hay contactos disponibles. Agrega tu primer contacto.
                      </td>
                    </tr>
                  ) : (
                    contacts.map((contact, index) => (
                      <tr key={contact.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={selectedContacts.includes(contact.id)}
                            onChange={() => handleSelectContact(contact.id)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <span className="font-medium text-gray-900">{contact.firstName} {contact.lastName}</span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-700">{contact.email}</td>
                        <td className="p-4 text-gray-700">{contact.phone}</td>
                        <td className="p-4 text-gray-700">{contact.company}</td>
                        <td className="p-4 text-gray-700">{contact.jobTitle}</td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditContact(contact.id)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteContact(contact.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-start items-center mt-6">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">01</span>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Add Contact Modal */}
      <AddContactModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSave={handleSaveNewContact} />

      {/* Edit Contact Modal */}
      <EditContactModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setEditingContact(null)
        }}
        onSave={handleSaveEditedContact}
        contact={editingContact}
      />
    </div>
  )
}