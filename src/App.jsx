import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    const localGetAll = async () => {
      const blogs = await blogService.getAll()
      await blogs.sort((blogA, blogB) => {
        return blogB.likes - blogA.likes
      })
      setBlogs(blogs)
    }
    localGetAll()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

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
      const user = await loginService.login(credentials)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
    } catch(e) {
      dispatch(setNotification(
        ['error', 'wrong username or password']
      ))
    }

    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setBlogFormVisible(false)
  }

  const addBlog = async (newObject) => {
    const { token } = JSON.parse(
      window.localStorage.getItem('loggedBlogappUser')
    )
    await blogService.setToken(token)

    try {
      const blog = await blogService.create(newObject)
      blog.user = user
      setBlogs(blogs.concat(blog))
      setBlogFormVisible(false)

      dispatch(setNotification(
        ['success', `a new blog ${blog.title} by ${blog.author} added`]
      ))
    } catch(e)  {
      dispatch(setNotification(
        ['error', 'fail to add a new blog']
      ))
    }
  }

  const removeBlog = async (blog) => {
    const { token } = JSON.parse(
      window.localStorage.getItem('loggedBlogappUser')
    )
    await blogService.setToken(token)

    try {
      if (blog.user.username === user.username) {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
          await blogService.deleteOne(blog.id)
          const newBlogs = blogs.filter(blogToFilter => {
            return blogToFilter.id !== blog.id
          })
          setBlogs(newBlogs)
        }
      } else {
        window.confirm('Not authorized')
      }
    } catch(e) {
      window.confirm('Fail to delete blog')
    }
  }

  const addLike = async (oldObject) => {
    const { token } = JSON.parse(
      window.localStorage.getItem('loggedBlogappUser')
    )
    await blogService.setToken(token)

    const newObject = { ...oldObject }
    newObject.likes += 1

    try {
      const updatedBlog = await blogService.update(newObject.id, newObject)
      const newBlogs = blogs.map(blog => {
        if (blog.url === updatedBlog.url) {
          blog.likes += 1
          return blog
        } else return blog
      })
      setBlogs(newBlogs)
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

  const blogList = () => {
    const hasMessageToShow = notification[0] && notification[1]
    return (
      <div>
        <h2>blogs</h2>
        {
          hasMessageToShow ? showNotification() : ''
        }
        <span>{user.name} logged in </span>
        <button onClick={handleLogout}>logout</button>
        <br /><br />
        {
          blogFormVisible
            ? blogForm()
            : toggleButton()
        }
        {
          blogs.map(
            blog =>
              <Blog
                key={blog.id}
                blog={blog}
                user={user}
                handleAddLike={() => addLike(blog)}
                handleRemoveBlog={removeBlog}
              />
          )
        }
      </div>
    )
  }

  return (
    <div>
      {user ? blogList() : loginForm()}
    </div>
  )
}

export default App
