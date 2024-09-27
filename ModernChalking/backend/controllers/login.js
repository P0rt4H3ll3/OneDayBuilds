const loginRouter = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  if (!(username && password)) {
    res.status(400).json({ error: 'no credentials detected' })
  }
  const user = await User.findOne({ username })

  const isPasswordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)
  if (!(user && isPasswordCorrect)) {
    res.status(404).json({ error: 'invalid username or password' })
  }

  const userTokenInfo = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userTokenInfo, process.env.SECRET)
  res.status(200).json({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
