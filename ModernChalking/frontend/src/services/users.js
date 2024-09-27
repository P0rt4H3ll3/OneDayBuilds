import axios from 'axios'
const baseURL = '/api/users'

const SignIn = async (credentials) => {
  const result = await axios.post(baseURL, credentials)
  return result.data
}

export default { SignIn }
