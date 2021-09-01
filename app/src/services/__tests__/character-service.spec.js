const service = require('../character-service')
const marvelApi = require('../../apis/marvel-api')
const cacheHelper = require('../../helpers/cache-helper')

describe('#get', () => {
  describe('using cache', () => {
    const mockCacheData = ['1', '2']

    beforeEach(() => {
      cacheHelper.getIds = jest.fn().mockResolvedValue(mockCacheData)
      cacheHelper.set = jest.fn().mockRejectedValue(new Error('should not call'))
      marvelApi.get = jest.fn().mockRejectedValue(new Error('should not call'))
    })
  
    it('data from cache', async () => {
      const result = await service.get()

      expect(result).toEqual(mockCacheData)
    })
  })
  
  describe('call api', () => {
    const mockData = [{ id: '1' }, { id: '2' }]
    const mockApiResult = { count:2, total:2, results: mockData}

    beforeEach(() => {
      process.env = {
        MARVEL_CHARACTERS_ENDPOINT_LIMIT: 2
      }
      cacheHelper.getIds = jest.fn().mockResolvedValueOnce([]).mockResolvedValueOnce(mockData)
      cacheHelper.set = jest.fn().mockResolvedValue(true)
      marvelApi.get = jest.fn().mockResolvedValue(mockApiResult)
    })
  
    it('data from api', async () => {
      const result = await service.get()

      expect(result).toEqual(mockData)
    })
  })
})

describe('#getById', () => {
  describe('using cache', () => {
    const mockCacheData = { id: '1' }

    beforeEach(() => {
      cacheHelper.get = jest.fn().mockResolvedValue(mockCacheData)
      marvelApi.getById = jest.fn().mockRejectedValue(new Error('should not call'))
    })
  
    it('data from cache', async () => {
      const result = await service.getById(0)

      expect(result).toEqual(mockCacheData)
    })
  })
  
  describe('call api', () => {
    const mockData = { id: '1' }

    beforeEach(() => {
      cacheHelper.get = jest.fn().mockResolvedValue(null)
      marvelApi.getById = jest.fn().mockResolvedValue(mockData)
    })
  
    it('data from api', async () => {
      const result = await service.getById(0)

      expect(result).toEqual(mockData)
    })
  })
})