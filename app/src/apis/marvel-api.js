const requestHelper = require('../helpers/request-helper')
const apiHelper = require('../helpers/marvel-api-helper')

const get = async (limit, offset) => {
  const queryString = apiHelper.getQueryString(`limit=${limit}&offset=${offset}`)

  const result = await requestHelper.get('/characters', queryString)
  
  return result
}

const getById = async (id) => {
  const queryString = apiHelper.getQueryString()

  const result = await requestHelper.get(`/characters/${id}`, queryString)

  return result.results[0]
}

module.exports = {
  get,
  getById
}

