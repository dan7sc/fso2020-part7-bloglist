import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const UserList = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
          </thead>
          <thead>
          </thead>
          {users.map(user => (
            <tbody key={user.name}>
              <tr>
                <td>
                  <Link to={`/users/${user.id}`} >
                    {user.name}
                  </Link>
                </td>
                <td>
                  {user.blogs.length}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  )
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
}

export default UserList
