const api = require('../marvel-api')
const requestHelper = require('../../helpers/request-helper')
const marvelApiHelper = require('../../helpers/marvel-api-helper')

describe('#marvel-api', () => {
  const mockQueryString = 'querystring'

  beforeAll(() => {
    marvelApiHelper.getQueryString = jest.fn().mockReturnValue(mockQueryString)
  })

  describe('#get', () => {
    const mockResponse = [{ id: '1' }]

    beforeEach(() => {
      requestHelper.get = jest.fn().mockResolvedValue(mockResponse)
    })

    it('call params and response structure', async () => {
      const result = await api.get(0, 0)

      expect(requestHelper.get).toHaveBeenCalledWith('/characters', mockQueryString)
      expect(result).toEqual(mockResponse)
    })
  })
  
  describe('#getById', () => {
    const mockResponseFirstElement = { id: '1' }
    const mockResponse = { results: [mockResponseFirstElement]}

    beforeEach(() => {
      requestHelper.get = jest.fn().mockResolvedValue(mockResponse)
    })

    it('call params and response structure', async () => {
      const id = 1
      const result = await api.getById(id)

      expect(requestHelper.get).toHaveBeenCalledWith(`/characters/${id}`, mockQueryString)
      expect(result).toEqual(mockResponseFirstElement)
    })
  })
})

