import Link from "next/link"
import { getBlogs } from "../services/blogs"

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ popular?: string; filter?: string }>
}) => {
  const { popular, filter } = await searchParams
  const showPopular = popular === "true"
  const searchTerm = filter ?? ""
  const allBlogs = await getBlogs(showPopular)
  const blogs = allBlogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>
      
      {/* 1. Styled Sort Toggle link */}
      <div className="mb-4">
        <Link 
          href={showPopular ? "/blogs" : "/blogs?popular=true"}
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          {showPopular ? "← show by id ascending" : "⚡ show most liked descending"}
        </Link>
      </div>

      {/* 2. Styled Clean Search Form using Flex layout */}
      <form action="/blogs" method="get" className="flex gap-2 mb-6">
        <input
          type="text"
          name="filter"
          defaultValue={searchTerm}
          placeholder="Search by title..."
          className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        {showPopular && <input type="hidden" name="popular" value="true" />}
        <button 
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
        >
          Search
        </button>
      </form>

      {/* 3. Styled Layout Cards for Blogs */}
      <ul className="space-y-3">
        {blogs.length === 0 ? (
          <p className="text-gray-500 text-sm italic">No blogs match your filter criteria.</p>
        ) : (
          blogs.map((blog) => (
            <li 
              key={blog.id} 
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
            >
              <div>
                <Link
                  href={`/blogs/${blog.id}`}
                  className="text-blue-600 hover:underline font-semibold block"
                >
                  {blog.title}
                </Link>
                <span className="text-sm text-gray-600">
                  by <span className="font-medium text-gray-800">{blog.author}</span>
                </span>
                <span className="text-xs text-gray-400 block mt-0.5 truncate max-w-md">
                  {blog.url}
                </span>
              </div>
              
              {/* Like Count Badge */}
              <div className="self-start sm:self-center bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                👍 {blog.likes} {blog.likes === 1 ? 'like' : 'likes'}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default Blogs
