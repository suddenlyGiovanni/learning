import { Quackable, Flyable } from './interface'
import { Duck } from './Duck'

export class MallardDuck extends Duck implements Quackable, Flyable {
  constructor() {
    super()
  }
  public fly(): void {
    console.log('fly')
  }
  public quack(): void {
    console.log('quack')
  }
  public display(): void {
    console.log('looks like a mallard duck')
  }
}
