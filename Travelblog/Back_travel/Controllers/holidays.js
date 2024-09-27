const holidayRouter = require('express').Router()
const Comment = require('../mongo/models/Comment')
const Holiday = require('../mongo/models/Holiday')
const User = require('../mongo/models/User')
const commentRouter = require('./comments')

holidayRouter.use('/:id/comments', commentRouter)

holidayRouter.get('/', async (req, res) => {
  try {
    const allHolidays = await Holiday.find({})
      .populate('user', { username: 1 })
      .populate('comments', { content: 1, likes: 1 })
    res.status(200).json(allHolidays)
  } catch (error) {
    console.error('Backend Error While fetching All Holidays', error)
  }
})

holidayRouter.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const singleHoliday = await Holiday.findById(id)
    res.status(200).json(singleHoliday)
  } catch (error) {
    console.error('Backend Error While fetching single Holidays', error)
  }
})

holidayRouter.post('/', async (req, res) => {
  try {
    const { body, user, token } = req
    if (!token) {
      return res.status(401).json({ error: 'invalid or missing token' })
    }
    if (
      !body.country ||
      !body.category ||
      !body.duration ||
      !body.price ||
      !body.title ||
      !body.content
    ) {
      return res.status(400).json({ error: 'All fields are required' })
    }
    const currentUser = await User.findById(user.id)
    const newHoliday = new Holiday({
      ...body,
      likes: 0,
      user: currentUser.id,
      comments: [] // Empty comments array for new holiday posts
    })

    const savedHoliday = await newHoliday.save()
    //add this holiday to the holidays of the user
    currentUser.holidays = currentUser.holidays.concat(savedHoliday)
    await currentUser.save()

    //populate the holiday user field with the username
    const populated = await Holiday.findById(savedHoliday.id).populate('user', {
      username: 1
    })

    res.status(201).json(populated)
  } catch (error) {
    console.error('Backend Error While creating new Holidays:', error)

    // Return an error status and message to the client
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

holidayRouter.delete('/:id', async (req, res) => {
  try {
    // the holiday id that gets this comment will come form the req.params.id
    const { user } = req
    if (!user) {
      return res.status(401).json({ error: 'invalid token' })
    }
    const currentUser = await User.findById(user.id)
    const holidayToDel = await Holiday.findById(req.params.id)

    if (user.id !== holidayToDel.user.toString()) {
      return res.status(401).json({ error: 'no permission to delete request' })
    }
    const commentsToDelete = holidayToDel.comments
    if (commentsToDelete.length > 0) {
      await Comment.deleteMany({ _id: { $in: commentsToDelete } })
    }

    const deletedHoliday = await Holiday.findByIdAndDelete(req.params.id)
    // currentUser.holidays [
    //   new ObjectId('66f540b8056e36e897716949'),
    currentUser.holidays = currentUser.holidays.filter(
      (h) => h.toString() !== deletedHoliday.id.toString()
    )
    await currentUser.save()

    res.status(204).json(deletedHoliday)
  } catch (error) {
    console.error('Backend Error While deleting Holiday', error)
  }
})

holidayRouter.delete('/all/really', async (req, res) => {
  try {
    // Delete all holidays
    const allH = await Holiday.find({})
    const holidaysToDelete = allH.map((h) => h._id.toString()) // Call toString()
    if (holidaysToDelete.length > 0) {
      await Holiday.deleteMany({ _id: { $in: holidaysToDelete } })
    }

    // Delete all users
    const allU = await User.find({})
    const usersToDelete = allU.map((u) => u._id.toString()) // Call toString()
    if (usersToDelete.length > 0) {
      await User.deleteMany({ _id: { $in: usersToDelete } })
    }

    // Delete all comments
    const allC = await Comment.find({})
    const commentsToDelete = allC.map((c) => c._id.toString()) // Call toString()
    if (commentsToDelete.length > 0) {
      await Comment.deleteMany({ _id: { $in: commentsToDelete } }) // Use Comment collection
    }

    // Send a 204 No Content response
    res.status(204).end()
  } catch (error) {
    console.error('Backend Error While deleting all', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = holidayRouter
