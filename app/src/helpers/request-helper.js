const axios = require('axios')
const logHelper = require('../helpers/log-helper')

const instance = axios.create({
  baseURL: process.env.MARVEL_URL,
  timeout: 60000
});

instance.interceptors.request.use(request => {
  logHelper.info(`${Date.now()}: Calling external API ${request.baseURL}${request.url}`)
  return request
})

instance.interceptors.response.use(response => {
  logHelper.info(`${Date.now()}: External API response`)
  return response.data.data
})

const get = async (url, queryString) => {
  try {
    return await instance.get(`${url}${queryString}`)
  } catch (error) {
    throw new Error(`[API ERROR]: ${error.stack}`)
  }
}

module.exports = {
  get
}