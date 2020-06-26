import { Duck } from './Duck'
import { FlyNoWay } from './duck-behaviors/flying-behaviors'
import { MuteQuack } from './duck-behaviors/quacking-behaviors'

export class DecoyDuck extends Duck {
  constructor() {
    super()
    this.flyBehavior = new FlyNoWay()
    this.quackBehavior = new MuteQuack()
  }
  public display(): void {
    console.log("I'm a decoy duck, I am made out of wood")
  }
}
