import loginService from '../services/login'

const loginReducer = (state = null, action) => {
  switch(action.type) {
  case 'LOGIN':
    return action.data
  case 'SET_USER':
    return action.data
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const login = (credentials) => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )

    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const setUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)

      dispatch({
        type: 'SET_USER',
        data: loggedUser
      })
    }
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')

    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default loginReducer
