"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, likeBlogById } from "../services/blogs" // Ensure likeBlogById is imported
import { auth } from "@/auth";

export type ActionState = {
  errors?: {
    title?: string;
    author?: string;
    url?: string;
  };
  values?: {
    title: string;
    author: string;
    url: string;
  };
  success?: boolean;
}

// 1. Your createBlog action (keeps your validation logic)
export const createBlog = async (prevState: ActionState, formData: FormData) => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const title = (formData.get("title") as string) || ""
  const author = (formData.get("author") as string) || ""
  const url = (formData.get("url") as string) || ""

  const errors: NonNullable<ActionState["errors"]> = {}

  if (title.trim().length < 5) {
    errors.title = "Title must be at least 5 characters long"
  }
  if (author.trim().length < 5) {
    errors.author = "Author must be at least 5 characters long"
  }
  if (url.trim().length < 5) {
    errors.url = "URL must be at least 5 characters long"
  }

  if (Object.keys(errors).length > 0) {
    return { 
      errors, 
      values: { title, author, url },
      success: false
    }
  }

  await addBlog(title.trim(), author.trim(), url.trim())
  
  revalidatePath("/blogs")
  return { error: "", success: true }
}

// 2. Add the missing likeBlog action back here
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