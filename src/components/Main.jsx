import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled, { createGlobalStyle }  from 'styled-components'
import Menu from './Menu'
import UserList from './UserList'
import User from './User'
import BlogList from './BlogList'
import BlogForm from './BlogForm'
import BlogInfo from './BlogInfo'
import LoginForm from './LoginForm'
import Notification from './Notification'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: #e2e0f3;
    box-sizing: border-box;
    font-family: Roboto;
    font-size: 12px;
  }
`

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  width: 768px;
  max-width: 100%;
  height: 100vh;
  min-height: 480px;
  background-color: palevioletred;
  overflow: hidden;
`

const LoginContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Main = ({
  blogs,
  users,
  loggedUser,
  notification
}) => {
  const userId = useRouteMatch('/users/:id')
  const matchedUser = userId
    ? users.find(user => user.id === userId.params.id)
    : null

  const blogId = useRouteMatch('/blogs/:id')
  const matchedBlog = blogId
    ? blogs.find(blog => blog.id === blogId.params.id)
    : null

  const [messageType, message] = notification

  if (!loggedUser) {
    return (
      <LoginContainer>
        <GlobalStyle/>
        <Notification
          type={messageType}
          message={message}
        />
        <LoginForm />
      </LoginContainer>
    )
  }

  return (
    <Container>
      <GlobalStyle/>
      <Menu user={loggedUser} />
      <h2>blog app</h2>
      <Notification
        type={messageType}
        message={message}
      />
      <br />
      <Switch>
        <Route path='/blogs/:id'>
          <BlogInfo
            blog={matchedBlog}
            user={loggedUser}
          />
        </Route>
        <Route path='/users/:id'>
          <User user={matchedUser} />
        </Route>
        <Route path='/users'>
          <UserList users={users} />
        </Route>
        <Route path='/'>
          <BlogForm />
          <BlogList blogs={blogs} />
        </Route>
      </Switch>
    </Container>
  )
}

Main.propTypes = {
  blogs: PropTypes.array,
  users: PropTypes.array,
  loggedUser: PropTypes.object,
  notification: PropTypes.array
}

export default Main
