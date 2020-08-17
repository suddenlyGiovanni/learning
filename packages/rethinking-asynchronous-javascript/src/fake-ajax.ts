/* eslint-disable camelcase, @typescript-eslint/no-use-before-define */

const fake_responses = {
  file1: 'The first text',
  file2: 'The middle text',
  file3: 'The last text',
} as const
export type FileName = keyof typeof fake_responses

export function output<T>(value: T): void {
  // eslint-disable-next-line no-console
  console.log(String(value))
}

export function fakeAjax(url: FileName, cb: (content: string) => void): void {
  const randomDelay: number = (Math.round(Math.random() * 1e4) % 8000) + 1000

  output(`Requesting: ${url}`)

  setTimeout((): void => cb(fake_responses[url]), randomDelay)
}
