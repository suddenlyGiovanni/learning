import { MallardDuck } from './MallardDuck'
import { RedheadDuck } from './RedheadDuck'
import { RubberDuck } from './RubberDuck'

export class MiniDuckSimulator {
  public static main(): void {
    const mallard: MallardDuck = new MallardDuck()
    const redhead: RedheadDuck = new RedheadDuck()
    const rubber: RubberDuck = new RubberDuck()

    // mallard duck!
    console.log('\n\nMallardDuck')
    mallard.quack()
    mallard.fly()

    // redhead duck!
    console.log('\n\nRedheadDuck')
    redhead.quack()
    redhead.fly()

    // rubber duck!
    console.log('\n\nRubberDuck')
    rubber.quack()
    // rubber.fly() // a rubber duck can't fly
  }
}
