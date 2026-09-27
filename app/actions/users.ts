"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm" // Import eq to handle your database query lookup
import { db } from "../../db"
import { users } from "../../db/schema"

// 1. Define the ActionState type for useActionState
export type RegisterActionState = {
  errors?: {
    username?: string;
    name?: string;
    password?: string;
    passwordConfirm?: string;
  };
  values?: {
    username: string;
    name: string;
  };
}

// 2. Accept prevState as the first argument
export const registerUser = async (prevState: RegisterActionState, formData: FormData): Promise<RegisterActionState> => {
  const username = (formData.get("username") as string)?.trim() || ""
  const name = (formData.get("name") as string)?.trim() || ""
  const password = (formData.get("password") as string) || ""
  const passwordConfirm = (formData.get("passwordConfirm") as string) || ""

  const errors: NonNullable<RegisterActionState["errors"]> = {}

  // 3. Username length check
  if (username.length < 4) {
    errors.username = "Username must be at least 4 characters long"
  }

  // 4. Password length check
  if (password.length < 4) {
    errors.password = "Password must be at least 4 characters long"
  }

  // 5. Password confirmation check
  if (password !== passwordConfirm) {
    errors.passwordConfirm = "Passwords do not match"
  }

  // 6. PostgreSQL-safe database lookup for existing username
  if (!errors.username) {
    const existingUsers = await db
      .select()
      .from(users)
      .where(eq(users.username, username))

    // Checking array length for PostgreSQL
    if (existingUsers.length > 0) {
      errors.username = "Username is already taken"
    }
  }

  // 7. If there are any validation errors, abort and return them
  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: { username, name }
    }
  }

  // 8. Hash password and insert user safely if all rules pass
  const passwordHash = await bcrypt.hash(password, 10)
  await db.insert(users).values({ username, name, passwordHash })

  redirect("/login")
}