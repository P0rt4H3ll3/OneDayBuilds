import { createSlice } from '@reduxjs/toolkit'
import taskService from '../service/tasks'

const taskSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    setTasks: (state, action) => {
      return action.payload
    },
    appendTask: (state, action) => {
      state.push(action.payload)
    }
  }
})

export const { setTasks, appendTask } = taskSlice.actions

export const initializeTask = () => {
  return async (dispatch) => {
    try {
      const result = await taskService.getAll()
      dispatch(setTasks(result))
    } catch (error) {
      console.error('Error while initializing Tasks :', error)
    }
  }
}

export const createTask = (text) => {
  return async (dispatch) => {
    try {
      const newTask = await taskService.create(text)
      dispatch(appendTask(newTask))
    } catch (error) {
      console.error('Error while creating Task :', error)
    }
  }
}

export const updateStatus = (id) => {
  return async (dispatch, getState) => {
    try {
      const updateTask = await taskService.updateStatus(id)
      const allTasks = getState().tasks
      const newTasksArr = allTasks.map((t) =>
        t._id !== updateTask._id ? t : updateTask
      )
      dispatch(setTasks(newTasksArr))
    } catch (error) {
      console.error('Error while updating Task status :', error)
    }
  }
}

export const deleteTask = (id) => {
  return async (dispatch, getState) => {
    try {
      await taskService.delTask(id)
      const allTasks = getState().tasks
      const newTasksArr = allTasks.filter((t) => t._id !== id)
      dispatch(setTasks(newTasksArr))
    } catch (error) {
      console.error('Error while deleting Task :', error)
    }
  }
}

export default taskSlice.reducer
