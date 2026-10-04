import Link from "next/link"
import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { likeBlog } from "../../actions/blogs"
import { getCurrentUser } from "../../services/session"
import { addToReadingListAction } from "../../actions/readinglist"
import { isBlogInReadingList } from "../../services/readinglist"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  const currentUser = await getCurrentUser()
  
  const isNotCreator = currentUser && blog.userId !== currentUser.id
  const isAlreadyAdded = currentUser 
    ? await isBlogInReadingList(currentUser.id, blog.id) 
    : false

  const showReadingListButton = isNotCreator && !isAlreadyAdded

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white border border-gray-100 rounded-sm p-8 shadow-sm max-w-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{blog.title}</h2>
        
        <p className="text-sm text-gray-700 mb-6">
          by {blog.author}
        </p>

        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm text-gray-900">
            likes: {blog.likes}
          </span>
          
          <form action={likeBlog}>
            <input type="hidden" name="id" value={blog.id} />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition"
            >
              like
            </button>
          </form>

          {showReadingListButton && (
            <form action={addToReadingListAction}>
              <input type="hidden" name="blogId" value={blog.id} />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition"
              >
                add to reading list
              </button>
            </form>
          )}

          {currentUser && isAlreadyAdded && (
            <span className="text-sm text-gray-500 italic font-medium px-1">
              In reading list
            </span>
          )}
        </div>

        <div className="block text-sm text-blue-600 hover:underline break-all">
          <Link href={blog.url}>
            {blog.url}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogPage