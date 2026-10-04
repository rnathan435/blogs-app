"use server"

import { revalidatePath } from "next/cache"
import { getCurrentUser } from "../services/session"
import { addToReadingList } from "../services/readinglist"

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