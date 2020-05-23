import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CommentForm = ({ id, createComment }) => {
  const [content, setContent] = useState('')

  const handleInput = (event, setFunction) => {
    setFunction(event.target.value)
  }

  const addComment = (event) => {
    event.preventDefault()

    createComment(id, content)
    setContent('')
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
  id: PropTypes.string.isRequired,
  createComment: PropTypes.func.isRequired
}

export default CommentForm
