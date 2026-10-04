import { db } from "../../db"
import { readingList } from "../../db/schema"
import { and, eq } from "drizzle-orm"

export const addToReadingList = async (userId: number, blogId: number) => {
  await db.insert(readingList).values({ 
    userId, 
    blogId, 
    read: false 
  })
}

export const getReadingListByUserId = async (userId: number) => {
  return await db.query.readingList.findMany({
    where: eq(readingList.userId, userId),
    with: {
      blog: true,
    },
  })
}

export const isBlogInReadingList = async (userId: number, blogId: number) => {
  const existing = await db
    .select()
    .from(readingList)
    .where(
      and(
        eq(readingList.userId, userId),
        eq(readingList.blogId, blogId)
      )
    )
    .limit(1)

  return existing.length > 0
}