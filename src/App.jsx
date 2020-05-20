import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, deleteBlog, updateBlog } from './reducers/blogReducer'
import { login, logout, setUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blog)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(setUser())
  }, [dispatch])

  const handleUsernameInput = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordInput = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const credentials = { username, password }
      await dispatch(login(credentials))
    } catch(e) {
      dispatch(setNotification(
        ['error', 'wrong username or password']
      ))
    }

    setUsername('')
    setPassword('')
  }

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

  const removeBlog = async (blog) => {
    try {
      if (blog.user.username === user.username) {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
          dispatch(deleteBlog(blog.id))
        }
      } else {
        window.confirm('Not authorized')
      }
    } catch(e) {
      window.confirm('Fail to delete blog')
    }
  }

  const addLike = async (oldObject) => {
    const newObject = { ...oldObject }
    newObject.likes += 1

    try {
      dispatch(updateBlog(newObject.id, newObject))
    } catch(e)  {
      dispatch(setNotification(
        ['error', 'fail to add like']
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
        <LoginForm
          username={username}
          password={password}
          handleUsernameInput={handleUsernameInput}
          handlePasswordInput={handlePasswordInput}
          handleSubmit={handleLogin}
        />
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

    if (!user) return null
    return (
      <div>
        <h2>blogs</h2>
        {hasMessageToShow ? showNotification() : ''}
        <p>{user.name} logged in </p>
        <button onClick={handleLogout}>logout</button>
        <br /><br />
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
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              handleAddLike={() => addLike(blog)}
              handleRemoveBlog={removeBlog}
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

  const match = useRouteMatch('/users/:id')
  const matchedUser = match
    ? users.find(user => user.id === match.params.id)
    : null

  return (
    <div>
      <Switch>
        <Route path='/users/:id'>
          {
            user && matchedUser
              ? userDetails(matchedUser)
              : loginForm()
          }
        </Route>
        <Route path='/users'>
          {
            user
              ? userList()
              : loginForm()
          }
        </Route>
        <Route path='/'>
          {
            user
              ? blogList()
              : loginForm()
          }
        </Route>
      </Switch>
    </div>
  )
}

export default App
