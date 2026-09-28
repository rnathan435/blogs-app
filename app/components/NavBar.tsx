"use client"

import { useSession, signOut } from "next-auth/react"
import NavLink from "./NavLink"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex items-center gap-4">
      {/* 1. Use the new NavLink abstraction for primary routes */}
      <NavLink href="/">home</NavLink>
      <NavLink href="/blogs">blogs</NavLink>
      <NavLink href="/users">users</NavLink>
      
      {/* 2. Flex-container pushes profile/auth elements cleanly to the right side */}
      <div className="ml-auto flex items-center gap-4">
        {session ? (
          <>
            <NavLink href="/blogs/new">create new</NavLink>
            <em className="text-gray-300 text-sm italic">{session.user?.name} logged in</em>
            <button
              onClick={() => signOut()}
              className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm transition"
            >
              logout
            </button>
          </>
        ) : (
          <>
            <NavLink href="/login">login</NavLink>
            <NavLink href="/register">register</NavLink>
          </>
        )}
      </div>
    </nav>
  )
}
