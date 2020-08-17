import fs from 'fs'
import { Either, Left, Right, fromNullable, tryCatch } from './either'
import { identity } from "src/functor/functor"

//=====================================

const _getPort = (): number => {
  try {
    const str = fs.readFileSync('config.json', { encoding: 'utf8' })
    const config = JSON.parse(str)
    return config.port
  } catch (e) {
    return 5000
  }
}

const _result = _getPort()

console.log(_result)

const readFileSync = (path: string) => tryCatch(() => fs.readFileSync(path))

const parseJSON = <B>(content: string) => tryCatch<never, B>(() => JSON.parse(content))

const getPort = (): number =>
  readFileSync('config.json')
    .chain(parseJSON)
    .map(config => config.port)
    .fold(() => 8080, identity)

const result = getPort()

console.log(result)
