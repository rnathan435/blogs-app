import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const tokenValue = authHeader.substring(7)

  const userRecord = await db.query.users.findFirst({
    where: eq(users.token, tokenValue),
    with: {
      blogs: true,
    },
  })

  if (!userRecord) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }

  return NextResponse.json({
    id: userRecord.id,
    username: userRecord.username,
    name: userRecord.name,
    createdBlogs: userRecord.blogs.map((blog) => ({
      author: blog.author,
      title: blog.title,
      url: blog.url,
    })),
  })
}
