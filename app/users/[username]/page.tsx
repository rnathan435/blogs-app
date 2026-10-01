import Link from "next/link"
import { notFound } from "next/navigation"
import { getUserByUsername } from "../../services/users"

const UserPage = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params
  
  const user = await getUserByUsername(username)

  if (!user) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="border rounded-lg p-6 shadow-sm bg-white mb-6">
        <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
        <p className="text-gray-500 text-sm mt-1">@{user.username}</p>
      </div>
      
      <h3 className="text-xl font-bold mb-4 text-gray-800">Blogs</h3>
      
      <ul className="space-y-3">
        {user.blogs.length === 0 ? (
          <p className="text-gray-500 text-sm italic">This user hasn't posted any blogs yet.</p>
        ) : (
          user.blogs.map((blog) => (
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
              </div>
              
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

export default UserPage