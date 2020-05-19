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
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  let loggedUser = null

  if (loggedUserJSON)
    loggedUser = JSON.parse(loggedUserJSON)

  return {
    type: 'SET_USER',
    data: loggedUser
  }
}

export const logout = () => {
  window.localStorage.removeItem('loggedBlogappUser')

  return {
    type: 'LOGOUT'
  }
}

export default loginReducer
