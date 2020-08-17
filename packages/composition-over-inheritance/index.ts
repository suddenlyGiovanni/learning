/* eslint-disable max-classes-per-file */
class Animal {
  name: string

  constructor(name: string) {
    this.name = name
  }

  poop(): string {
    return `Poop..., ${this.name} is sorry`
  }
}

class Dog extends Animal {
  name: string

  constructor(name: string) {
    super(name)
    this.name = name
  }

  bark(): string {
    return `Woof, I am ${this.name}`
  }
}

class Cat extends Animal {
  name: string

  constructor(name: string) {
    super(name)
    this.name = name
  }

  meow(): string {
    return `Meow, I am ${this.name}`
  }
}

class Robot {
  name: string

  position: number

  speed: number

  constructor(name: string) {
    this.name = name
    this.position = 0
    this.speed = 0
  }

  drive(speed: number) {
    this.position += speed
    return this
  }
}

class MurderRobot extends Robot {
  constructor(name: string) {
    super(name)
    this.speed = 100
  }

  kill(target: string): string {
    return `${this.name} must exterminate ${target}`
  }
}

class CleaningRobot extends Robot {
  constructor(name: string) {
    super(name)
    this.position = 100
  }

  clean(target: string): string {
    return `${this.name} has to clean ${target}'s poop... What a shame!`
  }
}

/**
 * And now how can we implement a class that inherit some methods from the `Dog`, some from the
 * `Robot` ???
 */
class MurderRobotDog {
  // ?????
}

const doggyTheDog = new Dog('doggyTheDog') // ? Dog { name: 'doggyTheDog' }
doggyTheDog.poop() // ? Poop..., doggyTheDog is sorry

const cattyTheCat = new Cat('cattyTheCat') // ? Cat { name: 'cattyTheCat' }
cattyTheCat.meow() // ? Meow, I am cattyTheCat
cattyTheCat.poop() // ? Poop..., cattyTheCat is sorry

const murderyBot = new MurderRobot('murderyBot') // ? MurderRobot { name: 'murderyBot', position: 0, speed: 100 }
murderyBot.drive(10) // ? MurderRobot { name: 'murderyBot', position: 10, speed: 100 }
murderyBot.kill('doggyTheDog') // ? murderyBot must exterminate doggyTheDog

const cleanyBot = new CleaningRobot('cleanyBot') // ? CleaningRobot { name: 'cleanyBot', position: 100, speed: 0 }
cleanyBot.drive(5) // ? CleaningRobot { name: 'cleanyBot', position: 105, speed: 0 }
cleanyBot.clean('cattyTheCat') // ? cleanyBot has to clean cattyTheCat's poop... What a shame!

/**
 * now the same but using composition
 *
 *
 * cat = pooper + meower
 * dog = pooper + barker
 * cleaningRobot = driver + cleaner
 * killerRobot = driver + killer
 * killerRobotDog = driver + killer + barker + pooper
 */

const pooper = (state: { name: string }) => ({
  poop(): string {
    return `Poop..., ${state.name} is sorry`
  },
})

pooper({ name: 'P' }).poop() // ? Poop..., P is sorry

const meower = (state: { name: string }) => ({
  meow(): string {
    return `Meow, I am ${state.name}`
  },
})

meower({ name: 'M' }).meow() // ? Meow, I am M

const barker = (state: { name: string }) => ({
  bark(): string {
    return `Woof, I am ${state.name}`
  },
})

barker({ name: 'B' }).bark() // ? Woof, I am B

const driver = (state: { position: number }) => ({
  drive(speed: number): number {
    return (state.position += speed)
  },
})

driver({ position: 0 }).drive(100) // ? 100

const killer = (state: { name: string }) => ({
  kill(target: string): string {
    return `${state.name} must exterminate ${target}`
  },
})

killer({ name: 'K' }).kill('Target') // ? K must exterminate Target

const cleaner = (state: { name: string }) => ({
  clean(target: string): string {
    return `${state.name} has to clean ${target}'s poop... What a shame!`
  },
})

cleaner({ name: 'C' }).clean('Target') // ? C has to clean Target's poop... What a shame!

// and now for compose all software!!

/**
 * dog = pooper + barker
 */
const makeDog = (name: string) => {
  const state = { name }

  return { ...barker(state), ...pooper(state) }
}

const dDog = makeDog('dDog') // ? { bark: [λ: bark], poop: [λ: poop] }
dDog.bark() // ? Woof, I am dDog
dDog.poop() // ? Poop..., dDog is sorry

/**
 * cat = pooper + meower
 */
const makeCat = (name: string) => {
  const state = { name }
  return { ...meower(state), ...pooper(state) }
}

const cCat = makeCat('cCat') // ? { meow: [λ: meow], poop: [λ: poop] }
cCat.meow() // ? Meow, I am cCat
cCat.poop() // ? Poop..., cCat is sorry

/**
 * cleaningRobot = driver + cleaner
 */
const makeCleaningRobot = (name: string, position = 0) => {
  const state = {
    name,
    position,
  }
  return {
    ...driver(state),
    ...cleaner(state),
  }
}

const cleaningBot = makeCleaningRobot('cleaningBot') // ? { drive: [λ: drive], clean: [λ: clean] }
cleaningBot.drive(10) // ? 10
cleaningBot.clean('cCat') // ? cleaningBot has to clean cCat's poop... What a shame!

/**
 * killerRobot = driver + killer
 */
const makeKillerRobot = (name: string, position = 0) => {
  const state = {
    name,
    position,
  }
  return {
    ...driver(state),
    ...killer(state),
  }
}

const killerBot = makeKillerRobot('killerBot', -100) // ? { drive: [λ: drive], kill: [λ: kill] }
killerBot.drive(75) // ? -25
killerBot.kill('cleaningBot') // ? killerBot must exterminate cleaningBot

/**
 * killerRobotDog = driver + killer + barker + pooper
 */
const makeKillerRobotDog = (name: string) => {
  const state = {
    name,
    position: 0,
  }
  return {
    ...barker(state),
    ...pooper(state),
    ...killer(state),
    ...driver(state),
  }
}

const killerBotDog = makeKillerRobotDog('killerBotDog') // ? { bark: [λ: bark], poop: [λ: poop], kill: [λ: kill], drive: [λ: drive] }
killerBotDog.poop() // ? Poop..., killerBotDog is sorry
killerBotDog.bark() // ? Woof, I am killerBotDog
killerBotDog.drive(100) // ? 100
killerBotDog.kill('dDog') // ? killerBotDog must exterminate dDog
