/*
  functions:
  every function is a single-value collection of pairs
  input = domain
  output = range

  1) Total
  2) Deterministic
  3) No Observable Side-Effects
*/

/**
 * 1) Total
 * a fn is `total` if for every input there is a corresponding output
 */
function incNotTot(i: number): 1 | 2 | 3 | undefined {
  if (i === 0) return 1
  if (i === 1) return 2
  if (i === 2) return 3
}

/* not Total  fn*/
incNotTot(0) // 1
incNotTot(1) // 2
incNotTot(2) // 3
incNotTot(3) // undefined

function incTot2(i: number): 1 | 2 | 3 | 100 {
  if (i === 0) return 1
  if (i === 1) return 2
  if (i === 2) return 3
  return 100
}

/* Total  fn*/
incTot2(0) // 1
incTot2(1) // 2
incTot2(2) // 3
incTot2(3) // 100

function incTot(i: number): number {
  return i + 1
}
/* Total fn */
incTot(0) // 1
incTot(1) // 2
incTot(2) // 3
incTot(3) // 4

/**
 * 2) Deterministic
 * a function is deterministic if given a same input it will always return the same output
 */

/* not deterministic fn */
function timeSince(comment: {
  createdAt: string
  [key: string]: unknown
}): { days: number; hours: number; minutes: number; seconds: number } {
  const now = new Date()
  const then = new Date(comment.createdAt)
  return getDifference(now, then)
}

/* deterministic fn */
function getDifference(
  now: Date,
  then: Date
): { days: number; hours: number; minutes: number; seconds: number } {
  const days = Math.abs(now.getDate() - then.getDate())
  const hours = Math.abs(now.getHours() - then.getHours())
  const minutes = Math.abs(now.getMinutes() - then.getMinutes())
  const seconds = Math.abs(now.getSeconds() - then.getSeconds())
  return { days, hours, minutes, seconds }
}

// deterministic: given same input, it will return the same output!
const now = new Date('01/31/2020')
const then = new Date('01/01/2020')
getDifference(now, then) // { days: 30, hours: 0, minutes: 0, seconds: 0 }
getDifference(now, then) // { days: 30, hours: 0, minutes: 0, seconds: 0 }

// not deterministic since the two output are different
timeSince({ createdAt: now.toString() }) // { days: 30, hours: 0, minutes: 0, seconds: 0 }
timeSince({ createdAt: now.toString() }) // { days: 30, hours: 0, minutes: 0, seconds: 1 }

/**
 * 3) no Observable side effects
 */

function addWithSideEffects(x: number, y: number): number {
  console.log(`Adding ${x} ${y}`) // <- side effect
  return x + y
}

function addPure(x: number, y: number): { result: number; log: string } {
  return {
    result: x + y,
    log: `Adding ${x} ${y}`,
  }
}

addWithSideEffects(1, 2) // 3 , will also console.log 'Adding 1 2'
addPure(1, 2) // { result: 3, log: 'Adding 1 2' }

/*  FUNCTION, NOT A FUNCTION? */

const xs1: number[] = [1, 2, 3, 4, 5]
const xs2 = [1, 2, 3, 4, 5] as const
// not a function
xs1.splice(0, 3) // [1,2,3]
xs1.splice(0, 3) // [4,5]
xs1.splice(0, 3) // []

// function
xs2.slice(0, 3) // [ 1, 2, 3 ]
xs2.slice(0, 3) // [ 1, 2, 3 ]
xs2.slice(0, 3) // [ 1, 2, 3 ]

// not a function (throws an error)
function toSlug1(title: string): string | undefined {
  const urlFriendly = title.replace(/\W+/gi, '--')
  if (urlFriendly.length < 1) {
    throw new Error('this is bad')
  }
  return urlFriendly
}

// a function (even thought it might error, the error is return as a value and not thrown)
function toSlug2(title: string): Promise<string> {
  return new Promise((res, rej) => {
    const urlFriendly = title.replace(/\W+/gi, '--')
    if (urlFriendly.length < 1) {
      return rej(new Error('is bad'))
    }
    return res(urlFriendly)
  })
}

// a fn
toSlug2('https://frontendmasters.com/courses/hardcore-js-v2/pure-functions-checklist/') // then https--frontendmasters--com--courses--hardcore--js--v2--pure--functions--checklist--

toSlug2('') // catch Error: is bad

// vs

// not a fn
toSlug1('https://frontendmasters.com/courses/hardcore-js-v2/pure-functions-checklist/') // https--frontendmasters--com--courses--hardcore--js--v2--pure--functions--checklist--

// @ts-ignore
toSlug1('') // this fn throws and will bring the containing process down

// not a fn
type User = { age: number }
function birthday(user: User): User {
  user.age += 1 // user is an object, passed by reference, hence, this fn is modifying an external variable
  return user
}

// a fn
function shout(word: string): string {
  return word.toUpperCase().concat('!')
}

// not a fn
function headerText(header_selector: 'string'): string {
  /**
   * issue:
   * same header selector will match match different nodes depending on the execution context
   *  definitely not pure!
   */
  return document.querySelector(header_selector).text()
}

// not pure fn
function parseQuery(): string[][] {
  return window.location.search
    .substring(1)
    .split('&')
    .map(x => x.split('='))
}

// a pure fn
const parseQueryString = function (queryString: string) {
  const params = {}
  let queries: string[]
  let temp

  queries = queryString.split('&')

  for (let i = 0, { length } = queries; i < length; i++) {
    temp = queries[i].split('=')
    params[temp[0]] = temp[1]
  }
  return params
}
