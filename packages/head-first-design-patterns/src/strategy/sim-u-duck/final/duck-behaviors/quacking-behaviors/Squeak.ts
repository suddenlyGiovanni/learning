import { QuackBehavior } from './QuackBehavior'

export class Squeak implements QuackBehavior {
  quack(): void {
    // rubber duckie squeak
    console.log('Squeak')
  }
}
