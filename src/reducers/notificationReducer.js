let timeoutID = 0

const notificationReducer = (state = ['', ''], action) => {
  switch(action.type) {
  case 'SET_NOTIFICATION':
    return [action.data.messageType, action.data.message]
  case 'CLEAR_NOTIFICATION':
    return ['', '']
  default:
    return state
  }
}

export const setNotification = ([messageType, message]) => {
  return async dispatch => {
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    }, 5000)

    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        messageType,
        message
      }
    })
  }
}

export default notificationReducer
