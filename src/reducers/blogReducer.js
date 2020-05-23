import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'UPDATE_BLOG':
    return state.map(blog => {
      if (blog.url === action.data.url)
        return { ...blog, likes: blog.likes += 1 }
      else
        return blog
    })
  case 'DELETE_BLOG':
    return state.filter(
      blogToFilter =>
        blogToFilter.id !== action.data.id
    )
  case 'NEW_COMMENT':{
    return [...state, action.data]
  }
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    blogs.sort((blogA, blogB) => (
      blogB.likes - blogA.likes
    ))

    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (object) => {
  const { token } = JSON.parse(
    window.localStorage.getItem('loggedBlogappUser')
  )

  return async dispatch => {
    await blogService.setToken(token)
    const newBlog = await blogService.create(object)

    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const deleteBlog = (id) => {
  const { token } = JSON.parse(
    window.localStorage.getItem('loggedBlogappUser')
  )

  return async dispatch => {
    await blogService.setToken(token)
    await blogService.deleteOne(id)

    dispatch({
      type: 'DELETE_BLOG',
      data: { id }
    })
  }
}

export const updateBlog = (id, newObject) => {
  const { token } = JSON.parse(
    window.localStorage.getItem('loggedBlogappUser')
  )

  return async dispatch => {
    await blogService.setToken(token)
    const updatedBlog = await blogService.update(id, newObject)

    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog
    })
  }
}

export const createComment = (id, content) => {
  return async dispatch => {
    const blogWithNewComment = await blogService.createComment(id, content)

    dispatch({
      type: 'NEW_COMMENT',
      data: blogWithNewComment
    })
  }
}

export default blogReducer
