export const joinElements = <A>(xs: A[], joinString: string): string => {
  const recurse = (index: number, accumulator: string): string => {
    const element = xs[index]
    const result = accumulator + String(element)
    // Check if we are at the end of the array
    return index === xs.length - 1
      ? result // If so we have reached our base case and we want to return
      : recurse(index + 1, result + joinString) // Else we are still in our recursive case
  }

  return recurse(0, '')
}

joinElements(['s', 'cr', 't cod', ' :) :)'], 'e') // "secret code :) :)"
