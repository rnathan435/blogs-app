"use server"

import { auth } from "@/auth"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function generateTokenAction() {
  const session = await auth()

  if (!session || !session.user?.email) {
    throw new Error("Unauthorized access")
  }

  const generatedToken = crypto.randomUUID()

  await db
    .update(users)
    .set({ token: generatedToken })
    .where(eq(users.username, session.user.email))

  revalidatePath("/me")
}
