import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { format } from 'date-fns'
import { useStoreActions, useStoreState } from 'easy-peasy'

const EditPost = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const editPost = useStoreActions(actions => actions.editPost)
  const editTitle = useStoreState(state => state.editTitle)
  const editBody = useStoreState(state => state.editBody)

  const setEditTitle = useStoreActions(actions => actions.setEditTitle)
  const setEditBody = useStoreActions(actions => actions.setEditBody)

  const getPostById = useStoreState(state => state.getPostById)
  const post = getPostById(id)


  useEffect(() => {
    if (post) {
      setEditTitle(post.title)
      setEditBody(post.body)
    }
  }, [post, setEditTitle, setEditBody])


  const handleEdit = (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const updatedPost = { id, title: editTitle, datetime, body: editBody }
    editPost(updatedPost)
    navigate(`/post/${id}`)
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
            <button type="button" onClick={() => handleEdit(post.id)}>Submit</button>
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
