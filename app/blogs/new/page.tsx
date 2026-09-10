"use client"

import { useActionState } from "react"
import { createBlog } from "../../actions/blogs"

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, { error: "" })

  return (
    <div>
      <h2>Create a new blog</h2>
      {/* Update the form action to use the hook's returned formAction */}
      <form action={formAction}>
        <div>
          <label>
            Title
            <input type="text" name="title" required minLength={5} />
          </label>
        </div>
        <div>
          <label>
            Author
            <input type="text" name="author" required minLength={5} />
          </label>
        </div>
        <div>
          <label>
            Url
            <input type="url" name="url" required minLength={5} />
          </label>
        </div>
        <button type="submit">Create</button>

        {/* Display the server-side validation error if it exists */}
        {state?.error && <p style={{ color: "red" }}>{state.error}</p>}
      </form>
    </div>
  )
}

export default NewBlog