import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { setNotification } from '../reducers/notificationReducer'
import { initializeBlogs, createComment } from '../reducers/blogReducer'

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch()
  const [content, setContent] = useState('')

  const handleInput = (event, setFunction) => {
    setFunction(event.target.value)
  }

  const addComment = async (event) => {
    event.preventDefault()

    try {
      dispatch(
        createComment(blog.id, content)
      )
      setContent('')
      dispatch(
        initializeBlogs()
      )
    } catch(e)  {
      dispatch(
        setNotification([
          'error',
          'fail to add a new comment'
        ])
      )
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <form onSubmit={addComment}>
        <span>
          <input
            id='comment'
            type='text'
            value={content}
            name='Comment'
            onChange={(event) => handleInput(event, setContent)}
          />
        </span>
        <span>
          <button id='create-button' type='submit'>add comment</button>
        </span>
      </form>
    </div>
  )
}

CommentForm.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default CommentForm
