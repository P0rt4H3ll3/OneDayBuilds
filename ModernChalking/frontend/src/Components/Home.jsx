import Comments from './Comments'
import Video from './Video'
import Notification from './Nofitication'
import { logOut } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import commentService from '../services/comments'
import { setUser } from '../reducers/userReducer'

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedModernUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      // Set token for comment service requests
      commentService.setToken(user.token)

      // Dispatch user details to the Redux store
      dispatch(setUser(user))
    }
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logOut())
  }

  return (
    <div>
      <h1>Modern Chalking</h1>
      <Notification />
      <button onClick={handleLogout}>logout</button>
      <Video />
      <Comments />
    </div>
  )
}

export default Home
