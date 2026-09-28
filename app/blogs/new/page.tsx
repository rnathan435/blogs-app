"use client"

import { useActionState, useEffect } from "react"
import { createBlog, ActionState } from "../../actions/blogs"
import { useRouter } from "next/navigation"
import { useNotification } from "../../components/NotificationContext"

const NewBlog = () => {
  const initialState: ActionState = { errors: {}, values: { title: "", author: "", url: "" } }
  const [state, formAction] = useActionState(createBlog, initialState)
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      // ✨ Fixed: Updated message and path to reference blogs instead of notes
      showNotification("blog created")
      router.push("/blogs")
    }
  }, [state, showNotification, router])

  return (
    // Card Container Layout
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create a new blog</h2>
      
      <form action={formAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input 
            type="text" 
            name="title" 
            required 
            minLength={5} 
            defaultValue={state.values?.title} 
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          {state.errors?.title && (
            <p className="text-red-500 text-xs mt-1">{state.errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Author
          </label>
          <input 
            type="text" 
            name="author" 
            required 
            minLength={5} 
            defaultValue={state.values?.author} 
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          {state.errors?.author && (
            <p className="text-red-500 text-xs mt-1">{state.errors.author}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Url
          </label>
          <input 
            type="url" 
            name="url" 
            required 
            minLength={5} 
            defaultValue={state.values?.url} 
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          {state.errors?.url && (
            <p className="text-red-500 text-xs mt-1">{state.errors.url}</p>
          )}
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md text-sm transition"
        >
          Create
        </button>
      </form>
    </div>
  )
}

export default NewBlog