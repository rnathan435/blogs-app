"use client"

import { useActionState } from "react"
import Link from "next/link"
import { registerUser, RegisterActionState } from "../actions/users"

export default function RegisterPage() {
  const initialState: RegisterActionState = {
    errors: {},
    values: { username: "", name: "" }
  }
  
  const [state, formAction] = useActionState(registerUser, initialState)

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Register</h2>
      
      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input 
            id="username"
            type="text" 
            name="username" 
            required 
            defaultValue={state.values?.username}
            className="w-full px-3 py-2 border border-zinc-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" 
          />
          {state.errors?.username && <p data-testid="username-error" className="text-red-500 text-xs mt-1">{state.errors.username}</p>}
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input 
            id="name"
            type="text" 
            name="name" 
            required 
            defaultValue={state.values?.name}
            className="w-full px-3 py-2 border border-zinc-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          {state.errors?.name && <p data-testid="name-error" className="text-red-500 text-xs mt-1">{state.errors.name}</p>}
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
          {state.errors?.password && <p data-testid="password-error" className="text-red-500 text-xs mt-1">{state.errors.password}</p>}
        </div>

        <div>
          <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input 
            id="passwordConfirm"
            type="password" 
            name="passwordConfirm" 
            required 
            className="w-full px-3 py-2 border border-zinc-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          {state.errors?.passwordConfirm && <p data-testid="passwordConfirm-error" className="text-red-500 text-xs mt-1">{state.errors.passwordConfirm}</p>}
        </div>

        <button 
          type="submit"
          data-testid="register-button"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md text-sm transition mt-2"
        >
          Register
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Login here</Link>
      </p>
    </div>
  )
}