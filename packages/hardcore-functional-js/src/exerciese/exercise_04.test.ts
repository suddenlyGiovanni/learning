import { Right, Left, fromNullable, tryCatch } from '../either/either'
import { identity } from "../functor/functor"

const trace = <T>(x: T): T => {
  console.log(x)
  return x
}

type User = { address?: { street?: { name?: string } } }

// Exercise: Either
// Goal: Refactor each example using Either
// Bonus: no curlies
// =========================

// Ex1: Refactor streetName to use Either instead of nested if's
// =========================
const _street = (user: User) => {
  const address = user.address
  if (address) {
    return address.street
  } else {
    return 'no street'
  }
}

const street = (user: User) => {
  return fromNullable(user.address)
    .map(address => address.street)
    .fold(() => 'no street', identity)
} //?

test('Ex1: street', () => {
  const user: User = { address: { street: { name: 'Willow' } } }
  // reference
  expect(_street(user)).toEqual({ name: 'Willow' })
  expect(_street({})).toBe('no street')

  // either refactor
  expect(street(user)).toEqual({ name: 'Willow' })
  expect(street({})).toBe('no street')
})

// Ex1: Refactor streetName to use Either instead of nested if's
// =========================
const _streetName = (user: User): string => {
  const address = user.address

  if (address) {
    const street = address.street

    if (street) {
      return street.name
    }
  }

  return 'no street'
}

const streetName = (user: User): 'no street' | string =>
  fromNullable(user.address) // Left<unknown> | Right<{ street?: { name: string | null } }>
    .chain(address => fromNullable(address.street)) // Left<Left<unknown>> | Right<Right<{ street?: { name: string | null } }>>
    .map(street => street.name)
    .fold(() => 'no street', identity)

test('Ex1: streetName', () => {
  const user: User = { address: { street: { name: 'Willow' } } }
  /*  reference */
  expect(_streetName(user)).toBe('Willow')
  expect(_streetName({})).toBe('no street')
  // @ts-expect-error
  expect(_streetName({ address: { street: null } })).toBe('no street')

  /*  implementation */
  expect(streetName(user)).toBe('Willow')
  expect(streetName({})).toBe('no street')
  // @ts-expect-error
  expect(streetName({ address: { street: null } })).toBe('no street')
})

// Ex2: Refactor parseDbUrl to return an Either instead of try/catch
// =========================

type PostgresUrl = string
type PostgresHost = string
type PostgresPort = string
type PostgresDatabase = string
type PostgressParameters = [PostgresUrl, PostgresHost, PostgresPort, PostgresDatabase]
const DB_REGEX = /postgres:\/\/([^:]+):([^@]+)@.*?\/(.+)$/i
const _parseDbUrl = (cfg: string): PostgressParameters | null => {
  try {
    const c = JSON.parse(cfg) // throws if it can't parse
    return c.url.match(DB_REGEX)
  } catch (e) {
    return null
  }
}

const parseDbUrl = (cfg: string): null | PostgressParameters =>
  new Right(cfg)
    .chain(config => tryCatch(() => JSON.parse(config)))
    .map(config => config.url.match(DB_REGEX))
    .fold(() => null, identity)

test('Ex1: parseDbUrl', () => {
  const config = '{"url": "postgres://sally:muppets@localhost:5432/mydb"}'
  /* reference  */
  // @ts-expect-error
  expect(_parseDbUrl(config)[1]).toBe('sally')
  // @ts-expect-error
  expect(_parseDbUrl()).toBe(null)

  /* implementation */
  // @ts-expect-error
  expect(parseDbUrl()).toBe(null)
  // @ts-expect-error
  expect(parseDbUrl(config)[1]).toBe('sally')
})

// Ex3: Using Either and the functions above, refactor startApp
// =========================
const _startApp = (cfg: string): "can't get config" | string => {
  const parsed = _parseDbUrl(cfg)

  if (parsed) {
    const [_, user, password, db] = parsed
    return `starting ${db}, ${user}, ${password}`
  } else {
    return "can't get config"
  }
}

const startApp = (cfg: string): string =>
  new Right(cfg)
    .chain(config => fromNullable(parseDbUrl(config)))
    .map(([_, user, password, db]) => `starting ${db}, ${user}, ${password}`)
    .fold(() => "can't get config", identity)

test('Ex3: startApp', () => {
  const config = '{"url": "postgres://sally:muppets@localhost:5432/mydb"}'

  /* reference */
  expect(String(_startApp(config))).toBe('starting mydb, sally, muppets')
  // @ts-expect-error
  expect(String(_startApp())).toBe("can't get config")

  /* implementation */
  expect(String(startApp(config))).toBe('starting mydb, sally, muppets')
  // @ts-expect-error
  expect(String(startApp())).toBe("can't get config")
})
