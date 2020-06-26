import { Duck } from './Duck'
import { FlyNoWay } from './duck-behaviors/flying-behaviors'
import { Quack } from './duck-behaviors/quacking-behaviors'
export class ModelDuck extends Duck {
  constructor() {
    super()
    this.flyBehavior = new FlyNoWay()
    this.quackBehavior = new Quack()
  }
  public display(): void {
    console.log('I am a model duck')
  }
}
