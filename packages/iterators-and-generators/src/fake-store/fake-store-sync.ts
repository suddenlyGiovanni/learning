import { Customer, Food, Tables } from './types'

interface Store {
  get: (table: 'customer' | 'food', id: number) => Customer | Food
}

export default function createStoreSync(): Store {
  const tables: Tables = {
    customer: {
      1: { name: 'John' },
      2: { name: 'Mattias' },
      3: { name: 'Kim' },
    },
    food: {
      1: ['cake', 'waffle'],
      2: ['coffee'],
      3: ['apple', 'carrot'],
    },
  }

  return {
    get: (table: 'customer' | 'food', id: number) => tables[table][id],
  }
}

const localStore = createStoreSync() //?

const john = localStore.get('customer', 1) //?
