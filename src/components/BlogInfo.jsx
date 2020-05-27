import React from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import BlogDetails from './BlogDetails'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

const BlogInfo = ({ blog, user }) => {
  if (!blog) {
    return <Redirect to='/' />
  }

  if (!user) {
    return null
  }

  return (
    <div>
      <BlogDetails
        user={user}
        blog={blog}
      />
      <h2>Comments</h2>
      <CommentForm
        blog={blog}
      />
      <CommentList
        comments={blog.comments}
      />
    </div>
  )
}

BlogInfo.propTypes = {
  blog: PropTypes.object,
  user: PropTypes.object
}

export default BlogInfo
