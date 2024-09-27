import axios from 'axios'

const baseURL = '/api/holidays'

const getAll = async () => {
  try {
    const response = await axios.get(baseURL)
    return response.data
  } catch (error) {
    console.error('error while getAll', error)
  }
}

export default { getAll }
