import axios from 'axios'
const baseURL = '/api/login'

const login = async (credentials) => {
  const result = await axios.post(baseURL, credentials)
  return result.data
}

export default { login }
