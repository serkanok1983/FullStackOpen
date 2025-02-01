import { useState, useEffect } from 'react'
import './App.css'
import blogsService from './services/blogs'

function App() {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '', likes: 0 })

  useEffect(() => {
    blogsService.getAll().then(setBlogs)
  }, [])

  const addBlog = async (event) => {
    event.preventDefault()
    const savedBlog = await blogsService.create(newBlog)
    setBlogs([...blogs, savedBlog])
    setNewBlog({ title: '', author: '', url: '', likes: 0 })
  }

  return (
    <div>
      <h1>Blogs</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>{blog.title} by {blog.author}</li>
        ))}
      </ul>
      <h2>Add a new blog</h2>
      <form onSubmit={addBlog}>
        <input placeholder="Title" value={newBlog.title} onChange={e => setNewBlog({ ...newBlog, title: e.target.value })} />
        <input placeholder="Author" value={newBlog.author} onChange={e => setNewBlog({ ...newBlog, author: e.target.value })} />
        <input placeholder="URL" value={newBlog.url} onChange={e => setNewBlog({ ...newBlog, url: e.target.value })} />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default App
