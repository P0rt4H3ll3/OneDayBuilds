const jwt = require('jsonwebtoken')

const tokenExtraktor = (req, res, next) => {
  const header = req.get('authorization')
  if (header && header.startsWith('Bearer ')) {
    const token = header.replace('Bearer ', '')
    req.token = token
  }
  next()
}

const userExtractor = (req, res, next) => {
  const token = req.token
  if (token) {
    const user = jwt.verify(token, process.env.SECRET)
    req.user = user
  }
  next()
}

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  if (request.user) {
    console.log('User:  ', request.user)
    console.log('token:  ', request.token)
  }
  console.log('---')
  next()
}
module.exports = { requestLogger, tokenExtraktor, userExtractor }
