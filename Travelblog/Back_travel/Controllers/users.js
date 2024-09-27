const userRouter = require('express').Router()
const User = require('../mongo/models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

userRouter.get('/', async (req, res) => {
  try {
    const allUsers = await User.find({})
    res.status(200).json(allUsers)
  } catch (error) {
    console.error('Backend Error While fetching All Users', error)
  }
})

userRouter.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const singleUser = await User.findById({ id })
    res.status(200).json(singleUser)
  } catch (error) {
    console.error('Backend Error While fetching single User', error)
  }
})

userRouter.post('/', async (req, res) => {
  try {
    const { username, name, password } = req.body
    if (!(password && username && name)) {
      return res
        .status(400)
        .json({ error: 'please fill out username, name, password' })
    }

    const saltRounds = 10
    const passwordHash = await bcryptjs.hash(password, saltRounds)

    const newUser = new User({
      username,
      name,
      passwordHash
    })
    const savedUser = await newUser.save()

    res.status(201).json(savedUser)
  } catch (error) {
    console.error('Backend Error While creating new User', error)
  }
})

module.exports = userRouter
