import { truthy } from '../index';

type AnyFunction = (...args: any[]) => any;

/**
 * A helper function that call the given action if the provided condition resolves to true
 * @param {*} condition - A condition that will be evaluated for truthfulness
 * @param {Function} action - An action to be performed
 */
export function doWhen(condition: any, action: AnyFunction): ReturnType<AnyFunction> | undefined {
  return truthy(condition) ? action() : undefined;
}
