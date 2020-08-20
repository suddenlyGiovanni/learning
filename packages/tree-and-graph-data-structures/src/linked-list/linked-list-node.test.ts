/*
  eslint-disable
  max-lines-per-function,
  max-statements,
  @typescript-eslint/ban-ts-comment
*/

import { Node } from './linked-list-node'
import type { ILinkedListNode } from './linked-list.interface'

describe('linked List `Node` class', () => {
  const setProperty = <T>(node: ILinkedListNode<T>) => (
    data: T
  ): ILinkedListNode<T> => {
    node.data = data
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
    expect(typeof numberNode.data).toBe('number')
    expect(numberNode.data).toBe(number)

    const stringNode = new Node(string)
    expect(stringNode).toBeInstanceOf(Node)
    expect(stringNode.next).toBeNull()
    expect(typeof stringNode.data).toBe('string')
    expect(stringNode.data).toBe(string)

    const objectNode = new Node(object)
    expect(objectNode).toBeInstanceOf(Node)
    expect(objectNode.next).toBeNull()
    expect(typeof objectNode.data).toBe('object')
    expect(objectNode.data).toBe(object)

    const arrayNode = new Node(array)
    expect(arrayNode).toBeInstanceOf(Node)
    expect(arrayNode.next).toBeNull()
    expect(typeof arrayNode.data).toBe('object')
    expect(Array.isArray(arrayNode.data)).toBe(true)
    expect(arrayNode.data).toBe(array)

    const fnNode = new Node(fn)
    expect(fnNode).toBeInstanceOf(Node)
    expect(fnNode.next).toBeNull()
    expect(typeof fnNode.data).toBe('function')
    expect(fnNode.data).toBe(fn)

    const mapNode = new Node(map)
    expect(mapNode).toBeInstanceOf(Node)
    expect(mapNode.next).toBeNull()
    expect(mapNode.data).toBeInstanceOf(Map)
    expect(mapNode.data).toBe(map)

    const setNode = new Node(set)
    expect(setNode).toBeInstanceOf(Node)
    expect(setNode.next).toBeNull()
    expect(setNode.data).toBeInstanceOf(Set)
    expect(setNode.data).toBe(set)

    const nullNode = new Node(null)
    expect(nullNode).toBeInstanceOf(Node)
    expect(nullNode.next).toBeNull()
    expect(typeof nullNode.data === 'object' && nullNode.data === null).toBe(
      true
    )
    expect(nullNode.data).toBe(null)

    const undefinedNode = new Node(undefined)
    expect(undefinedNode).toBeInstanceOf(Node)
    expect(undefinedNode.next).toBeNull()
    expect(typeof undefinedNode.data).toBe('undefined')
    expect(undefinedNode.data).toBe(undefined)
  })

  it('should allow to setting of data property after initialization', () => {
    expect.hasAssertions()

    const numberNode = new Node(0)
    const stringNode = new Node('one')

    const setNumberDataProperty = setProperty(numberNode)
    expect(setNumberDataProperty(1).data).toBe(1)
    expect(setNumberDataProperty(2).data).toBe(2)
    expect(
      /* Ts will yell at you for modifying the data type but the run time will not complain */
      // @ts-expect-error
      setNumberDataProperty('string').data
    ).toBe('string')

    const setStringDataProperty = setProperty(stringNode)
    expect(setStringDataProperty('two').data).toBe('two')
  })

  it('should allow to set a new next node', () => {
    expect.hasAssertions()

    const nodeA = new Node('A')
    const nodeB = new Node('B')
    const nodeC = new Node('C')

    expect(nodeA.next).toBeNull()
    expect(nodeB.next).toBeNull()
    expect(nodeC.next).toBeNull()

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

    expect(nodeA.next).toBeNull()
    expect(nodeB.next).toBeNull()
    expect(nodeC.next).toBeNull()
    concatNodes(nodeA, concatNodes(nodeB, nodeC))
    expect(nodeA.next?.next).toBe(nodeC)

    nodeB.next = null
    expect(nodeB.next).toBeNull()
    expect(nodeA.next?.next).toBeNull()
  })
})
