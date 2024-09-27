import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comments'
import { setNotification } from './messageReducer'

const commentSlice = createSlice({
  name: 'comments',
  initialState: '',
  reducers: {
    setComments: (state, action) => {
      return action.payload
    },
    appendComment: (state, action) => {
      state.push(action.payload)
    }
  }
})

export const { setComments, appendComment } = commentSlice.actions

export const fetchAllComments = () => {
  return async (dispatch) => {
    try {
      const allComms = await commentService.getAll()
      dispatch(setComments(allComms))
    } catch (error) {
      console.error(
        `Error while fetching all comments: ${
          error.response?.data?.error || error.message
        }`
      )
    }
  }
}

export const createComment = (newCommentObj) => {
  return async (dispatch, getState) => {
    try {
      const response = await commentService.create(newCommentObj)
      const comments = getState().comments
      const commentsPlus = comments.concat(response)
      dispatch(setComments(commentsPlus))
    } catch (error) {
      setNotification(
        `Error while creating comments: ${
          error.response?.data?.error || error.message
        }`
      )
    }
  }
}

export const updateComment = (comment) => {
  return async (dispatch, getState) => {
    try {
      const update = await commentService.updateLikes(comment)
      const comments = getState().comments
      const updateComments = comments.map((c) =>
        c._id !== comment._id ? c : update
      )
      dispatch(setComments(updateComments))
    } catch (error) {
      setNotification(
        `Error while liking comments: ${
          error.response?.data?.error || error.message
        }`
      )
    }
  }
}

export const deleteComment = (comment) => {
  return async (dispatch, getState) => {
    try {
      await commentService.deleteCom(comment._id)
      const comments = getState().comments
      const updateComments = comments.filter((c) => c._id !== comment._id)
      dispatch(setComments(updateComments))
    } catch (error) {
      setNotification(
        `Error while deleting comments: ${
          error.response?.data?.error || error.message
        }`
      )
    }
  }
}

export default commentSlice.reducer
