"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog } from "../services/blogs"
import { auth } from "@/auth";

// 1. Update the type to hold field errors and values
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
}

export const createBlog = async (prevState: ActionState, formData: FormData) => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }

  const title = (formData.get("title") as string) || ""
  const author = (formData.get("author") as string) || ""
  const url = (formData.get("url") as string) || ""

  // 2. Collect errors into an object
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

  // 3. If there are errors, return them along with the original values
  if (Object.keys(errors).length > 0) {
    return { 
      errors, 
      values: { title, author, url } 
    }
  }

  await addBlog(title.trim(), author.trim(), url.trim())
  
  revalidatePath("/blogs")
  redirect("/blogs")
}