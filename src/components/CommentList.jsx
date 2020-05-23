import React from 'react'
import PropTypes from 'prop-types'

const CommentList = ({ comments }) => {
  if (!comments || comments.content.length === 0) {
    return (
      <div>
        <p>No comments for this blog</p>
      </div>
    )
  }

  return (
    <div>
      <ul>
        {comments.content.map((content, index) => (
          <li key={index}>{content}</li>
        ))}
      </ul>
    </div>
  )
}

CommentList.propTypes = {
  comments: PropTypes.object,
}

export default CommentList
