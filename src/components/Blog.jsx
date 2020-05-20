import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({
  blog,
  user,
  handleAddLike,
  handleRemoveBlog
}) => {
  const buttonRemoveStyle = {
    background: 'lightBlue',
    border: '1px solid lightBlue'
  }

  const showRemoveButton = () => {
    return (
      <button
        id='delete-blog-button'
        style={buttonRemoveStyle}
        onClick={() => handleRemoveBlog(blog)}>
        remove
      </button>
    )
  }

  return (
    <div>
      <div className='displayed-items' >
        <h1>{blog.title} {blog.author}</h1>
        <a href={blog.url}>{blog.url}</a>
        <div>
          <span>{blog.likes} likes</span>
          <button className='like-button' onClick={handleAddLike}>like</button>
        </div>
        <div>added by {blog.user ? blog.user.name : 'unknown'}</div>
        {
          blog.user && blog.user.username === user.username
            ? showRemoveButton()
            : <div></div>
        }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleAddLike: PropTypes.func.isRequired,
  handleRemoveBlog: PropTypes.func.isRequired
}

export default Blog
