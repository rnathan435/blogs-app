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
  await db.insert(blogs).values({ title, author, url, likes })
}

export const getBlogById = async (id: number) => {
  return await db.query.blogs.findFirst({ where: eq(blogs.id, id), })
}

export const likeBlogById = async (id: number) => {
  await db.update(blogs).set({ likes: sql`${blogs.likes} + 1` }).where(eq(blogs.id, id))
}

export const getBlogsByLikesDesc = async () => {
  return await db.query.blogs.findMany({ orderBy: desc(blogs.likes) })
}