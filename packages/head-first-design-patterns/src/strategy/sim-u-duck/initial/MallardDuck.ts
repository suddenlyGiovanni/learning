import { Duck } from './Duck'
export class MallardDuck extends Duck {
  constructor() {
    super()
  }
  public display(): void {
    console.log('looks like a mallard duck')
  }
}
