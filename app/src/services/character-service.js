const marvelApi = require('../apis/marvel-api')
const cacheHelper = require('../helpers/cache-helper')

const get = async () => {
  const ids = await cacheHelper.getIds()

  if (ids.length > 0) {
    return ids
  }

  let characters = []
  let offset = 0
  let isStop = false

  while (!isStop) {
    let result = await marvelApi.get(process.env.MARVEL_CHARACTERS_ENDPOINT_LIMIT, offset)
    
    offset += result.count
    characters = characters.concat(result.results)

    isStop = offset >= result.total
  }

  await Promise.all(characters.map(async (character) => {
    await cacheHelper.set(character)
  }))

  return await cacheHelper.getIds()
}

const getById = async (id) => {
  const data = await cacheHelper.get(id)

  if (data) {
    return data
  }

  const result = await marvelApi.getById(id)

  return result
}

module.exports = {
  get,
  getById
}