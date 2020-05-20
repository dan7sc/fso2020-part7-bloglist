import React from 'react'
import { Link } from 'react-router-dom'

const Menu = ({ user, handleLogout }) => {
  const padding = { padding: 5 }
  const navbar = {
    background: '#dddddd',
    padding: 8
  }

  if (!user) return null

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
