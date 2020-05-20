import React from 'react'
import PropTypes from 'prop-types'

const User = ({ user }) => {
  return (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

User.propTypes = {
  user: PropTypes.object.isRequired,
}

export default User
