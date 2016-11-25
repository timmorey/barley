import Ember from 'ember';

export function formatNumber([number], options) {
  const decimalPlaces = options.decimalPlaces || 0;
  return Number(number).toFixed(decimalPlaces);
}

export default Ember.Helper.helper(formatNumber);
