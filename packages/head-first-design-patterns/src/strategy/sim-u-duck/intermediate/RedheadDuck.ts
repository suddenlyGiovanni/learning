import { Quackable, Flyable } from './interface'
import { Duck } from './Duck'

export class RedheadDuck extends Duck implements Quackable, Flyable {
  public fly(): void {
    console.log('fly')
  }
  public quack(): void {
    console.log('quack')
  }
  public display(): void {
    console.log('looks like a redhead duck')
  }
}
