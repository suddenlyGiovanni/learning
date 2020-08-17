import { existy } from '../index';

/**
 * A helper function to determine if something should be consider a synonym for true
 * Attention, with this fn the num 0 is evaluated to true
 * @param {*} x
 * @returns {boolean}
 */
export function truthy(x: any): boolean {
  return x !== false && existy(x);
}
