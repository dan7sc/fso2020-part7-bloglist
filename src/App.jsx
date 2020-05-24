import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom'
import UserList from './components/UserList'
import User from './components/User'
import BlogDetails from './components/BlogDetails'
import CommentList from './components/CommentList'
import CommentForm from './components/CommentForm'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Menu from './components/Menu'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const loggedUser = useSelector(state => state.loggedUser)
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    dispatch(setUser())
  }, [dispatch])

  const showNotification = () => {
    const [messageType, message] = notification
    return <Notification type={messageType} message={message} />
  }

  const headerInfo = () => {
    const hasMessageToShow = notification[0] && notification[1]

    return (
      <div>
        <h2>blog app</h2>
        {hasMessageToShow ? showNotification() : ''}
        <br />
      </div>
    )
  }

  const blogDetails = (blog) => {
    return (
      <div>
        <BlogDetails
          user={loggedUser}
          blog={blog}
        />
        <h2>Comments</h2>
        <CommentForm blog={blog} />
        <CommentList comments={blog.comments} />
      </div>
    )
  }

  const userId = useRouteMatch('/users/:id')
  const matchedUser = userId
    ? users.find(user => user.id === userId.params.id)
    : null

  const blogId = useRouteMatch('/blogs/:id')
  const matchedBlog = blogId
    ? blogs.find(blog => blog.id === blogId.params.id)
    : null

  if (!loggedUser) {
    const hasMessageToShow = notification[0] && notification[1]

    return (
      <div>
        <h2>log in to application</h2>
        {hasMessageToShow ? showNotification() : ''}
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <Menu
        user={loggedUser}
      />
      {headerInfo()}
      <Switch>
        <Route path='/blogs/:id'>
          {matchedBlog
            ? blogDetails(matchedBlog)
            : <Redirect to='/'/>
          }
        </Route>
        <Route path='/users/:id'>
          <User user={matchedUser} />
        </Route>
        <Route path='/users'>
          <UserList users={users} />
        </Route>
        <Route path='/'>
          <BlogForm />
          <BlogList blogs={blogs}/>
        </Route>
      </Switch>
    </div>
  )
}

export default App
