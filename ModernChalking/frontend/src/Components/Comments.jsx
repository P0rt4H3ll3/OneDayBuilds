import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAllComments,
  createComment,
  updateComment,
  deleteComment
} from '../reducers/commentReducer'

const Comments = () => {
  const comments = useSelector((state) => state.comments)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllComments())
  }, [dispatch])

  const handleNewComment = async (event) => {
    event.preventDefault()
    const newComment = event.target.comment.value
    event.target.comment.value = ''
    const newCommentObj = {
      content: newComment,
      likes: 0
    }
    dispatch(createComment(newCommentObj))
  }

  const handleLike = async (comment) => {
    dispatch(updateComment(comment))
  }

  const handleDelete = async (comment) => {
    dispatch(deleteComment(comment))
  }

  if (!comments) {
    return <p>no comments found</p>
  }
  return (
    <div>
      {comments?.length !== 0 && (
        <div>
          {comments.map((comment) => {
            return (
              <div key={comment._id}>
                <div>Comment: {comment.content}</div>
                <div>created by: {comment.user.username}</div>
                <div>
                  likes: {comment.likes}
                  <button onClick={() => handleLike(comment)}>Like</button>
                </div>
                <div>
                  <button onClick={() => handleDelete(comment)}>delete</button>
                </div>
              </div>
            )
          })}
        </div>
      )}
      <form onSubmit={handleNewComment}>
        <textarea
          placeholder="write a comment, i will read it"
          type="text"
          name="comment"
          rows={4}
          cols={50}
        />
        <button type="submit">add comment</button>
      </form>
    </div>
  )
}

export default Comments
