import { logIn } from '../reducers/userReducer'
import styles from './LoginForm.module.css'
import 'boxicons'
import { useDispatch } from 'react-redux'

const LoginForm = () => {
  const dispatch = useDispatch()
  const handleSubmit = (event) => {
    event.preventDefault()
    const { username, password } = event.target
    const credentials = {
      username: username.value,
      password: password.value
    }
    event.target.reset()
    dispatch(logIn(credentials))
  }

  return (
    <div className={styles.wrapper}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputDiv}>
          <input placeholder="username" type="text" name="username" />
          <box-icon name="user" color="#000000"></box-icon>
        </div>
        <div className={styles.inputDiv}>
          <input placeholder="password" type="password" name="password" />
          <box-icon name="lock-alt" color="#000000"></box-icon>
        </div>
        <div className={styles.rememberForgot}>
          <label>
            <input type="checkbox" />
            Remember me
          </label>

          <a href="#">Forgot password?</a>
        </div>

        <button className={styles.btn} type="submit">
          Login
        </button>
        <div className={styles.registerLink}>
          <p>
            Don&apos;t have an account? <a href="#">Register</a>
          </p>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
