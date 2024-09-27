const taskRouter = require('express').Router()
const Task = require('../models/task')

taskRouter.get('/', async (req, res) => {
  try {
    const request = await Task.find({})
    res.status(200).json(request)
  } catch (error) {
    console.log('Error while fetching all Tasks, backend', error)
  }
})

taskRouter.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const request = await Task.findByIdAndDelete(id)
    res.status(204).end()
  } catch (error) {
    console.log('Error while deleting Tasks, backend', error)
  }
})

taskRouter.put('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const task = await Task.findById(id)
    const taskToUp = {
      _id: task._id,
      text: task.text,
      done: true
    }
    const updatedTask = await Task.findByIdAndUpdate(id, taskToUp, {
      new: true
    })
    res.status(200).json(updatedTask)
  } catch (error) {
    console.log('Error while updating Tasks, backend', error)
  }
})

taskRouter.post('/', async (req, res) => {
  try {
    const body = req.body
    const request = new Task({
      ...body,
      done: false
    })
    newTask = await request.save()
    res.status(200).json(newTask)
  } catch (error) {
    console.log('Error while creating new Tasks, backend', error)
  }
})
module.exports = taskRouter
