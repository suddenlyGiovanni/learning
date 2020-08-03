import { FlyBehavior } from './FlyBehavior'
export class FlyNoWay implements FlyBehavior {
  /**
   * do nothing - can't fly
   */
  fly(): void {
    console.log("I can't fly")
  }
}
