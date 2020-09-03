/*
  eslint-disable
  capitalized-comments,
  max-lines-per-function,
  max-statements,
  no-inline-comments,
*/

import assert from 'assert'

import { LinkedList, Node } from './linked-list-old'

// ------------------ examples-----------------
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars

export const main = (): void => {
  // construct LinkedList
  const testLinkedList = new LinkedList<number>()
  testLinkedList.insert(10)

  // isHead()
  const { head } = testLinkedList
  assert.strictEqual(testLinkedList.isHead(head!), true)

  assert.deepStrictEqual(testLinkedList.head, new Node(10, null)) // => Node { value: 10, next: null }

  assert.deepStrictEqual(testLinkedList.tail, new Node(10, null)) // => Node { value: 10, next: null }
  assert.strictEqual(testLinkedList.length, 1) // => 1


  // insert(value)
  testLinkedList.insert(11)

  assert.deepStrictEqual(
    testLinkedList.head,
    new Node(10).setNext(new Node(11))
  ) // => Node { value: 10, next: { value: 11, next: null } }
  const node11 = testLinkedList.tail
  assert.deepStrictEqual(node11, new Node(11)) // => Node { value:11, next :null }
  assert.strictEqual(testLinkedList.length, 2) // => 2

  testLinkedList.insert(12)
  assert.strictEqual(testLinkedList.length, 3) // => 3


  // removeTail()
  assert.strictEqual(testLinkedList.removeTail(), 12) // => 12
  assert.deepStrictEqual(testLinkedList.tail, new Node(11, null)) // => Node { value: 11, next: null }
  assert.strictEqual(testLinkedList.length, 2) // => 2


  // contains(value)
  assert.strictEqual(testLinkedList.contains(10), true) // => true
  assert.strictEqual(testLinkedList.contains(87), false) // => false
  assert.strictEqual(testLinkedList.contains(11), true) // => true


  // remove(value)
  testLinkedList.insert(13) // {[10] -> [11] -> [13]}
  assert.deepStrictEqual(testLinkedList.tail, new Node(13, null)) // =>  Node { _value: 13, _next: null }

  testLinkedList.insert(14) // {[10] -> [11] -> [13] -> [14]}
  const node14 = testLinkedList.tail // =>  Node { _value: 14, _next: null }
  assert.strictEqual(testLinkedList.remove(node14!), 14) // => 14
  assert.deepStrictEqual(testLinkedList.tail, new Node(13, null)) // => Node { _value: 13, _next: null }

  assert.strictEqual(
    testLinkedList.toString(),
    JSON.stringify(
      {
        _head: {
          _value: 10,
          _next: {
            _value: 11,
            _next: {
              _value: 13,
              _next: null,
            },
          },
        },
        _tail: {
          _value: 13,
          _next: null,
        },
        _length: 3,
      },
      null,
      2
    )
  ) // {[10] -> [11] -> [13]}

  assert.strictEqual(testLinkedList.remove(node11!), 11) // => 11
  assert.strictEqual(
    testLinkedList.toString(),
    JSON.stringify(
      {
        _head: {
          _value: 10,
          _next: {
            _value: 13,
            _next: null,
          },
        },
        _tail: {
          _value: 13,
          _next: null,
        },
        _length: 2,
      },
      null,
      2
    )
  ) // {[10] -> [11] -> [13]}

  for (const el of testLinkedList) {
    console.log(el)
  }
}
