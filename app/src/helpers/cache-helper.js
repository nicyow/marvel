const Redis = require('ioredis')
const logHelper = require('./log-helper')

let redis

const init = () => {
  redis = new Redis({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD
  })
}

const key = 'marvel-characters'

const getIds = async () => {
  try {
    return await redis.hkeys(key)
  } catch (error) {
    logHelper.error(error)
  }

  return []
}

const get = async (id) => {
  try {
    const data = await redis.hget(key, id)

    return JSON.parse(data)
  } catch (error) {
    logHelper.error(error)
  }

  return null
}

const set = async (value) => {
  try {
    await redis.hset(key, value.id, JSON.stringify(value))

    return true
  } catch (error) {
    logHelper.error(error)
  }

  return false
}

module.exports = {
  init,
  getIds,
  get,
  set
}
