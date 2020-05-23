import React from 'react'
import PropTypes from 'prop-types'

const CommentList = ({ comments }) => {
  if (comments.length === 0) {
    return (
      <div>
        <p>No comments for this blog</p>
      </div>
    )
  }

  return (
    <div>
      <ul>
        {comments.map((content, index) => (
          <li key={index}>{content}</li>
        ))}
      </ul>
    </div>
  )
}

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
}

export default CommentList
