import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import NewPost from './components/NewPost'
import PostPage from './components/PostPage'
import About from './components/About'
import Missing from './components/Missing'
import EditPost from "./components/EditPost"
import useAxiosFetch from './hooks/useAxiosFetch'
import { useEffect } from 'react'
import { useStoreActions } from 'easy-peasy'
import Layout from './components/Layout'

function App() {
  const setPosts = useStoreActions((actions) => actions.setPosts)
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts')

  useEffect(() => {
    setPosts(data)
  }, [data, setPosts])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home fetchError={fetchError} isLoading={isLoading} />} />

        <Route path="post">
          <Route index element={<NewPost />} />
          <Route path=":id" element={<PostPage />} />
        </Route>

        <Route path="edit/:id" element={<EditPost />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
