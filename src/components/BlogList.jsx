import React from 'react'
import PropTypes from 'prop-types'
import BlogListItem from './BlogListItem'

const BlogList = ({ blogs }) => {
  if (!blogs) {
    return null
  }

  return (
    <div>
      {blogs.map(
        blog =>
          <BlogListItem
            key={blog.id}
            blog={blog}
          />
      )}
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
}

export default BlogList
