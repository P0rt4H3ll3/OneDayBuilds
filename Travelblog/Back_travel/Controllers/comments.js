const commentRouter = require('express').Router({ mergeParams: true })
const Comment = require('../mongo/models/Comment')
const Holiday = require('../mongo/models/Holiday')
const User = require('../mongo/models/User')

commentRouter.get('/', async (req, res) => {
  try {
    const id = req.params.id
    const allComments = await Comment.find({ holiday: id })
    res.status(200).json(allComments)
  } catch (error) {
    console.error('Backend Error While fetching All Comments', error)
  }
})

commentRouter.post('/', async (req, res) => {
  // have to add users and comments but allways for users, have to manage token and middleware token extractor
  try {
    // the holiday id that gets this comment will come form the req.params.id
    const { body, user } = req
    if (!user) {
      return res.status(401).json({ error: 'invalid token' })
    }
    const currentUser = await User.findById(user.id)
    const currentHoliday = await Holiday.findById(req.params.id)

    if (!currentHoliday) {
      res.status(404).json({ error: 'Holiday could not be found' })
    }
    const newComment = new Comment({
      ...body,
      likes: 0, //new comments cannot have likes
      user: currentUser.id,
      holiday: currentHoliday.id
    })

    const savedComment = await newComment.save()

    currentUser.comments = currentUser.comments.concat(savedComment.id)
    await currentUser.save()
    currentHoliday.comments = currentHoliday.comments.concat(savedComment.id)
    await currentHoliday.save()

    const populated = await Comment.findById(savedComment.id)
      .populate('user', { username: 1 })
      .populate('holiday', { titel: 1 })

    res.status(201).json(populated)
  } catch (error) {
    console.error('Backend Error While creating new Comment', error)
  }
})

commentRouter.delete('/:id', async (req, res) => {
  // have to add users and comments but allways for users, have to manage token and middleware token extractor
  try {
    // the holiday id that gets this comment will come form the req.params.id
    const { body, user } = req
    if (!user) {
      return res.status(401).json({ error: 'invalid token' })
    }
    const currentUser = await User.findById(user.id)
    const commentToDel = await Comment.findById(req.params.id)
    const currentHoliday = await Holiday.findById(
      commentToDel.holiday.toString()
    )
    if (user.id !== commentToDel.user.toString()) {
      return res.status(401).json({ error: 'no permission to delete request' })
    }

    const deletedComm = await Comment.findByIdAndDelete(commentToDel.id)
    currentUser.comments = currentUser.comments.filter(
      (c) => c.id !== deletedComm.id
    )
    await currentUser.save()
    currentHoliday.comments = currentHoliday.comments.filter(
      (c) => c.id !== deletedComm.id
    )
    await currentHoliday.save()

    res.status(201).json(deletedComm)
  } catch (error) {
    console.error('Backend Error While deleting Comment', error)
  }
})

module.exports = commentRouter
