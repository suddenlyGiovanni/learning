import { QuackBehavior } from './QuackBehavior'
export class Quack implements QuackBehavior {
  quack(): void {
    // implements duck quacking
    console.log('Quack')
  }
}
