const controller = require('../character-controller')
const service = require('../../services/character-service')

const mockNext = (e) => { return e }
const mockSend = () => { }

describe('#get', () => {
  let res = {}

  beforeEach(() => {
    service.get = jest.fn().mockResolvedValue(['1', '2'])
    res.send = jest.fn().mockImplementation(mockSend)
  })

  it('parse string to int', async () => {
    await controller.get(null, res, mockNext)
    expect(res.send).toHaveBeenCalledWith([1, 2])
  })
})

describe('#getById', () => {
  let res = {}
  const req = {
    params: {
      id: '1'
    }
  }

  beforeEach(() => {
    service.getById = jest.fn().mockResolvedValue({ id: '1', name: 'name', description: 'description' })
    res.send = jest.fn().mockImplementation(mockSend)
  })

  it('transform data into proper structure', async () => {
    await controller.getById(req, res, mockNext)
    expect(res.send).toHaveBeenCalledWith({ Id: 1, Name: 'name', Description: 'description' })
  })
})