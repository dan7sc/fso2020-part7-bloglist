import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/loginReducer'

const Menu = ({ user }) => {
  const dispatch = useDispatch()

  const padding = { padding: 5 }
  const navbar = {
    background: '#dddddd',
    padding: 8
  }

  const handleLogout = () => {
    dispatch(
      logout()
    )
  }

  if (!user) {
    return null
  }

  return (
    <div style={navbar}>
      <Link style={padding} to='/'>blogs</Link>
      <Link style={padding} to='/users'>users</Link>
      <span>{user.name} logged in </span>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Menu
