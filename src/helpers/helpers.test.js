import { capitalizeString, getTimeRemaining } from './index'

describe('the helper functions', () => {
  test('capitalizes a string', () => {
    expect(capitalizeString('react')).toBe('React')
    expect(capitalizeString('React')).toBe('React')
    expect(capitalizeString('rEaCt')).toBe('REaCt')
    expect(() => capitalizeString('')).toThrow(
      'Invalid string, must be a non-empty string'
    )
  })

  test('calculates time correctly', () => {
    expect(
      getTimeRemaining(
        new Date('2019-06-30T20:00:00'),
        new Date('2019-06-27T20:00:00')
      )
    ).toBe('3 days')
    expect(
      getTimeRemaining(
        new Date('2019-06-30T20:00:00'),
        new Date('2019-06-29T20:00:00')
      )
    ).toBe('1 day')
    expect(
      getTimeRemaining(
        new Date('2019-06-30T21:09:10'),
        new Date('2019-06-30T20:00:00')
      )
    ).toBe('1 hour')
    expect(
      getTimeRemaining(
        new Date('2019-06-30T21:09:10'),
        new Date('2019-06-30T17:00:00')
      )
    ).toBe('4 hours')
    expect(
      getTimeRemaining(
        new Date('2019-06-30T20:00:10'),
        new Date('2019-06-30T20:00:00')
      )
    ).toBe('less than an hour')
  })
})
