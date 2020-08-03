import { FlyBehavior } from './duck-behaviors/flying-behaviors'
import { QuackBehavior } from './duck-behaviors/quacking-behaviors'

export abstract class Duck {
  protected flyBehavior: FlyBehavior
  protected quackBehavior: QuackBehavior

  public performQuack(): void {
    this.quackBehavior.quack()
  }

  public performFly(): void {
    this.flyBehavior.fly()
  }

  public swim(): void {
    console.log('All ducks floats, even decoys!')
  }

  public abstract display(): void

  public setFlyBehavior(fb: FlyBehavior): void {
    this.flyBehavior = fb
  }

  public setQuackBehavior(qb: QuackBehavior): void {
    this.quackBehavior = qb
  }
}
