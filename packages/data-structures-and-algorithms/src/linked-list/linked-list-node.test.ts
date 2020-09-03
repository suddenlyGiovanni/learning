/*
  eslint-disable
  max-lines-per-function,
  max-statements,
  @typescript-eslint/ban-ts-comment
*/

import type { ILinkedListNode } from '../interfaces/linked-list.interface'

import { Node } from './linked-list-node'

describe('linked List `Node` class', () => {
  const setProperty = <T>(node: ILinkedListNode<T>) => (
    data: T
  ): ILinkedListNode<T> => {
    node.element = data
    return node
  }

  const concatNodes = <T>(
    node1: ILinkedListNode<T>,
    node2: ILinkedListNode<T>
  ): ILinkedListNode<T> => {
    node1.next = node2
    return node1
  }

  it('should be initialize with any data type', () => {
    expect.hasAssertions()
    const number = 1
    const string = 'string'
    const object = {}
    const array: unknown[] = []
    const fn = <A>(a: A): A => a
    const map = new Map()
    const set = new Set()

    const numberNode = new Node(number)
    expect(numberNode).toBeInstanceOf(Node)
    expect(numberNode.next).toBeNull()
    expect(typeof numberNode.element).toBe('number')
    expect(numberNode.element).toBe(number)

    const stringNode = new Node(string)
    expect(stringNode).toBeInstanceOf(Node)
    expect(stringNode.next).toBeNull()
    expect(typeof stringNode.element).toBe('string')
    expect(stringNode.element).toBe(string)

    const objectNode = new Node(object)
    expect(objectNode).toBeInstanceOf(Node)
    expect(objectNode.next).toBeNull()
    expect(typeof objectNode.element).toBe('object')
    expect(objectNode.element).toBe(object)

    const arrayNode = new Node(array)
    expect(arrayNode).toBeInstanceOf(Node)
    expect(arrayNode.next).toBeNull()
    expect(typeof arrayNode.element).toBe('object')
    expect(Array.isArray(arrayNode.element)).toBe(true)
    expect(arrayNode.element).toBe(array)

    const fnNode = new Node(fn)
    expect(fnNode).toBeInstanceOf(Node)
    expect(fnNode.next).toBeNull()
    expect(typeof fnNode.element).toBe('function')
    expect(fnNode.element).toBe(fn)

    const mapNode = new Node(map)
    expect(mapNode).toBeInstanceOf(Node)
    expect(mapNode.next).toBeNull()
    expect(mapNode.element).toBeInstanceOf(Map)
    expect(mapNode.element).toBe(map)

    const setNode = new Node(set)
    expect(setNode).toBeInstanceOf(Node)
    expect(setNode.next).toBeNull()
    expect(setNode.element).toBeInstanceOf(Set)
    expect(setNode.element).toBe(set)

    const nullNode = new Node(null)
    expect(nullNode).toBeInstanceOf(Node)
    expect(nullNode.next).toBeNull()
    expect(
      typeof nullNode.element === 'object' && nullNode.element === null
    ).toBe(true)
    expect(nullNode.element).toBeNull()

    const undefinedNode = new Node(undefined)
    expect(undefinedNode).toBeInstanceOf(Node)
    expect(undefinedNode.next).toBeNull()
    expect(typeof undefinedNode.element).toBe('undefined')
    expect(undefinedNode.element).toBeUndefined()
  })

  it('should allow to setting of data property after initialization', () => {
    expect.hasAssertions()

    const numberNode = new Node(0)
    const stringNode = new Node('one')

    const setNumberDataProperty = setProperty(numberNode)
    expect(setNumberDataProperty(1).element).toBe(1)
    expect(setNumberDataProperty(2).element).toBe(2)
    expect(
      /* Ts will yell at you for modifying the data type but the run time will not complain */
      // @ts-expect-error
      setNumberDataProperty('string').element
    ).toBe('string')

    const setStringDataProperty = setProperty(stringNode)
    expect(setStringDataProperty('two').element).toBe('two')
  })

  it('should allow to set a new next node', () => {
    expect.hasAssertions()

    const nodeA = new Node('A')
    const nodeB = new Node('B')
    const nodeC = new Node('C')

    expect(nodeA.next).toBeUndefined()
    expect(nodeB.next).toBeUndefined()
    expect(nodeC.next).toBeUndefined()

    expect(concatNodes(nodeA, nodeB).next).toBeInstanceOf(Node)
    expect(concatNodes(nodeA, nodeB).next).toBe(nodeB)
    expect(concatNodes(nodeB, nodeC).next).toBe(nodeC)
    expect(nodeA.next?.next).toBe(nodeC)
  })

  it('should allow to un-set a new next node', () => {
    expect.hasAssertions()

    const nodeA = new Node('A')
    const nodeB = new Node('B')
    const nodeC = new Node('C')

    expect(nodeA.next).toBeUndefined()
    expect(nodeB.next).toBeUndefined()
    expect(nodeC.next).toBeUndefined()
    concatNodes(nodeA, concatNodes(nodeB, nodeC))
    expect(nodeA.next?.next).toBe(nodeC)

    nodeB.next = undefined
    expect(nodeB.next).toBeUndefined()
    expect(nodeA.next?.next).toBeUndefined()
  })
})
