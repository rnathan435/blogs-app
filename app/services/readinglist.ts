import { db } from "../../db"
import { readingList } from "../../db/schema"

export const addToReadingList = async (userId: number, blogId: number) => {
  await db.insert(readingList).values({ 
    userId, 
    blogId, 
    read: false 
  })
}