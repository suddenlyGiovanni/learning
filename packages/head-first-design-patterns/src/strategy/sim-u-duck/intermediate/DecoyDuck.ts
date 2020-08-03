import { Duck } from './Duck'

export class DecoyDuck extends Duck {
  public display(): void {
    console.log('looks like a decoy duck')
  }

}
