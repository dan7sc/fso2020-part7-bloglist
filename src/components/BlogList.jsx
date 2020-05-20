import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const BlogList = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        <Link to={`/blogs/${blog.id}`}>
          <span>{blog.title} {blog.author}</span>
        </Link>
      </div>
    </div>
  )
}

BlogList.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default BlogList
