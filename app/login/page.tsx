"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { useNotification } from "../components/NotificationContext"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const { showNotification } = useNotification()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid username or password")
    } else {
      showNotification("Logged in successfully")
      router.push("/")
      router.refresh()
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
      
      {error && <p data-testid="error-message" className="text-red-500 text-xs mb-4">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input 
            id="username"
            type="text" 
            name="username" 
            required 
            className="w-full px-3 py-2 border border-zinc-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input 
            id="password"
            type="password" 
            name="password" 
            required 
            className="w-full px-3 py-2 border border-zinc-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
        
        <button 
          type="submit"
          data-testid="login-button"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md text-sm transition mt-2"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        Don't have an account? <Link href="/register" className="text-blue-600 hover:underline">Register here</Link>
      </p>
    </div>
  )
}