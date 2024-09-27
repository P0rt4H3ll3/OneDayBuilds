const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  holidays: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Holiday'
    }
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnObject) => {
    delete returnObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User
