import React from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { deleteBlog, updateBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogDetails = ({ blog, user }) => {
  const dispatch = useDispatch()

  const buttonRemoveStyle = {
    background: 'lightBlue',
    border: '1px solid lightBlue'
  }

  const removeBlog = async () => {
    let message = ''

    try {
      if (blog.user.username === user.username) {
        message = `Remove blog ${blog.title} by ${blog.author}`
        if (window.confirm(message)) {
          dispatch(
            deleteBlog(blog.id)
          )
        }
      } else {
        message = 'Not authorized'
        window.confirm(message)
      }
    } catch(e) {
      message = 'Fail to delete blog'
      window.confirm(message)
    }
  }

  const addLike = async () => {
    const newObject = { ...blog }
    newObject.likes += 1

    try {
      dispatch(
        updateBlog(newObject.id, newObject)
      )
    } catch(e)  {
      dispatch(
        setNotification(
          ['error', 'fail to add like']
        )
      )
    }
  }

  const showRemoveButton = () => {
    if (blog.user.username === user.username) {
      return (
        <button
          id='delete-blog-button'
          style={buttonRemoveStyle}
          onClick={removeBlog}>
          remove
        </button>
      )
    }

    return null
  }

  return (
    <div>
      <div className='displayed-items' >
        <h1>{blog.title} {blog.author}</h1>
        <a href={blog.url}>{blog.url}</a>
        <div>
          <span>{blog.likes} likes</span>
          <button className='like-button' onClick={addLike}>like</button>
        </div>
        <div>added by {blog.user.name}</div>
        {showRemoveButton()}
      </div>
    </div>
  )
}

BlogDetails.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default BlogDetails
