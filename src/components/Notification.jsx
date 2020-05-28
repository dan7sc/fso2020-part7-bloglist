import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes, css } from 'styled-components'

const fade = keyframes`
  0% {
    margin-left: -100em;
  }

  10% {
    margin-left: 0;
  }

  90% {
    margin-left: 0;
  }

  100% {
    margin-left: 100em;
  }
`



const Error = css`
  color: rgb(250, 180, 180);
  background-color: rgba(32, 7, 7, .75);
`

const Success = css`
  color: rgb(180, 250, 180);
  background-color: rgba(7, 32, 7, .75);
`

const Alert = styled.div`
  z-index: 1;
  position: absolute;
  top: 0;
  width: 100%;
  height: 60px;
  max-height: 60px;
  font-size: 1.8em;
  letter-spacing: .1em;
  text-align: center;
  padding-top: .8em;
  animation: ${fade} 5s linear;
  ${props => props.type === 'success' ? Success : Error};
`

const Notification = ({ type, message }) => {
  if (type && message) {
    return <Alert type={type}>{message}</Alert>
  } else {
    return null
  }
}

Notification.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
}

export default Notification
