import { FlyBehavior } from './FlyBehavior'

export class FlyWithWings implements FlyBehavior {
  /**
   * implements duck flying
   */
  fly(): void {
    console.log("I'm flying!!")
  }
}
