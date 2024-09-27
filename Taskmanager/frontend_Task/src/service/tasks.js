import axios from 'axios'

const baseUrl = '/api/tasks'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const delTask = async (id) => {
  const request = await axios.delete(`${baseUrl}/${id}`)
  return request.data
}

const updateStatus = async (id) => {
  const request = await axios.put(`${baseUrl}/${id}`)
  return request.data
}

const create = async (task) => {
  const request = await axios.post(baseUrl, task)
  return request.data
}

export default { getAll, delTask, updateStatus, create }
