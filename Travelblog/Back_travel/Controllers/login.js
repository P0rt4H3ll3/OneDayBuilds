const loginRouter = require('express').Router()
const User = require('../mongo/models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    const isPasswordCorrect =
      user === null
        ? false
        : await bcryptjs.compare(password, user.passwordHash)
    if (!(user && isPasswordCorrect)) {
      return res.status(400).json({ error: 'invalid username or password' })
    }
    const forUserToken = {
      username: user.username,
      id: user.id
      //_id vs. id:
      // Mongoose automatically creates a virtual id field which is the stringified version of _id.
      // user.id is effectively a getter that returns user._id.toString() behind the scenes.
    }
    const token = jwt.sign(forUserToken, process.env.SECRET)

    res.status(200).json({ token, username: user.username, name: user.name })
  } catch (error) {
    console.error('Backend Error While logging in user', error)
  }
})

module.exports = loginRouter
