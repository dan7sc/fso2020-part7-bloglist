import React from 'react'
import PropTypes from 'prop-types'

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
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
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
