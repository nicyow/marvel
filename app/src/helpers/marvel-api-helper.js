const dateHelper = require('../helpers/date-helper')
const cryptoHelper = require('../helpers/crypto-helper')

const getQueryString = (query = null) => {
  const timestamp = dateHelper.getTimestamp()

  const hash = cryptoHelper.md5(`${timestamp}${process.env.MARVEL_PRIVATE_KEY}${process.env.MARVEL_PUBLIC_KEY}`)

  let queryString = `?ts=${timestamp}&apikey=${process.env.MARVEL_PUBLIC_KEY}&hash=${hash}`

  if (query) {
    queryString += `&${query}`
  }

  return queryString
}

module.exports = {
  getQueryString
}