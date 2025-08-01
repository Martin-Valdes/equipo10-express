"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function Register() {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // POST request to registration API
      const response = await fetch('https://equipo10-express.onrender.com/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: password,
          roles: ["USER"] // Default role, can be modified as needed
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error en el registro')
      }

      const data = await response.json()
      console.log('Registration successful:', data)

      // Redirect to login page after successful registration
      router.push("/login")
    } catch (error) {
      console.error("Registration failed:", error)
      // You can add error state here to show user-friendly error messages
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-blue-50 flex">
      {/* Left side - Registration Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-orange-500 mb-8">Registro</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full px-4 py-4 pr-12 border-2 border-blue-300 rounded-lg text-gray-700 placeholder-blue-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-400" size={20} />
            </div>

            {/* First Name Field */}
            <div className="relative">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Nombre"
                required
                className="w-full px-4 py-4 border-2 border-blue-300 rounded-lg text-gray-700 placeholder-blue-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Last Name Field */}
            <div className="relative">
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Apellido"
                required
                className="w-full px-4 py-4 border-2 border-blue-300 rounded-lg text-gray-700 placeholder-blue-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
                className="w-full px-4 py-4 pr-12 border-2 border-blue-300 rounded-lg text-gray-700 placeholder-blue-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Registrando..." : "Registrarse"}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center">
            <span className="text-gray-600">¿Ya tenés una cuenta? </span>
            <Link href="/login" className="text-orange-500 hover:text-orange-600 font-medium">
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Branding */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-8xl font-bold text-gray-800">
            easyem<span className="text-orange-500">AI</span>l
          </h1>
        </div>
      </div>
    </div>
  )
}