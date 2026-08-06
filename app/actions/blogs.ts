"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, likeBlogById } from "../services/blogs"

export const createBlog = async (formData: FormData) => {
  const title = (formData.get("title") as string).trim()
  const author = (formData.get("author") as string).trim()
  const url = (formData.get("url") as string).trim()

  await addBlog(title, author, url) // likes defaults to 0 in your service
  
  revalidatePath("/blogs")
  redirect("/blogs")
}

export const likeBlog = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  if (!Number.isFinite(id)) {
    return
  }

  const updated = await likeBlogById(id)
  if (!updated) {
    return
  }

  revalidatePath("/blogs")
  revalidatePath(`/blogs/${id}`)
}