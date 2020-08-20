/*
  eslint-disable
  @typescript-eslint/ban-ts-comment,
  @typescript-eslint/no-unused-vars,
  init-declarations,
  max-lines-per-function,
  max-statements,
  no-unused-vars,
  jest/no-conditional-expect,
  max-lines,
  jest/no-hooks,
*/

import { LinkedList } from './linked-list'
import type { ILinkedList, ILinkedListNode } from './linked-list.interface'

describe('data structure - LinkedList', () => {
  let list: ILinkedList<number>
  let min: number
  let max: number

  function defaultEquals<T>(x: T, y: T): boolean {
    return x === y
  }

  function strickEquality<T>(x: T, y: T): boolean {
    return Object.is(x, y)
  }

  beforeEach(() => {
    // FIXME: add proper linked list class
    list = new LinkedList<number>()
    min = 1
    max = 3
  })

  function pushesElements(): void {
    for (let i = min; i <= max; i++) {
      list.push(i)
    }
  }

  function verifyList(): void {
    let current = list.getHead()
    for (let i = min; i <= max && current; i++) {
      expect(current).not.toBeUndefined()
      if (current) {
        // @ts-expect-error
        expect(current.element).not.toBeUndefined()
        // @ts-expect-error
        expect(current.element).toStrictEqual(i)
        if (i < max) {
          expect(current.next).not.toBeUndefined()
          if (current.next) {
            // @ts-expect-error
            expect(current.next.element).toStrictEqual(i + 1)
          }
        } else {
          expect(current.next).toBeUndefined()
        }
        current = current.next
      }
    }
  }

  it('should be a function', () => {
    expect.hasAssertions()
    expect(typeof LinkedList).toBe('function')
  })

  it('should allow to instantiate empty', () => {
    expect.hasAssertions()
    expect(list).toBeInstanceOf(LinkedList)
    expect(list.size()).toBe(0)
    expect(list.isEmpty()).toBe(true)
    expect(list.getHead()).toBeUndefined()
  })

  it('should allow to instantiate with a custom comparison function', () => {
    expect.hasAssertions()
    list = new LinkedList<number>(strickEquality)

    expect(list).toBeInstanceOf(LinkedList)
    expect(list.size()).toBe(0)
    expect(list.isEmpty()).toBe(true)
    expect(list.getHead()).toBeUndefined()
  })

  // eslint-disable-next-line jest/expect-expect, jest/prefer-expect-assertions
  it('pushes elements', () => {
    pushesElements()
    verifyList()
  })

  it('returns element at specific index: invalid position', () => {
    // List is empty
    expect.hasAssertions()
    expect(list.getElementAt(3)).toBeUndefined()
  })

  it('returns element at specific index', () => {
    expect.hasAssertions()
    let node: undefined | ILinkedListNode<number>

    pushesElements()

    for (let i = min; i <= max; i++) {
      node = list.getElementAt(i - 1)
      expect(node).not.toBeUndefined()
      if (node) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(node.element).toStrictEqual(i)
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

  it('inserts elements in the middle of list', () => {
    expect.hasAssertions()
    expect(list.insert(3, 0)).toBe(true)
    expect(list.insert(1, 0)).toBe(true)
    expect(list.insert(2, 1)).toBe(true)
    verifyList()
  })

  it('inserts elements at the end of list', () => {
    expect.hasAssertions()
    max = 5

    for (let i = min; i <= max; i++) {
      expect(list.insert(i, i - 1)).toBe(true)
    }

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

  it('removes invalid elements', () => {
    expect.hasAssertions()
    let element

    pushesElements()

    for (let i = max + 2; i <= max + 4; i++) {
      element = list.remove(i)
      expect(element).toBeUndefined()
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
    }
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
      max--
      verifyList()
    }
  })

  it('returns the head of the list', () => {
    expect.hasAssertions()
    expect(list.getHead()).toBeUndefined()

    list.push(1)
    expect(list.getHead()).not.toBeUndefined()
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
    const ds = new LinkedList<string>()
    ds.push('el1')
    expect(ds.toString()).toBe('el1')

    ds.push('el2')
    expect(ds.toString()).toBe('el1,el2')
  })

  it('returns toString objects', () => {
    expect.hasAssertions()
    class MyObj {
      public el1: any

      public el2: any

      constructor(el1: any, el2: any) {
        this.el1 = el1
        this.el2 = el2
      }

      toString() {
        return `${this.el1.toString()}|${this.el2.toString()}`
      }
    }
    const ds = new LinkedList<MyObj>()
    expect(ds.toString()).toBe('')

    ds.push(new MyObj(1, 2))
    expect(ds.toString()).toBe('1|2')

    ds.push(new MyObj(3, 4))
    expect(ds.toString()).toBe('1|2,3|4')
  })
})
