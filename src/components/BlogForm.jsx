import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { initializeBlogs, createBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  const toggleVisibility = () => {
    setBlogFormVisible(!blogFormVisible)
  }

  const handleInput = (event, setFunction) => {
    setFunction(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()

    const newObject = {
      title,
      author,
      url
    }

    setTitle('')
    setAuthor('')
    setUrl('')
    setBlogFormVisible(false)

    try {
      await dispatch(
        createBlog(newObject)
      )
      dispatch(
        initializeBlogs()
      )

      dispatch(
        setNotification([
          'success',
          `a new blog ${newObject.title} by ${newObject.author} added`
        ])
      )
    } catch(e)  {
      dispatch(
        setNotification([
          'error',
          'fail to add a new blog'
        ])
      )
    }
  }

  if (blogFormVisible) {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
          <div>
            title:
            <input
              id='title'
              type='text'
              value={title}
              name='Title'
              onChange={(event) => handleInput(event, setTitle)}
            />
          </div>
          <div>
            author:
            <input
              id='author'
              type='text'
              value={author}
              name='Author'
              onChange={(event) => handleInput(event, setAuthor)}
            />
          </div>
          <div>
            url:
            <input
              id='url'
              type='text'
              value={url}
              name='Url'
              onChange={(event) => handleInput(event, setUrl)}
            />
          </div>
          <div>
            <button id='create-button' type='submit'>create</button>
          </div>
          <div>
            <button type='cancel' onClick={toggleVisibility}>cancel</button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <button onClick={toggleVisibility}>new blog</button>
  )
}

export default BlogForm
