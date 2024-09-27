import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './messageReducer'
import loginService from '../services/login'
import commentService from '../services/comments'
import userAuth from '../services/users'

const initialState = ''

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload
    },
    removeUser: (state, action) => {
      return initialState
    }
  }
})

export const { setUser, removeUser } = userSlice.actions

export const logIn = (credentials) => {
  return async (dispatch) => {
    try {
      const loginResult = await loginService.login(credentials)
      // Save token in localStorage
      window.localStorage.setItem(
        'loggedModernUser',
        JSON.stringify(loginResult)
      )

      // Set token for comment service
      commentService.setToken(loginResult.token)

      // Dispatch user to Redux state
      dispatch(setUser(loginResult))
    } catch (error) {
      dispatch(
        setNotification(
          `Error while Logging in: ${
            error.response?.data?.error || error.message
          }`
        )
      )
    }
  }
}

export const signIn = (credentials) => {
  return async (dispatch) => {
    try {
      const signResult = await userAuth.SignIn(credentials)

      // Save token in localStorage
      window.localStorage.setItem(
        'loggedModernUser',
        JSON.stringify(signResult)
      )

      // Set token for comment service
      commentService.setToken(signResult.token)

      // Dispatch user to Redux state
      dispatch(setUser(signResult))
    } catch (error) {
      dispatch(
        setNotification(
          `Error while Signing in: ${
            error.response?.data?.error || error.message
          }`
        )
      )
    }
  }
}

export const logOut = () => {
  return async (dispatch) => {
    try {
      // remove token in localStorage
      window.localStorage.removeItem('loggedModernUser')

      // Set Empty token for comment service
      commentService.setToken('')

      // Dispatch user to Redux state
      dispatch(removeUser())
    } catch (error) {
      dispatch(
        setNotification(
          `Error while Logging out: ${
            error.response?.data?.error || error.message
          }`
        )
      )
    }
  }
}

export default userSlice.reducer
