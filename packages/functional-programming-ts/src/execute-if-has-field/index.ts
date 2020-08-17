import * as _ from 'lodash';
import { doWhen, existy } from '../index';
/**
 * example:
 * @param {*} target
 * @param {string} name
 * @returns {Function | undefined}
 */
export function executeIfHasField(target: any, name: string): Function | undefined {
  return doWhen(existy(target[name]), () => {
    // _.result(object, property, [defaultValue])
    // If the value of the named property is a function then invoke it with the object as context;
    // otherwise, return it.
    // If a default value is provided and the property doesn't exist than the default will be
    // returned;
    const result = _.result(target, name);
    console.log(['The result is', result].join(' '));
    return result;
  });
}
