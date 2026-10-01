import Link from "next/link"
import { getUsers } from "../services/users"

const Users = async () => {
  const users = await getUsers()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      
      <ul className="space-y-3">
        {users.map((user) => (
          <li 
            key={user.id} 
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white flex items-center justify-between gap-2"
          >
            <div>
              <Link
                href={`/users/${user.username}`}
                className="text-blue-600 hover:underline font-semibold block"
              >
                {user.name}
              </Link>
              <span className="text-sm text-gray-500">
                @{user.username}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users