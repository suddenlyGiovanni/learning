import { Duck } from './Duck'
export class DecoyDuck extends Duck {
  constructor() {
    super()
  }
  public display(): void {
    console.log('looks like a decoy duck')
  }


  public quack(): void {
    // rubber ducks don't quack, so quack is overridden to "Squeak"
    console.log('Squeak')
  }
}
