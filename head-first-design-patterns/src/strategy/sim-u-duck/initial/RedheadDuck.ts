import { Duck } from './Duck'
export class RedheadDuck extends Duck {
  constructor() {
    super()
  }
  public display(): void {
    console.log('looks like a redhead duck')
  }
}
