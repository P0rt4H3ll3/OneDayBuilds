const commentsRouter = require('express').Router()
const Comment = require('../models/Comment')
const User = require('../models/User')

commentsRouter.get('/', async (req, res) => {
  const comments = await Comment.find({}).populate('user', { username: 1 })
  res.status(200).json(comments)
})

commentsRouter.post('/', async (req, res) => {
  const body = req.body
  const user = req.user
  if (!user) {
    res.status(401).json({ error: 'invalid token' })
  }
  const currentUser = await User.findById(user.id)

  if (!body.content) {
    res.status(400).json({ error: 'no content' })
  }
  try {
    const newComment = new Comment({
      ...body,
      user: currentUser._id
    })
    const savedComment = await newComment.save(newComment)
    currentUser.comments = currentUser.comments.concat(savedComment._id)
    await currentUser.save()
    const populatedComment = await Comment.findById(savedComment._id).populate(
      'user',
      { username: 1 }
    )
    res.status(200).json(populatedComment)
  } catch (error) {
    console.log('Error while saving new Comment, ', error)
  }
})

commentsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  if (!req.token) {
    res.status(401).json({ error: 'missing token, please login' })
  }
  const comment = await Comment.findById(id)
  if (!(req.user.id.toString() === comment.user.toString())) {
    res
      .status(401)
      .json({ error: 'you do not have the permission to delete this Comment' })
  }
  await Comment.findByIdAndDelete(id)
  res.status(204).end()
})

commentsRouter.put('/likes/:id', async (req, res) => {
  const id = req.params.id
  const { likes } = req.body
  const upComment = await Comment.findByIdAndUpdate(
    id,
    { likes: likes + 1 },
    { new: true }
  ).populate('user', { username: 1 })
  res.status(200).json(upComment)
})

commentsRouter.put('/edit/:id', async (req, res) => {
  const comment = await Comment.findById(req.params.id)
  if (!req.token) {
    res.status(401).json({ error: 'missig token, please authenticate' })
  }
  if (!(req.user.id.toString() === comment.user.toString())) {
    res
      .status(401)
      .json({ error: 'you do not have the permission to edit this Comment' })
  }
  comment.content = req.content
  await comment.save()
  res.status(200).json(upComment)
})

module.exports = commentsRouter
