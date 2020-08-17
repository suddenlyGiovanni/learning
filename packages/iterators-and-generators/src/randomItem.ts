import randomNumber from 'random-number'
export function randomItem<T>(array: T[]): T {
  const randomIndex = randomNumber({
    min: 0,
    max: array.length - 1,
    integer: true,
  })
  return array[randomIndex]
}
