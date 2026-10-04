import { auth } from "@/auth"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getUserByUsername } from "../services/users"
import { generateTokenAction } from "../actions/tokens"
import { getReadingListByUserId } from "../services/readinglist"

export default async function MePage() {
  const session = await auth()

  if (!session || !session.user?.email) {
    notFound()
  }

  const user = await getUserByUsername(session.user.email)

  if (!user) {
    notFound()
  }

  const listItems = await getReadingListByUserId(user.id)

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="border rounded-lg p-6 bg-white shadow-sm mt-4">
        <h1 className="text-2xl font-bold mb-6 text-slate-900">My Profile</h1>
        
        <div className="space-y-4 mb-6">
          <p className="text-sm font-medium text-slate-900">
            Name: <span className="font-normal text-slate-700 ml-1">{user.name}</span>
          </p>
          <p className="text-sm font-medium text-slate-900">
            Username: <span className="font-normal text-slate-700 ml-1">{user.username}</span>
          </p>
        </div>

        <hr className="border-slate-300 mb-6" />

        <h2 className="text-xl font-bold mb-4 text-slate-900">Reading List</h2>
        
        {listItems.length === 0 ? (
          <p className="text-gray-500 text-sm italic mb-6">Your reading list is empty.</p>
        ) : (
          <ul className="space-y-3 mb-6">
            {listItems.map((item) => (
              <li 
                key={item.id} 
                className="border rounded-lg p-4 shadow-sm bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
              >
                <div>
                  <Link 
                    href={`/blogs/${item.blog.id}`} 
                    className="text-blue-600 hover:underline font-semibold block"
                  >
                    {item.blog.title}
                  </Link>
                  <span className="text-sm text-gray-600">
                    by <span className="font-medium text-gray-800">{item.blog.author}</span>
                  </span>
                </div>
                
                {item.read && (
                  <span className="self-start sm:self-center bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                    ✓ Read
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}

        <hr className="border-slate-300 mb-6" />

        <h2 className="text-xl font-bold mb-4 text-slate-900">API Token</h2>
        
        <div className="bg-slate-50 p-4 rounded-md mb-4">
          <p className="text-xs text-slate-500 mb-2">Current token:</p>
          <div className="bg-white p-2 border border-slate-200 rounded font-mono text-sm text-slate-800 tracking-tight break-all select-all">
            {user.token || "No token generated yet."}
          </div>
        </div>

        <form action={generateTokenAction}>
          <button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition"
          >
            Generate New Token
          </button>
        </form>
      </div>
    </div>
  )
}