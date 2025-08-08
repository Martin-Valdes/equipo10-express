"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // POST request to login API
      const response = await fetch('https://equipo10-express.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Credenciales inválidas')
      }

      const data = await response.json()
      
      // Debug: Log the entire response to see the structure
      console.log('Login response:', data)
      
      // Store the token if provided - check multiple possible property names
      if (data.accessTocken) {
        localStorage.setItem('authToken', data.accessTocken)
        console.log('Token stored:', data.accessTocken)
      } else if (data.access_token) {
        localStorage.setItem('authToken', data.access_token)
        console.log('Token stored:', data.access_token)
      } else if (data.accessToken) {
        localStorage.setItem('authToken', data.accessToken)
        console.log('Token stored:', data.accessToken)
      } else if (data.token) {
        localStorage.setItem('authToken', data.token)
        console.log('Token stored:', data.token)
      } else {
        console.log('No token found in response. Available properties:', Object.keys(data))
      }
 
      // Redirect to dashboard after successful login
      router.push("/dashboard")
    } catch (error) {
      console.error("Login failed:", error)
      setError(error instanceof Error ? error.message : 'Error al iniciar sesión')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-blue-50 flex">
      {/* Left side - Branding */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-8xl font-bold text-gray-800">
            easyem<span className="text-orange-500">AI</span>l
          </h1>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-orange-500 mb-8">Inicio de Sesión</h1>
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

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Iniciando..." : "Iniciar Sesión"}
            </button>
          </form>

          {/* Register Link */}
          <div className="text-center">
            <span className="text-gray-600">¿Primera vez por acá? </span>
            <Link href="/register" className="text-orange-500 hover:text-orange-600 font-medium">
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}