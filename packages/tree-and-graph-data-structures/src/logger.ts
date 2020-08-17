// Just a test class to collect value while traversing
export class Logger<T> {
  public values: T[]

  public constructor() {
    this.values = []
    this.log = this.log.bind(this)
  }

  public clear(): void {
    this.values = []
  }

  public log(value: T): void {
    this.values.push(value)
  }
}
