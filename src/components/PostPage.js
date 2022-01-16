import { useStoreState, useStoreActions } from 'easy-peasy'
import { useParams, Link } from 'react-router-dom'
import { useHistory } from "react-router-dom"

const PostPage = () => {
  const { id } = useParams()
  const history = useHistory()
  const deletePost = useStoreActions(actions => actions.deletePost)
  const getPostById = useStoreState(state => state.getPostById)
  const post = getPostById(id)

  const handleDelete = (id) => {
    deletePost(id)
    history.push('/')
  }

  return (
    <main className='PostPage'>
      <article className="post">
        { post &&
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/edit/${post.id}`}><button className='editButton'>Edit Post</button></Link>
            <button
              className='deleteButton'
              onClick={() => handleDelete(post.id)}
            >
              Delete Post
            </button>
          </>
        }

        { !post &&
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's dissappointing.</p>
            <p>
              <Link to="/">Back to Home</Link>
            </p>
          </>
        }
      </article>
    </main>
  )
}

export default PostPage
