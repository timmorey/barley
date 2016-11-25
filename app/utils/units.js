import Ember from 'ember';
import mathjs from 'npm:mathjs';

const { get } = Ember;

export function add(value1, value2) {
  let result;
  try {
    result = fromMathjsUnit(mathjs.add(toMathjsUnit(value1), toMathjsUnit(value2)));
  } finally {
    return result;
  }
}

export function subtract(value1, value2) {
  let result;
  try {
    result = fromMathjsUnit(mathjs.subtract(toMathjsUnit(value1), toMathjsUnit(value2)));
  } finally {
    return result;
  }
}

export function multiply(value1, value2) {
  let result;
  try {
    result = fromMathjsUnit(mathjs.multiply(toMathjsUnit(value1), toMathjsUnit(value2)));
  } finally {
    return result;
  }
}

export function divide(value1, value2) {
  let result;
  try {
    result = fromMathjsUnit(mathjs.divide(toMathjsUnit(value1), toMathjsUnit(value2)));
  } finally {
    return result;
  }
}

export function isMass(value) {
  return toMathjsUnit(value).equalBase(mathjs.unit('1 g'));
}

export function isVolume(value) {
  return toMathjsUnit(value).equalBase(mathjs.unit('1 l'));
}

export function convert(value, toUnit) {
  return fromMathjsUnit(toMathjsUnit(value).to(toUnit));
}

function toMathjsUnit(value) {
  return mathjs.unit(get(value, 'measure'), get(value, 'unit'));
}

function fromMathjsUnit(value) {
  const valueStr = value.toString().split(' ');
  return { measure: valueStr[0], unit: valueStr.slice(1).join(' ') };
}
