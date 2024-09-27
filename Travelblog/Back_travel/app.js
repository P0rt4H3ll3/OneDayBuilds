const express = require('express')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const holidayRouter = require('./Controllers/holidays')
const userRouter = require('./Controllers/users')
const loginRouter = require('./Controllers/login')
const app = express()

mongoose.set('strictQuery', false)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(`connecting to MONGODB at ${process.env.MONGODB_URI}`)
  })
  .catch((error) => {
    console.log('error connecting to MONGODB')
  })
app.use(express.json())
app.use(cors())
app.use(middleware.tokenExtraktor)
app.use(middleware.userExtractor)
app.use(middleware.requestLogger)
app.use('/api/holidays', holidayRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

module.exports = app
