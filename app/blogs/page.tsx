import Link from "next/link"
import { getBlogs, getBlogsByLikesDesc } from "../services/blogs"

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ popular?: string; filter?: string }>
}) => {
  const { popular, filter } = await searchParams
  const showPopular = popular === "true"
  const searchTerm = filter ?? ""

  const blogs = (showPopular ? getBlogsByLikesDesc() : getBlogs()).filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h2>Blogs</h2>
      <div>
        <Link href={showPopular ? "/blogs" : "/blogs?popular=true"}>
          {showPopular ? "show by id ascending" : "show most liked descending"}
        </Link>
      </div>

      <form action="/blogs" method="get">
        <input
          type="text"
          name="filter"
          defaultValue={searchTerm}
          placeholder="Search by title"
        />
        {showPopular ? <input type="hidden" name="popular" value="true" /> : null}
        <button type="submit">Search</button>
      </form>

      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author} - {blog.url} ({blog.likes} likes)
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs