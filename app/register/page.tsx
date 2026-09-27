"use client"

import { useActionState } from "react"
import Link from "next/link"
import { registerUser, RegisterActionState } from "../actions/users"

export default function RegisterPage() {
  // 1. Set up the exact initial state structure matching your ActionState type
  const initialState: RegisterActionState = {
    errors: {},
    values: { username: "", name: "" }
  }
  
  // 2. Wrap your action with the useActionState hook
  const [state, formAction] = useActionState(registerUser, initialState)

  return (
    <div>
      <h2>Register</h2>
      {/* 3. Point the form action to the hook's formAction function */}
      <form action={formAction}>
        <div>
          <label>
            Username
            <input 
              type="text" 
              name="username" 
              required 
              defaultValue={state.values?.username}
            />
          </label>
          {/* 4. Display the unique error message for username if it exists */}
          {state.errors?.username && <p style={{ color: "red" }}>{state.errors.username}</p>}
        </div>

        <div>
          <label>
            Name
            <input 
              type="text" 
              name="name" 
              required 
              defaultValue={state.values?.name}
            />
          </label>
          {state.errors?.name && <p style={{ color: "red" }}>{state.errors.name}</p>}
        </div>

        <div>
          <label>
            Password
            <input 
              type="password" 
              name="password" 
              required 
            />
          </label>
          {state.errors?.password && <p style={{ color: "red" }}>{state.errors.password}</p>}
        </div>

        {/* 5. Added the required confirmation field check */}
        <div>
          <label>
            Confirm Password
            <input 
              type="password" 
              name="passwordConfirm" 
              required 
            />
          </label>
          {state.errors?.passwordConfirm && <p style={{ color: "red" }}>{state.errors.passwordConfirm}</p>}
        </div>

        <button type="submit">Register</button>
      </form>

      <p style={{ marginTop: "1rem" }}>
        Already have an account? <Link href="/login">Login here</Link>
      </p>
    </div>
  )
}