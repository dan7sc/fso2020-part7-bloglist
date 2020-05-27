import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import Main from './components/Main'

const App = () => {
  const dispatch = useDispatch()

  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const loggedUser = useSelector(state => state.loggedUser)
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    dispatch(setUser())
  }, [dispatch])

  return (
    <Main
      blogs={blogs}
      users={users}
      loggedUser={loggedUser}
      notification={notification}
    />
  )
}

export default App
