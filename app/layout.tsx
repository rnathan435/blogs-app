import Link from "next/link"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">Home</Link>
          {" | "}
          <Link href="/blogs">Blogs</Link>
          {" | "}
          <Link href="/users">Users</Link>
          {" | "}
          <Link href="/blogs/new">New Blog</Link>
        </nav>
        {children}
      </body>
    </html>
  )
}