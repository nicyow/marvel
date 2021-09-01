const crypto = require('crypto')

const md5 = value => {  
  return crypto.createHash('md5').update(value).digest("hex")
}

module.exports = {
  md5
}