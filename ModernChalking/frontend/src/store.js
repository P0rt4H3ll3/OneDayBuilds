import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import commentReducer from './reducers/commentReducer'
import messageReducer from './reducers/messageReducer'

const store = configureStore({
  reducer: {
    user: userReducer,
    comments: commentReducer,
    message: messageReducer
  }
})

export default store
