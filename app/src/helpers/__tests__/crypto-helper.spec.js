const helper = require('../crypto-helper')

describe('#md5', () => {
  it('generate md5', () => {
    expect(helper.md5('randomhash')).toBe('30e11a2462e87e5733b5956fb34cdcf1')
  })
})