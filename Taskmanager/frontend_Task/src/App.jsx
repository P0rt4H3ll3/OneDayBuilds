import { Routes, Route, Link } from 'react-router-dom'
import Home from './Components/Home'
import styles from './App.module.css'
import { initializeTask } from './reducers/taskReducer'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeTask())
  }, [dispatch])
  return (
    <div className={styles.appLayout}>
      <h1 className={styles.appName}>TASKS APP</h1>
      <h1 className={styles.author}>By Phillip Radon</h1>
      <div className={styles.navBar}>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/info">Info</Link>
        <Link to="/profile">Profile</Link>
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
