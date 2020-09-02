/*
  eslint-disable
  @typescript-eslint/ban-ts-comment,
  @typescript-eslint/no-unused-vars,
  id-length,
  init-declarations,
  jest/no-conditional-expect,
  jest/no-hooks,
  max-lines-per-function,
  max-lines,
  max-statements,
  no-inline-comments,
  no-magic-numbers,
  no-unused-vars,
*/

import { DoublyLinkedList } from './doubly-linked-list'
import type { IDoublyLinkedList } from './doubly-linked-list.interface'

// eslint-disable-next-line jest/lowercase-name
describe('DoublyLinkedList', () => {
  let list: IDoublyLinkedList<number>
  let min: number
  let max: number

  beforeEach(() => {
    list = new DoublyLinkedList<number>()
    min = 1
    max = 3
  })

  function pushesElements() {
    for (let i = min; i <= max; i++) {
      list.push(i)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function verifyNode(current: any, i: number) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(current.element).not.toBeUndefined()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    expect(current.element).toBe(i)

    // Verify next node
    if (i < max) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      expect(current.next).not.toBeUndefined()
      // TS strictNullChecks
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      if (current.next) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        expect(current.next.element).toBe(i + 1)
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      expect(current.next).toBeUndefined()
    }

    // Verify previous node
    if (i > min) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      expect(current.prev).not.toBeUndefined()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      if (current.prev) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        expect(current.prev.element).toBe(i - 1)
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      expect(current.prev).toBeUndefined()
    }
  }

  function verifyList() {
    let current = list.getHead()
    for (let i = min; i <= max; i++) {
      expect(current).not.toBeUndefined()
      // TS strictNullChecks
      if (current) {
        verifyNode(current, i)
        current = current.next
      }
    }
    verifyListFromTail()
  }

  function verifyListFromTail() {
    let current = list.getTail()
    for (let i = max; i >= min; i--) {
      expect(current).not.toBeUndefined()
      // TS strictNullChecks
      if (current) {
        verifyNode(current, i)
        current = current.prev
      }
    }
  }

  it('starts empty', () => {
    expect.hasAssertions()
    expect(list.size()).toBe(0)
    expect(list.isEmpty()).toBe(true)
    expect(list.getHead()).toBeUndefined()
    expect(list.getTail()).toBeUndefined()
  })

  it('pushes elements', () => {
    expect.hasAssertions()
    pushesElements()
    verifyList()
  })

  it('returns element at specific index: invalid position', () => {
    expect.hasAssertions()
    // List is empty
    expect(list.getElementAt(3)).toBeUndefined()
  })

  it('returns element at specific index', () => {
    expect.hasAssertions()
    let node

    pushesElements()

    for (let i = min; i <= max; i++) {
      node = list.getElementAt(i - 1)
      expect(node).not.toBeUndefined()
      if (node) {
        expect(node.element).toBe(i)
      }
    }
  })

  it('inserts elements first position empty list', () => {
    expect.hasAssertions()
    const element = 1
    max = element
    expect(list.insert(element, 0)).toBe(true)
    verifyList()
  })

  it('inserts elements first position not empty list', () => {
    expect.hasAssertions()
    max = 2
    expect(list.insert(max, 0)).toBe(true)

    expect(list.insert(min, 0)).toBe(true)

    verifyList()
  })

  it('inserts elements invalid position empty list', () => {
    expect.hasAssertions()
    expect(list.insert(1, 1)).toBe(false)
  })

  it('inserts elements invalid position not empty list', () => {
    expect.hasAssertions()
    const element = 1
    expect(list.insert(element, 0)).toBe(true)
    expect(list.insert(element, 2)).toBe(false)
  })

  it('inserts elements at the end of list', () => {
    expect.hasAssertions()
    max = 5

    for (let i = min; i <= max; i++) {
      expect(list.insert(i, i - 1)).toBe(true)
    }

    verifyList()
  })

  it('inserts elements in the middle of list', () => {
    expect.hasAssertions()
    expect(list.insert(3, 0)).toBe(true)
    expect(list.insert(1, 0)).toBe(true)
    expect(list.insert(2, 1)).toBe(true)
    verifyList()
  })

  it('returns index of elements', () => {
    expect.hasAssertions()
    let index

    pushesElements()

    for (let i = min; i <= max; i++) {
      index = list.indexOf(i)
      expect(index).toBe(i - 1)
    }

    expect(list.indexOf(max + 2)).toBe(-1)
  })

  it('removes invalid elements', () => {
    expect.hasAssertions()
    let element

    pushesElements()

    for (let i = max + 2; i <= max + 4; i++) {
      element = list.remove(i)
      expect(element).toBeUndefined()
    }
  })

  it('removes valid elements', () => {
    expect.hasAssertions()
    let element

    pushesElements()

    for (let i = min; i <= max; i++) {
      element = list.remove(i)
      expect(element).not.toBeUndefined()
      expect(element).toBe(i)
    }
  })

  it('removes element invalid position empty list', () => {
    expect.hasAssertions()
    let element

    for (let i = min; i <= max; i++) {
      element = list.removeAt(i - 1)
      expect(element).toBeUndefined()
    }
  })

  it('removes element invalid position not empty list', () => {
    expect.hasAssertions()
    let element

    pushesElements()

    for (let i = max + 2; i <= max + 4; i++) {
      element = list.removeAt(i)
      expect(element).toBeUndefined()
    }
  })

  it('removes first element list single element', () => {
    expect.hasAssertions()
    const value = 1
    list.push(value)

    const element = list.removeAt(0)
    expect(element).not.toBeUndefined()
    expect(element).toBe(value)

    expect(list.getHead()).toBeUndefined()
    expect(list.getTail()).toBeUndefined()
    expect(list.isEmpty()).toBe(true)
  })

  it('removes first element list multiple elements', () => {
    expect.hasAssertions()
    pushesElements()

    const element = list.removeAt(0)
    expect(element).not.toBeUndefined()
    expect(element).toBe(min)

    min = 2
    verifyList()
  })

  it('removes element from end of list', () => {
    expect.hasAssertions()
    let element

    pushesElements()

    const maxIndex = max
    for (let i = maxIndex; i >= min; i--) {
      element = list.removeAt(i - 1)
      expect(element).not.toBeUndefined()
      expect(element).toBe(i)
      // eslint-disable-next-line no-plusplus
      max--
      verifyList()
    }
  })

  it('removes element from middle of list', () => {
    expect.hasAssertions()
    pushesElements() // 1, 2, 3

    const element = list.removeAt(1) // Element 2
    expect(element).not.toBeUndefined()
    expect(element).toBe(2)

    // List needs to be [1, 3]
    let current = list.getHead()

    // Element 1
    expect(current).not.toBeUndefined()
    if (current) {
      expect(current.element).not.toBeUndefined()
      expect(current.element).toBe(1)
      expect(current.prev).toBeUndefined()
      expect(current.next).not.toBeUndefined()
      if (current.next) {
        expect(current.next.element).toBe(3)
        current = current.next
      }
    }

    // Element 3
    expect(current).not.toBeUndefined()
    if (current) {
      expect(current.element).not.toBeUndefined()
      expect(current.element).toBe(3)
      expect(current.next).toBeUndefined()
      expect(current.prev).not.toBeUndefined()
      if (current.prev) {
        expect(current.prev.element).toBe(1)
      }
    }
  })

  it('returns the head of the list', () => {
    expect.hasAssertions()
    expect(list.getHead()).toBeUndefined()

    list.push(1)
    expect(list.getHead()).not.toBeUndefined()
  })

  it('returns the tail of the list', () => {
    expect.hasAssertions()
    expect(list.getTail()).toBeUndefined()

    list.push(1)
    expect(list.getTail()).not.toBeUndefined()
  })

  it('returns the correct size', () => {
    expect.hasAssertions()
    expect(list.size()).toBe(0)

    for (let i = min; i <= max; i++) {
      list.push(i)
      expect(list.size()).toBe(i)
    }

    const size = max
    for (let i = min; i <= max; i++) {
      list.remove(i)
      expect(list.size()).toBe(size - i)
    }

    expect(list.size()).toBe(0)
  })

  it('returns if it is empty', () => {
    expect.hasAssertions()
    expect(list.isEmpty()).toBe(true)
    for (let i = min; i <= max; i++) {
      list.push(i)
      expect(list.isEmpty()).toBe(false)
    }

    for (let i = min; i < max; i++) {
      list.remove(i)
      expect(list.isEmpty()).toBe(false)
    }
    list.remove(max)
    expect(list.isEmpty()).toBe(true)

    pushesElements()
    expect(list.isEmpty()).toBe(false)

    list.clear()
    expect(list.isEmpty()).toBe(true)
  })

  it('clears the list', () => {
    expect.hasAssertions()
    expect(list.size()).toBe(0)
    list.clear()
    expect(list.size()).toBe(0)
    pushesElements()
    expect(list.size()).toBeGreaterThan(0)
    list.clear()
    expect(list.size()).toBe(0)
  })

  class MyObj<T> {
    // eslint-disable-next-line no-useless-constructor
    public constructor(
      public el1: T & { toString(): string },
      public el2: T & { toString(): string }
    ) {}

    public toString() {
      return `${this.el1.toString()}|${this.el2.toString()}`
    }
  }
  it('returns toString primitive types', () => {
    expect.hasAssertions()
    expect(list.toString()).toBe('')

    list.push(1)
    expect(list.toString()).toBe('1')

    list.push(2)
    expect(list.toString()).toBe('1,2')

    list.clear()
    expect(list.toString()).toBe('')
  })

  it('returns toString primitive types: string', () => {
    expect.hasAssertions()
    const ds = new DoublyLinkedList<string>()
    ds.push('el1')
    expect(ds.toString()).toBe('el1')

    ds.push('el2')
    expect(ds.toString()).toBe('el1,el2')
  })

  it('returns toString objects', () => {
    expect.hasAssertions()
    const ds = new DoublyLinkedList<MyObj<number>>()
    expect(ds.toString()).toBe('')

    ds.push(new MyObj(1, 2))
    expect(ds.toString()).toBe('1|2')

    ds.push(new MyObj(3, 4))
    expect(ds.toString()).toBe('1|2,3|4')
  })

  it('returns inverseToString primitive types', () => {
    expect.hasAssertions()
    expect(list.inverseToString()).toBe('')

    list.push(1)
    expect(list.inverseToString()).toBe('1')

    list.push(2)
    expect(list.inverseToString()).toBe('2,1')

    list.clear()
    expect(list.inverseToString()).toBe('')
  })

  it('returns inverseToString primitive types: string', () => {
    expect.hasAssertions()
    const ds = new DoublyLinkedList<string>()
    ds.push('el1')
    expect(ds.inverseToString()).toBe('el1')

    ds.push('el2')
    expect(ds.inverseToString()).toBe('el2,el1')
  })

  it('returns inverseToString objects', () => {
    expect.hasAssertions()
    const ds = new DoublyLinkedList<MyObj<number>>()
    expect(ds.inverseToString()).toBe('')

    ds.push(new MyObj(1, 2))
    expect(ds.inverseToString()).toBe('1|2')

    ds.push(new MyObj(3, 4))
    expect(ds.inverseToString()).toBe('3|4,1|2')
  })
})
