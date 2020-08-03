import { QuackBehavior } from './QuackBehavior'
export class MuteQuack implements QuackBehavior {
  quack(): void {
    // do nothing - can't quack!
    console.log("<< Silence >>")
  }
}
