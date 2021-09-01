const helper = require('../marvel-api-helper')
const dateHelper = require('../date-helper')
const cryptoHelper = require('../crypto-helper')

describe('#getQueryString', () => {
  const mockTimestamp = 1
  const mockHashValue = 'hashstring'
  const publicKey = 'public_key'
  const privateKey = 'private_key'

  beforeEach(() => {
    process.env = {
      MARVEL_PUBLIC_KEY: publicKey,
      MARVEL_PRIVATE_KEY: privateKey
    }
    dateHelper.getTimestamp = jest.fn().mockReturnValue(mockTimestamp)
    cryptoHelper.md5 = jest.fn().mockReturnValue(mockHashValue)
  })

  it('query string without params', () => {
    expect(helper.getQueryString()).toBe(`?ts=${mockTimestamp}&apikey=${publicKey}&hash=${mockHashValue}`)
  })

  it('query string with params', () => {
    const param = "limit=100&offset=0"

    expect(helper.getQueryString(param)).toBe(`?ts=${mockTimestamp}&apikey=${publicKey}&hash=${mockHashValue}&${param}`)
  })
})