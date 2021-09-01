require('dotenv').config()
const express = require('express')
const router = require('./routers')
const logHelper = require('./helpers/log-helper')
const dateHelper = require('./helpers/date-helper')
const cacheHelper = require('./helpers/cache-helper')

const logRequest = (req, _, next) => {
  const { method, url } = req;

  logHelper.info(`${dateHelper.getTimestamp()}: [${method}] ${url}`)
  
  next()
}

const errorHandler = (error, _, res, __) => {
  logHelper.error(`${dateHelper.getTimestamp()}: ${error.stack}`)

  res.status(500).send('Service unavailable, please try again later.')
}

cacheHelper.init()

const app = express()

app.use(logRequest)
app.use('/characters', router.characterRouter)
app.use('/swagger', router.swaggerRouter)
app.use(errorHandler)

app.listen(process.env.APP_PORT, () => {
  logHelper.info(`The app listening at http://localhost:${process.env.APP_PORT}`)
})