export class Duck {
  public quack(): void {
    console.log('quack')
  }

  public swim(): void {
    console.log('swim')
  }

  public display(): void {
    console.log('looks like a duck')
  }

  public fly(): void {
    console.log('fly')
  }

  // other duck-like methods...
}

class MallardDuck extends Duck {
  constructor() {
    super()
  }
  public display(): void {
    console.log('looks like a mallard duck')
  }
}

class RedheadDuck extends Duck {
  constructor() {
    super()
  }
  public display(): void {
    console.log('looks like a redhead duck')
  }
}


class RubberDuck extends Duck {
  constructor() {
    super()
  }
  public display(): void {
    console.log('looks like a rubber duck')
  }

  public quack():void {
    // rubber ducks don't quack, so quack is overridden to "Squeak"
    console.log('Squeak')
  }
}


class DecoyDuck extends Duck {
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
