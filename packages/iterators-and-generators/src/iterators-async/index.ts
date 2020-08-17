/* eslint-disable no-undef */
import { createStoreAsync } from '../index'

const store = createStoreAsync() //?

interface Customer {
  name: string
  food: undefined | string[]
}

const customers: Iterable<{ name: string; food: string[] }> = {
  [Symbol.iterator]: function() {
    let i = 0
    return {
      next: async function() {
        i++
        let customer = await store.get('customer', i)
        if (!customer) {
          return { done: true }
        }
        const customerFood = await store.get('food', i)

        return {
          value: { ...customer, food: customerFood },
          done: false,
        }
      },
    }
  },
}
;(async function f() {
  const iterator = customers[Symbol.iterator]() //?
  const customer1 = (await iterator.next()).value //?
  // for await (const customer of customers) {
  //   console.log(customer) //?
  // }
})().catch(e => console.error(e))
