import mathjs from 'npm:mathjs';

export function add(value1, value2) {
  let result;
  try {
    result = fromMathjsUnit(mathjs.add(toMathjsUnit(value1), toMathjsUnit(value2)));
    console.log(`${value1} + ${value2} = ${result}`);
  } catch (e) {
    console.log(`${value1} + ${value2} = ERROR: ${e}`);
  } finally {
    return result;
  }
}

export function subtract(value1, value2) {
  let result;
  try {
    result = fromMathjsUnit(mathjs.subtract(toMathjsUnit(value1), toMathjsUnit(value2)));
    console.log(`${value1} - ${value2} = ${result}`);
  } catch (e) {
    console.log(`${value1} - ${value2} = ERROR: ${e}`);
  } finally {
    return result;
  }
}

export function multiply(value1, value2) {
  let result;
  try {
    result = fromMathjsUnit(mathjs.multiply(toMathjsUnit(value1), toMathjsUnit(value2)));
    console.log(`${value1} * ${value2} = ${result}`);
  } catch (e) {
    console.log(`${value1} * ${value2} = ERROR: ${e}`);
  } finally {
    return result;
  }
}

export function divide(value1, value2) {
  let result;
  try {
    result = fromMathjsUnit(mathjs.divide(toMathjsUnit(value1), toMathjsUnit(value2)));
    console.log(`${value1} / ${value2} = ${result}`);
  } catch (e) {
    console.log(`${value1} / ${value2} = ERROR: ${e}`);
  } finally {
    return result;
  }
}

export function isMass(value) {
  try {
    return toMathjsUnit(value).equalBase(mathjs.unit('1 g'));
  } catch (e) {
    return false;
  }
}

export function isVolume(value) {
  try {
    return toMathjsUnit(value).equalBase(mathjs.unit('1 l'));
  } catch (e) {
    return false;
  }
}

export function convert(value, toUnit) {
  let result;
  try {
    const sigfigs = countSigFigs(value);
    result = fromMathjsUnit(toMathjsUnit(value).to(toUnit), sigfigs);
  } catch (e) {
  } finally {
    return result;
  }
}

export function format(value, precision) {
  try {
    return padWithSignificantZeros(toMathjsUnit(value).format(precision), precision);
  } catch (e) { }
}

function countSigFigs(value) {
  return (value.split(' ')[0] || '').replace('.', '').length;
}

export default {
  add,
  subtract,
  multiply,
  divide,
  convert,
  isMass,
  isVolume,
  format
};

function toMathjsUnit(value) {
  return mathjs.unit(value);
}

function fromMathjsUnit(value) {
  return value.format();
}

function padWithSignificantZeros(value, precision) {
  while (countSigFigs(value) < precision) {
    const chunks = value.split(' ').filter(chunk => chunk.length);
    let measure = chunks[0];
    const unit = chunks.slice(1).join(' ');
    if (measure.indexOf('.') > -1) {
      measure = `${measure}0`;
    } else {
      measure = `${measure}.0`;
    }
    value = `${measure} ${unit}`;
  }
  return value;
}
