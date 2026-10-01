"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { db } from "../../db"
import { users } from "../../db/schema"

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

export const registerUser = async (prevState: RegisterActionState, formData: FormData): Promise<RegisterActionState> => {
  const username = (formData.get("username") as string)?.trim() || ""
  const name = (formData.get("name") as string)?.trim() || ""
  const password = (formData.get("password") as string) || ""
  const passwordConfirm = (formData.get("passwordConfirm") as string) || ""

  const errors: NonNullable<RegisterActionState["errors"]> = {}

  if (username.length < 4) {
    errors.username = "Username must be at least 4 characters long"
  }

  if (password.length < 4) {
    errors.password = "Password must be at least 4 characters long"
  }

  if (password !== passwordConfirm) {
    errors.passwordConfirm = "Passwords do not match"
  }

  if (!errors.username) {
    const existingUsers = await db
      .select()
      .from(users)
      .where(eq(users.username, username))

    if (existingUsers.length > 0) {
      errors.username = "Username is already taken"
    }
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: { username, name }
    }
  }

  const passwordHash = await bcrypt.hash(password, 10)
  await db.insert(users).values({ username, name, passwordHash })

  redirect("/login")
}