"use client"

import { useActionState } from "react"
import { createBlog, ActionState } from "../../actions/blogs"

const NewBlog = () => {
  // Define the initial state matching your new ActionState type
  const initialState: ActionState = { errors: {}, values: { title: "", author: "", url: "" } }
  const [state, formAction] = useActionState(createBlog, initialState)

  return (
    <div>
      <h2>Create a new blog</h2>
      <form action={formAction}>
        <div>
          <label>
            Title
            <input 
              type="text" 
              name="title" 
              required 
              minLength={5} 
              defaultValue={state.values?.title} 
            />
          </label>
          {state.errors?.title && <p style={{ color: "red" }}>{state.errors.title}</p>}
        </div>

        <div>
          <label>
            Author
            <input 
              type="text" 
              name="author" 
              required 
              minLength={5} 
              defaultValue={state.values?.author} 
            />
          </label>
          {state.errors?.author && <p style={{ color: "red" }}>{state.errors.author}</p>}
        </div>

        <div>
          <label>
            Url
            <input 
              type="url" 
              name="url" 
              required 
              minLength={5} 
              defaultValue={state.values?.url} 
            />
          </label>
          {state.errors?.url && <p style={{ color: "red" }}>{state.errors.url}</p>}
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlog