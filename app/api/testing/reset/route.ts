import { NextResponse } from "next/server"
import { db } from "@/db"
import { users, blogs, readingList } from "@/db/schema"

export async function DELETE() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    )
  }

  try {
    await db.delete(readingList)
    await db.delete(blogs)
    await db.delete(users)

    return NextResponse.json({ message: "Database reset successful" }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
