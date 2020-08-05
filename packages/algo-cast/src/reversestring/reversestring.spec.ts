/* eslint-disable @typescript-eslint/explicit-function-return-type */
import reverse from './index'

describe('reversestring', () => {
  test('Reverse function exists', () => {
    expect(reverse).toBeDefined()
  })

  describe('Reverse reverses a string', () => {
    test('`abcd` => `dcba`', () => {
      expect(reverse('abcd')).toEqual('dcba')
    })

    test('`apple` => `elppa`', () => {
      expect(reverse('apple')).toEqual('elppa')
    })

    test('`Greetings!` => `olleh`', () => {
      expect(reverse('Greetings!')).toEqual('!sgniteerG')
    })

    test('`hello` => `olleh`', () => {
      expect(reverse('hello')).toEqual('olleh')
    })

    test('`  abcd` => `dcba  `', () => {
      expect(reverse('  abcd')).toEqual('dcba  ')
    })
  })
})
