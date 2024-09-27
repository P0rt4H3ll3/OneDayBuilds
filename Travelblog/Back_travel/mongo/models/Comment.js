const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
  content: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  holiday: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Holiday'
  }
})
const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment
