import { db } from "../../db"
import { readingList } from "../../db/schema"
import { eq } from "drizzle-orm"

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