import { Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './components/Home'
import NewPost from './components/NewPost'
import PostPage from './components/PostPage'
import About from './components/About'
import Missing from './components/Missing'
import EditPost from "./components/EditPost"
import useAxiosFetch from './hooks/useAxiosFetch'
import { useEffect } from 'react'
import { useStoreActions } from 'easy-peasy'

function App() {
  const setPosts = useStoreActions((actions) => actions.setPosts)
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts')

  useEffect(() => {
    setPosts(data)
  }, [data, setPosts])

    return (
    <div className="App">
      <Header title="React JS Blog" />

        <Nav />

        <Switch>
          <Route exact path="/">
            <Home fetchError={fetchError} isLoading={isLoading} />
          </Route>
          <Route exact path="/post" component={NewPost} />
          <Route path="/edit/:id" component={EditPost} />
          <Route path="/post/:id" component={PostPage} />
          <Route path="/about" component={About} />
          <Route path="/*" component={Missing} />
        </Switch>

      <Footer />
    </div>
  );
}

export default App;
