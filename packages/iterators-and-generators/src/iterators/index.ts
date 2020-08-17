import { makeDragons } from '../index'

const dragonArmy = {
  [Symbol.iterator]: () => {
    return {
      next: () => {
        const enoughDragonsSpawned = Math.random() > 0.7
        if (!enoughDragonsSpawned) {
          return { value: makeDragons(), done: false }
        }
        return { done: true }
      },
    }
  },
}

dragonArmy[Symbol.iterator]() //?

for (const dragon of dragonArmy) {
  dragon //?
}
