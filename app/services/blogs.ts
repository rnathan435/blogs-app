import { eq, desc, sql } from "drizzle-orm"
import { db } from "../../db"
import { blogs } from "../../db/schema"

export const getBlogs = async (popularOnly: boolean) => {
  if (popularOnly) {
    return await db.query.blogs.findMany({
      orderBy: desc(blogs.likes),
    })
  }
  return await db.query.blogs.findMany()
}

export const addBlog = async (title: string, author: string, url: string, likes = 0) => {
  const user = await db.query.users.findFirst({
    orderBy: sql`RANDOM()`,
  })
  if (!user) {
    throw new Error("No users found in the database to assign this note to.")
  }
  await db.insert(blogs).values({ title, author, url, likes, userId: user.id })
}

export const getBlogById = async (id: number) => {
  return await db.query.blogs.findFirst({ where: eq(blogs.id, id), })
}

export const likeBlogById = async (id: number) => {
  const blog = await db.query.blogs.findFirst({ where: eq(blogs.id, id) })
  if (!blog) return false
  await db.update(blogs).set({ likes: sql`${blogs.likes} + 1` }).where(eq(blogs.id, id))
  return true
}

export const getBlogsByLikesDesc = async () => {
  return await db.query.blogs.findMany({ orderBy: desc(blogs.likes) })
}