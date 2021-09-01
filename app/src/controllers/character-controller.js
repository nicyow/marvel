const service = require('../services/character-service')

const get = async (_, res, next) => { 
  try { 
    const results = await service.get()

    res.send(results.map(id => parseFloat(id)))
  } catch (e) {
    next(e)
  }
}

const getById = async (req, res, next) => {
  try {
    const id = req.params.id
  
    const result = await service.getById(id)

    res.send({
      Id: parseInt(result.id),
      Name: result.name,
      Description: result.description
    })
  } catch (e) {
    next(e)
  }
}

module.exports = {
  get,
  getById
}