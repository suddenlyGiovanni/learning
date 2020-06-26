import { Duck } from './Duck'
import { FlyWithWings } from './duck-behaviors/flying-behaviors'
import { Quack } from './duck-behaviors/quacking-behaviors'

export class MallardDuck extends Duck {
  constructor() {
    super()
    this.flyBehavior = new FlyWithWings()
    this.quackBehavior = new Quack()
  }
  public display(): void {
    console.log("I'm a real Mallard duck")
  }
}
