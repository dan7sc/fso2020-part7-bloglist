import commentService from '../services/comments'

const commentReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_COMMENTS':
    return action.data
  case 'NEW_COMMENT':
    return [...state, action.data]
  default:
    return state
  }
}

export const initializeComments = (blogs) => {
  let allComments = []

  return async dispatch => {
    for (let i = 0; i < blogs.length; i++) {
      const id = blogs[i].id
      const comments = await commentService.getAll(id)
      allComments.push(comments)
    }

    dispatch({
      type: 'INIT_COMMENTS',
      data: allComments
    })
  }
}

export const createComment = (id, content) => {
  return async dispatch => {
    const newComment = await commentService.create(id, content)

    dispatch({
      type: 'NEW_COMMENT',
      data: newComment
    })
  }
}

export default commentReducer
