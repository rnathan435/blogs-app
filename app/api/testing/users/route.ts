import { NextResponse } from "next/server"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    )
  }

  try {
    const body = await request.json()
    const username = (body.username as string)?.trim() || ""
    const name = (body.name as string)?.trim() || ""
    const password = (body.password as string) || ""

    const errors: Record<string, string> = {}

    if (username.length < 4) {
      errors.username = "Username must be at least 4 characters long"
    }
    if (password.length < 4) {
      errors.password = "Password must be at least 4 characters long"
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
      return NextResponse.json({ errors }, { status: 400 })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    
    await db.insert(users).values({ 
      username, 
      name, 
      passwordHash 
    })

    return NextResponse.json(
      { message: "User created successfully" }, 
      { status: 201 }
    )

  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
