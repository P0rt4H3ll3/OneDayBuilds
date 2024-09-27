const userRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

userRouter.get('/', async (req, res) => {
  const response = await User.find({})
  res.status(200).json(response)
})

userRouter.post('/', async (req, res) => {
  const { name, username, password } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  const userTokenInfo = {
    username: savedUser.username,
    id: savedUser._id
  }

  const token = jwt.sign(userTokenInfo, process.env.SECRET)

  // Respond with token and user info
  res.status(201).json({
    token,
    username: savedUser.username,
    name: savedUser.name
  })
})

userRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  const delUser = await User.findByIdAndDelete(id)
  res.status(200).json({ message: `user : '${delUser.username}' was deleted` })
})

module.exports = userRouter
