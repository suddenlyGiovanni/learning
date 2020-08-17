// @ts-nocheck
import { Task } from '../types'
import fs from 'fs'

const readFile = (path, encoding) =>
  Task((rej, res) =>
    fs.readFile(path, encoding, (err, contents) => (err ? rej(err) : res(contents)))
  )

const writeFile = (path, contents) =>
  Task((rej, res) =>
    fs.writeFile(path, contents, (err, _contents) => (err ? rej(err) : res(_contents)))
  )

const _app = () =>
  fs.readFile('config.json', 'utf-8', (err, contents) => {
    console.log(err, contents)
    if (err) throw err

    const newContents = contents.replace(/3/g, '6')

    fs.writeFile('config1.json', newContents, (err, _) => {
      if (err) throw err
      console.log('success!')
    })
  })

const app = () =>
  readFile('config.json', 'utf-8') // Task(contents)
    .map(contents => contents.replace(/3/g, '7'))
    .chain(newContents => writeFile('config1.json', newContents))


app().fork(console.error, () => console.log('success!')) //?
