import { isNull, isUndefined } from '../index';

export function type(value: any): string {
  const UNDEFINED = 'undefined';
  const NULL = 'null';
  const regex = /^\[object (\S+?)\]$/;
  const matches = Object.prototype.toString.call(value).match(regex) || [];

  return isNull(value)
    ? NULL
    : isUndefined(value)
    ? UNDEFINED
    : (matches[1] || UNDEFINED).toLowerCase();
}
