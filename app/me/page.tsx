import { auth } from "@/auth"
import { notFound } from "next/navigation"
import { getUserByUsername } from "../services/users"
import { generateTokenAction } from "../actions/tokens"

export default async function MePage() {
  const session = await auth()

  if (!session || !session.user?.email) {
    notFound()
  }

  const user = await getUserByUsername(session.user.email)

  if (!user) {
    notFound()
  }

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