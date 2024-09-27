import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './Components/Home'
import SignInForm from './Components/SignInForm'
import LoginForm from './Components/LoginForm'

const App = () => {
  const padding = { padding: 5 }
  return (
    <Router>
      <div>
        <Link style={padding} to="/">
          Home
        </Link>
        <Link style={padding} to="/login">
          Login
        </Link>
        <Link style={padding} to="/signin">
          Sign in
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signin" element={<SignInForm />} />
      </Routes>
    </Router>
  )
}

export default App
