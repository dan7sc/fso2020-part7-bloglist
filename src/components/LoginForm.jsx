import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled, { css } from 'styled-components'
import { login } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'

const Login = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  position: relative;
  font-size: 1.5em;
  width: 50%;
  max-width: 100%;
  height: 70vh;
  color: palevioletredy;
  background: #eeeeee;
`

const Title = styled.h1`
  color: black;
  font-weight: bold;
`

const Form = styled.form`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 28px;
`

const Label = styled.label`
  position: absolute;
  top: .5em;
  left: .5em;
  opacity: .5;
  color: black;
  transition: all 240ms ease-in-out 80ms;
`

const inputActiveStyle = css`
  outline: 0;
  border-bottom: 2px solid #FF4B2B;
  transition: all 240ms ease-in-out 80ms;
  ~${Label} {
    color: #FF4B2B;
    opacity: 1;
    top: -.9em;
    left: .7em;
    font-size: .7em;
  }
`

const Input = styled.input`
  box-sizing: border-box;
  display: block-inline;
  background: #eeeeee;
  outline: 0;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, .5);
  width: 40vh;
  height: 40px;
  font-size: .9em;
  padding-left: .6em;
  transition: all 240ms ease-in-out 80ms;
  &:focus {
    ${inputActiveStyle}
  }
  &:${props => props.value ? inputActiveStyle : null}
`

const Button = styled.button`
  position: inline;
  border-radius: 20px;
  border: 2px solid #FF4B2B;
  background-color: #FF4B2B;
  color: #FFFFFF;
  font-size: 0.8em;
  font-weight: bold;
  padding: 0.6em 2em;
  margin-top: 2.2em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  outline: 0;
  cursor: pointer;
  transition: all 120ms ease-out 120ms;
  &:hover {
    border: 2px solid #FF4B2B;
    background-color: #FFFFFF;
    color: #FF4B2B;
  }
`

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameInput = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordInput = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    const credentials = { username, password }
    setUsername('')
    setPassword('')

    try {
      await dispatch(
        login(credentials)
      )
    } catch(e) {
      dispatch(
        setNotification([
          'error',
          'wrong username or password'
        ])
      )
    }
  }

  return (
    <Login>
      <Title>Login</Title>
      <Form onSubmit={handleLogin}>
        <InputGroup>
          <Input
            id='username'
            type='text'
            value={username}
            name='Username'
            onChange={handleUsernameInput}
          />
          <Label htmlFor='username'>Username</Label>
        </InputGroup>
        <InputGroup>
          <Input
            id='password'
            type='password'
            value={password}
            name='Password'
            onChange={handlePasswordInput}
          />
          <Label htmlFor='password'>Password</Label>
        </InputGroup>
        <Button
          id='login-button'
          type='submit'>
          login
        </Button>
      </Form>
    </Login>
  )
}

export default LoginForm
