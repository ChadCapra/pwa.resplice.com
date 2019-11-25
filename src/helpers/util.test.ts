import { toDictionary, omit } from './utils'

test('toDictionary', () => {
  const arr = [
    {
      uuid: '1',
      name: 'test'
    },
    {
      uuid: '2',
      name: 'test2'
    }
  ]
  const dictionary = {
    '1': {
      uuid: '1',
      name: 'test'
    },
    '2': {
      uuid: '2',
      name: 'test2'
    }
  }

  expect(toDictionary('uuid', arr)).toEqual(dictionary)
})

test('omit', () => {
  const dictionary = {
    '1': {
      uuid: '1',
      name: 'test'
    },
    '2': {
      uuid: '2',
      name: 'test2'
    }
  }
  const newDictionary = {
    '1': {
      uuid: '1',
      name: 'test'
    }
  }

  expect(omit('2', dictionary)).toEqual(newDictionary)
})
