"use server"

import { revalidatePath } from "next/cache"
import { getCurrentUser } from "../services/session"
import { addToReadingList } from "../services/readinglist"
import { db } from "@/db"
import { readingList } from "../../db/schema"
import { eq } from "drizzle-orm"

export const addToReadingListAction = async (formData: FormData) => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("You must be logged in to add to your reading list.")
  }
  const blogId = Number(formData.get("blogId"))
  if (!blogId) return
  await addToReadingList(user.id, blogId)
  revalidatePath(`/blogs/${blogId}`)
}

export const markAsReadAction = async (formData: FormData) => {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Unauthorized")
  }

  const itemId = Number(formData.get("itemId"))
  if (!itemId) return

  await db
    .update(readingList)
    .set({ read: true })
    .where(eq(readingList.id, itemId))

  revalidatePath("/me")
}