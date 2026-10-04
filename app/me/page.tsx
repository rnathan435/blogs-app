import { auth } from "@/auth"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getUserByUsername } from "../services/users"
import { generateTokenAction } from "../actions/tokens"
import { getReadingListByUserId } from "../services/readinglist"
import { markAsReadAction } from "../actions/readinglist"

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
  
  const unreadItems = listItems.filter(item => !item.read)
  const readItems = listItems.filter(item => item.read)

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
        
        <div className="mb-6">
          <h3 className="text-md font-bold mb-3 text-slate-800">
            Unread ({unreadItems.length})
          </h3>
          {unreadItems.length === 0 ? (
            <p className="text-gray-500 text-sm italic mb-4">No unread blogs.</p>
          ) : (
            <ul className="space-y-2">
              {unreadItems.map((item) => (
                <li 
                  key={item.id} 
                  className="bg-yellow-50 border border-yellow-100 rounded p-4 flex items-center justify-between gap-4"
                >
                  <Link 
                    href={`/blogs/${item.blog.id}`} 
                    className="text-blue-600 hover:underline font-medium text-sm block"
                  >
                    {item.blog.title}
                  </Link>
                  
                  <form action={markAsReadAction}>
                    <input type="hidden" name="itemId" value={item.id} />
                    <button
                      type="submit"
                      className="bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded text-xs font-medium transition whitespace-nowrap"
                    >
                      mark as read
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-6">
          <h3 className="text-md font-bold mb-3 text-slate-800">
            Read ({readItems.length})
          </h3>
          {readItems.length === 0 ? (
            <p className="text-gray-500 text-sm italic mb-4">No read blogs.</p>
          ) : (
            <ul className="space-y-2">
              {readItems.map((item) => (
                <li 
                  key={item.id} 
                  className="bg-emerald-50/50 border border-emerald-100 rounded p-4 flex items-center justify-between"
                >
                  <Link 
                    href={`/blogs/${item.blog.id}`} 
                    className="text-blue-600 hover:underline font-medium text-sm block"
                  >
                    {item.blog.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

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