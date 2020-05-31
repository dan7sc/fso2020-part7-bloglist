import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { logout } from '../reducers/loginReducer'

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: sticky;
  z-index: 1;
  box-sizing: border-box;
  background: #2E2217;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 60px;
  min-height: 60px;
  color: lightgray;
  font-size: 1.5em;
  letter-spacing: .1em;
  & > div {
    display: flex;
    align-items: center;
    position: relative;
    right: 20px;
    color: lightgray;
    & > :nth-child(1) {
      font-size: 1.1em;
      margin: 0 .2em;
      border-bottom: 1px solid tomato;
    }
    & > :nth-child(2) {
      font-size: .8em;
      margin: .2em 1.2em 0 .5em;
    }
  }
`

const List = styled.ul`
  display: flex;
  flex-flow: row;
  list-style-type: none;
  box-sizing: border-box;
  & > :nth-child(1) {
    border-bottom: ${props => props.active === '' || props.active === 'blogs' ? '2px solid tomato' : 'none'};
  }
  & > :nth-child(3) {
    border-bottom: ${props => props.active === 'users' ? '2px solid tomato' : 'none'};
  }
`

const ListItem = styled.li`
  text-align: center;
  user-select: none;
  outline: 0;
`

const ListItemLink = styled(Link)`
  outline: 0;
  text-decoration: none;
  color: lightgray;
  font-size: 1.1em;
  &:hover {
    color: tomato;
  }
`

const Button = styled.button`
  box-sizing: border-box;
  border-radius: 20px;
  border: 3px solid #FF4B2B;
  background-color: #FFFFFF;
  color: #FF4B2B;
  font-size: 0.8em;
  font-weight: bold;
  padding: 0.4em 1em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  outline: 0;
  cursor: pointer;
  transition: all 120ms ease-out 120ms;
  &:hover {
    border: 3px solid #FF4B2B;
    background-color: #FF4B2B;
    color: #FFFFFF;
  }
`

const VerticalLine = styled.hr`
  transform: rotate(180deg);
  box-sizing: border-box;
  position: relative;
  margin: 0 10px;
  padding: 0;
  border: none;
  width: 2px;
  height: 24px;
  Background-color: lightgray;
`

const Menu = ({ user }) => {
  const dispatch = useDispatch()
  const [active, setActive] = useState('')

  useEffect(() => {
    const { pathname } = { ...window.location }
    const newActive = pathname.split('/')[1]
    setActive(newActive)
  }, [])

  const handleActive = (item) => {
    setActive(item)
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
    <Nav>
      <List active={active}>
        <ListItem>
          <ListItemLink
            to='/'
            onClick={() => handleActive('blogs')}
          >
            Blogs
          </ListItemLink>
        </ListItem>
        <VerticalLine />
        <ListItem>
          <ListItemLink
            to='/users'
            onClick={() => handleActive('users')}
          >
            Users
          </ListItemLink>
        </ListItem>
      </List>
      <div>
        <span>{user.name}</span>
        <span>logged in</span>
        <Button onClick={handleLogout}>logout</Button>
      </div>
    </Nav>
  )
}

Menu.propTypes = {
  users: PropTypes.object,
}

export default Menu
