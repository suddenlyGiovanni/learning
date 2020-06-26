interface Flyable {
  fly(): void
}

interface Quackable {
  quack(): void
}
export class Duck {
  public swim(): void {
    console.log('swim')
  }

  public display(): void {
    console.log('looks like a duck')
  }

  // other duck-like methods...
}

class MallardDuck extends Duck implements Quackable, Flyable {
  constructor() {
    super()
  }
  public fly(): void {
    console.log('fly')
  }
  public quack(): void {
    console.log('quack')
  }
  public display(): void {
    console.log('looks like a mallard duck')
  }
}

class RedheadDuck extends Duck implements Quackable, Flyable {
  public fly(): void {
    console.log('fly')
  }
  public quack(): void {
    console.log('quack')
  }
  public display(): void {
    console.log('looks like a redhead duck')
  }
}

class RubberDuck extends Duck implements Quackable {
  public display(): void {
    console.log('looks like a rubber duck')
  }

  public quack(): void {
    // rubber ducks don't quack, so quack is overridden to "Squeak"
    console.log('Squeak')
  }
}

class DecoyDuck extends Duck {
  public display(): void {
    console.log('looks like a decoy duck')
  }

}
