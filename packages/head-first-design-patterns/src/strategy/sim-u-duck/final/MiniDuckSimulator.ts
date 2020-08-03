import { Duck } from './Duck'
import { MallardDuck } from './MallardDuck'
import { RedheadDuck } from './RedheadDuck'
import { RubberDuck } from './RubberDuck'
import { DecoyDuck } from './DecoyDuck'
import { ModelDuck } from './ModelDuck'
import { FlyRocketPowered } from './duck-behaviors/flying-behaviors'

export class MiniDuckSimulator {
  public static main(): void {
    const mallard: Duck = new MallardDuck()
    const redhead: RedheadDuck = new RedheadDuck()
    const rubber: RubberDuck = new RubberDuck()
    const decoy: DecoyDuck = new DecoyDuck()
    const model: ModelDuck = new ModelDuck()

    // mallard duck!
    console.log('\n\nMallardDuck')
    mallard.performQuack()
    mallard.performFly()

    // redhead duck!
    console.log('\n\nRedheadDuck')
    redhead.performQuack()
    redhead.performFly()

    // rubber duck!
    console.log('\n\nRubberDuck')
    rubber.performQuack()
    rubber.performFly()

    // decoy duck!
    console.log('\n\nDecoyDuck')
    decoy.performQuack()
    decoy.performFly()

    // model duck!
    console.log('\n\nModelDuck')
    model.performQuack()
    /**
     * the first call to perform fly() delegates to the flyBehavior object  set in the ModelDuck's
     * constructor, which is a FlyNoWay instance
     */
    model.performFly()
    /**
     * this invokes the model's inherited behavior setter method, and ... voila!
     * the Model suddenly has a rocket powered flying capability!
     */
    model.setFlyBehavior(new FlyRocketPowered())

    model.performFly()
  }
}
