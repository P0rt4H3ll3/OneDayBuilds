import axios from 'axios'
const baseURL = '/api/comments'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const config = (token) => ({ headers: { authorization: token } })

const getAll = async () => {
  try {
    const response = await axios.get(baseURL)
    return response.data
  } catch (error) {
    console.error('error while getAll', error)
  }
}

const create = async (contentObj) => {
  const response = await axios.post(`${baseURL}`, contentObj, config(token))
  return response.data
}

const deleteCom = async (id) => {
  const response = await axios.delete(`${baseURL}/${id}`, config(token))
  return response.data
}

const updateLikes = async (updateObject) => {
  const id = updateObject._id
  const response = await axios.put(`${baseURL}/likes/${id}`, updateObject)
  return response.data
}

const updateComm = async (updateObject) => {
  const id = updateObject._id
  const response = await axios.put(
    `${baseURL}/edit/${id}`,
    updateObject,
    config(token)
  )
  return response.data
}

export default { getAll, deleteCom, create, updateLikes, updateComm, setToken }
