import { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useHistory } from "react-router-dom"
import { format } from 'date-fns'
import api from './api/posts'
import DataContext from './context/DataContext'

const EditPost = () => {
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')

  const { posts, setPosts } = useContext(DataContext)
  const { id } = useParams()
  const post = posts.find(post => (post.id).toString() === id)

  const history = useHistory()

  useEffect(() => {
    if (post) {
      setEditTitle(post.title)
      setEditBody(post.body)
    }
  }, [post, setEditTitle, setEditBody])

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const updatedPost = { id, title: editTitle, datetime, body: editBody }

    try {
      const response = await api.put(`/posts/${id}`, updatedPost)
      setPosts(posts.map(post => post.id === id ? { ...response.data } : post))
      setEditTitle('')
      setEditBody('')
      history.push('/')
    } catch (err) {
      console.log(`Error: ${err.message}`)
    }
  }

  return (
    <main className="NewPost">
      { editTitle &&
        <>
          <h2>Edit Post</h2>
          <form onSubmit={(e) => e.preventDefault()} className="newPostForm">
            <label htmlFor="postTitle">Title:</label>
            <input
              id="postTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="postBody">Post:</label>
            <textarea
              id="postBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button onClick={() => handleEdit(post.id)}>Submit</button>
          </form>
        </>
      }
      { !editTitle &&
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's adisappointing.</p>
            <p><Link to='/'>Back to Home</Link></p>
          </>
      }
    </main>
  )
}

export default EditPost
