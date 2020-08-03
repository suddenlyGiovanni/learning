import { Duck } from './Duck'
import { FlyNoWay } from './duck-behaviors/flying-behaviors'
import { Squeak } from './duck-behaviors/quacking-behaviors'

export class RubberDuck extends Duck {
  constructor() {
    super()
    this.flyBehavior = new FlyNoWay()
    this.quackBehavior = new Squeak()
  }
  public display(): void {
    console.log("I'm a fake duck, I am made out of plastic")
  }
}
