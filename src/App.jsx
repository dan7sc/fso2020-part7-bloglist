import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import CommentList from './components/CommentList'
import CommentForm from './components/CommentForm'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Menu from './components/Menu'
import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, createComment } from './reducers/blogReducer'
import { logout, setUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const loggedUser = useSelector(state => state.loggedUser)
  const users = useSelector(state => state.users)

  const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    dispatch(setUser())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
    setBlogFormVisible(false)
  }

  const addBlog = async (newObject) => {
    try {
      await dispatch(createBlog(newObject))
      setBlogFormVisible(false)
      dispatch(initializeBlogs())

      dispatch(setNotification(
        ['success', `a new blog ${newObject.title} by ${newObject.author} added`]
      ))
    } catch(e)  {
      dispatch(setNotification(
        ['error', 'fail to add a new blog']
      ))
    }
  }

  const addComment = async (id, content) => {
    try {
      await dispatch(createComment(id, content))
      dispatch(initializeBlogs())
    } catch(e)  {
      dispatch(setNotification(
        ['error', 'fail to add a new comment']
      ))
    }
  }

  const showNotification = () => {
    const [messageType, message] = notification
    return <Notification type={messageType} message={message} />
  }

  const blogForm = () => {
    return (
      <div>
        <BlogForm createBlog={addBlog} />
        <button type='cancel' onClick={toggleVisibility}>cancel</button>
      </div>
    )
  }

  const loginForm = () => {
    const hasMessageToShow = notification[0] && notification[1]

    return (
      <div>
        <h2>log in to application</h2>
        {
          hasMessageToShow ? showNotification() : ''
        }
        <LoginForm />
      </div>
    )
  }

  const toggleButton = () => {
    return <button onClick={toggleVisibility}>new blog</button>
  }

  const toggleVisibility = () => {
    setBlogFormVisible(!blogFormVisible)
  }

  const headerInfo = () => {
    const hasMessageToShow = notification[0] && notification[1]

    if (!loggedUser) return null
    return (
      <div>
        <h2>blog app</h2>
        {hasMessageToShow ? showNotification() : ''}
        <br />
      </div>
    )
  }

  const blogList = () => {
    return (
      <div>
        {headerInfo()}
        {
          blogFormVisible
            ? blogForm()
            : toggleButton()
        }
        {blogs.map(
          blog =>
            <BlogList
              key={blog.id}
              blog={blog}
            />
        )}
      </div>
    )
  }

  const userList = () => {
    return (
      <div>
        {headerInfo()}
        <UserList users={users} />
      </div>
    )
  }

  const userDetails = (user) => {
    return (
      <div>
        {headerInfo()}
        <User user={user} />
      </div>
    )
  }

  const blogDetails = (blog) => {
    return (
      <div>
        {headerInfo()}
        <Blog
          user={loggedUser}
          blog={blog}
        />
        <h2>Comments</h2>
        <CommentForm
          id={blog.id}
          createComment={addComment}
        />
        <CommentList
          comments={blog.comments}
        />
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

  return (
    <div>
      <Menu
        user={loggedUser}
        handleLogout={() => handleLogout()}
      />
      <Switch>
        <Route path='/blogs/:id'>
          {
            loggedUser
              ? (matchedBlog
                ? blogDetails(matchedBlog)
                : <Redirect to='/'/>)
              : loginForm()
          }
        </Route>
        <Route path='/users/:id'>
          {
            loggedUser && matchedUser
              ? userDetails(matchedUser)
              : loginForm()
          }
        </Route>
        <Route path='/users'>
          {
            loggedUser
              ? userList()
              : loginForm()
          }
        </Route>
        <Route path='/'>
          {
            loggedUser
              ? blogList()
              : loginForm()
          }
        </Route>
      </Switch>
    </div>
  )
}

export default App
