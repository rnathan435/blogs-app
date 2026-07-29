const blogs = [
  {
    id: 1,
    title: "next.js utilizes React Server Components",
    author: "Author 1",
    url: "https://nextjs.org",
    likes: 7,
  },
  {
    id: 2,
    title: "next.js is built on top of React",
    author: "Author 2",
    url: "https://react.dev",
    likes: 12,
  },
  {
    id: 3,
    title: "next.js supports both static and dynamic rendering",
    author: "Author 2",
    url: "https://nextjs.org/docs",
    likes: 5,
  },
]

let nextId = 4

export const getBlogs = () => {
  return blogs
}

export const addBlog = (
  title: string,
  author: string,
  url: string,
  likes: number = 0
) => {
  blogs.push({ id: nextId++, title, author, url, likes })
}

export const getBlogById = (id: number) => {
  return blogs.find((blog) => blog.id === id)
}

export const likeBlogById = (id: number) => {
  const blog = blogs.find((b) => b.id === id)
  if (!blog) {
    return false
  }

  blog.likes += 1
  return true
}

export const getBlogsByLikesDesc = () => {
  return [...blogs].sort((a, b) => b.likes - a.likes)
}