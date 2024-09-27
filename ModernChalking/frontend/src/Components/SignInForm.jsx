import { useDispatch } from 'react-redux'
import { signIn } from '../reducers/userReducer'

const SignInForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const { name, username, password } = event.target
    const newUser = {
      name: name.value,
      username: username.value,
      password: password.value
    }

    event.target.reset()

    dispatch(signIn(newUser))
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          name <input type="text" name="name" />
        </div>
        <div>
          username <input type="text" name="username" />
        </div>
        <div>
          password <input type="password" name="password" />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}

export default SignInForm
