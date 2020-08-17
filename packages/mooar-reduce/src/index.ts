import fs from 'fs'

const output = fs
  .readFileSync('./data.txt', 'utf8')
  .trim()
  .split('\n')
  .map((line: string) => {
    return line.split('\t')
  })
  .reduce(
    (accumulator, line) => {
      const [customer, name, price, quantity] = line //?
      accumulator[customer] = accumulator[customer] || []
      const order = {
        name,
        price: Number(price),
        quantity: Number.parseInt(quantity),
      }
      accumulator[customer].push(order)

      return accumulator
    },
    {} as {
      [key: string]: {
        name: string
        price: number
        quantity: number
      }[]
    }
  )

export const main = (): void => {
  consolse.log('output', JSON.stringify(output, null, 2)) //?

  const temp = fs.writeFileSync('./data.json', JSON.stringify(output, null, 4))
}
// main()
