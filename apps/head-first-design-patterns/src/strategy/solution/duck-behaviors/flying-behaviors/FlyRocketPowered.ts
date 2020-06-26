import { FlyBehavior } from './FlyBehavior'

export class FlyRocketPowered implements FlyBehavior {
  fly(): void {
    console.log("I'm flying with a rocket!")
  }
}
