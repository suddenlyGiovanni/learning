/* eslint-disable no-undef */
import { makeDragons } from '../index'

/*
Just like the old function,
it creates an iterators that the for ... of loop uses to iterate the army.
The generator is the same thing, it's just a slightly terser syntax.
*/
function* someDragons(): Iterator<string> {
  while (true) {
    const enoughDragonsSpawned = Math.random() > 0.7
    if (enoughDragonsSpawned) return
    yield makeDragons()
  }
}

/*
Let me prove it to you by consuming the iterator that the generator creates manually,
instead of using the for ... of loop:
*/

const iterator = someDragons() //?
iterator.next() //?
iterator.next() //?
iterator.next() //?
iterator.next() //?

const dragonArmy: Iterable<string> = {
  [Symbol.iterator]: someDragons,
}

dragonArmy[Symbol.iterator]() //?

for (const dragon of dragonArmy) {
  dragon //?
}

/*
So that's the gist of how generator work, but I really want to go back to my statement
that they are just a thin syntax sugar to create iterators. There is really nothing magical
about them. To demonstrate this, I'm going to rewrite this generator here with a normal function:
*/
;(() => {
  function someDragon(): Iterator<string | undefined> {
    let iteration = -1
    const iterator = {
      next: () => {
        iteration++
        if (iteration === 0) {
          return { value: 'fluffykins the lighting dragon', done: false }
        }
        if (iteration === 1) {
          return { value: 'waffle the time dragon', done: false }
        }
        if (iteration === 2) {
          if (Math.random() < 0.5) {
            return { value: 'hardy the dog', done: true }
          }
        }
        return { value: undefined, done: true }
      },
    }
    return iterator
  }

  const iterator = someDragons()
  iterator.next() //?
  iterator.next() //?
  iterator.next() //?
  iterator.next() //?
})()
