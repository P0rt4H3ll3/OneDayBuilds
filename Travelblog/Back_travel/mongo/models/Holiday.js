const mongoose = require('mongoose')

const holidaySchema = new mongoose.Schema({
  title: String,
  content: String,
  country: String,
  categroy: String,
  duration: Number,
  price: Number,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
})

const Holiday = mongoose.model('Holiday', holidaySchema)

module.exports = Holiday
