import { randomItem } from '../index'

export const makeDragons = (): string => {
  const dragonSize = ['big', 'medium', 'tiny']
  const dragonAbilities = ['fire', 'ice', 'lightning']
  return `${randomItem(dragonSize)} ${randomItem(dragonAbilities)} dragon`
}
