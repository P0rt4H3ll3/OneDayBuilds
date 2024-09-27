import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      return action.payload
    },
    removeMessage: (state, action) => {
      return initialState
    }
  }
})

export const { setMessage, removeMessage } = messageSlice.actions

export const setNotification = (message) => {
  return async (dispatch) => {
    dispatch(setMessage(message))
    setTimeout(() => {
      dispatch(removeMessage())
    }, 5000)
  }
}

export default messageSlice.reducer
