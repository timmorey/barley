import Ember from 'ember';
import { add, subtract, multiply, divide, convert, format, isMass, isVolume } from 'barley/utils/units';

const { ObjectProxy, computed, get } = Ember;

const MeasureViewModel = ObjectProxy.extend({

  additiveDependencies: undefined,
  multiplicativeDependencies: undefined,

  isComputed: computed.or('additiveDependencies', 'multiplicativeDependencies'),

  value: computed.alias('content'),

  significantValue: computed('value', 'validSigFigs', function() {
    if (get(this, 'isComputed')) {
      return format(get(this, 'value'), get(this, 'validSigFigs'));
    } else {
      return get(this, 'value');
    }
  }),

  amount: computed('value', function() {
    return get(this, 'value')
      .split(' ')
      .filter(chunk => chunk.length)
      .slice(0, 1)
      .join(' ');
  }),

  unit: computed('value', function() {
    return get(this, 'value')
      .split(' ')
      .filter(chunk => chunk.length)
      .slice(1)
      .join(' ');
  }),

  isMass: computed('value', function() {
    return isMass(get(this, 'value'));
  }),

  isVolume: computed('value', function() {
    return isVolume(get(this, 'value'));
  }),

  sigFigs: computed('amount', function() {
    return get(this, 'amount').replace('.', '').length;
  }),

  wholeSigFigs: computed('amount', function() {
    return get(this, '_amountWholePart.length');
  }),

  fractionalSigFigs: computed('amount', function() {
    return get(this, '_amountFractionalPart.length');
  }),

  validSigFigs: computed(
    'isComputed',
    'additiveDependencies',
    'validFractionalSigFigs',
    'validWholeSigFigs',
    'multiplicativeDependencies', function() {
    if (get(this, 'isComputed')) {
      if (get(this, 'additiveDependencies')) {
        return get(this, 'validFractionalSigFigs') + get(this, 'validWholeSigFigs');
      } else if (get(this, 'multiplicativeDependencies')) {
        return Math.min(...get(this, 'multiplicativeDependencies').mapBy('validSigFigs'));
      }
    }
    return get(this, 'sigFigs');
  }),

  validWholeSigFigs: computed('wholeSigFigs', function() {
    return get(this, 'wholeSigFigs');
  }),

  validFractionalSigFigs: computed('additiveDependencies', 'validSigFigs', '_amountWholePart', function() {
    if (get(this, 'additiveDependencies')) {
      return Math.min(...get(this, 'additiveDependencies').mapBy('validFractionalSigFigs'));
    }
    return Math.max(get(this, 'validSigFigs') - get(this, '_amountWholePart.length'), 0);
  }),

  _amountWholePart: computed('amount', function() {
    return get(this, 'amount').split('.')[0];
  }),

  _amountFractionalPart: computed('amount', function() {
    return get(this, 'amount').split('.')[1] || '';
  }),

  plus(other) {
    return MeasureViewModel.create({
      additiveDependencies: [this, other],
      value: add(get(this, 'value'), get(other, 'value'))
    });
  },

  minus(other) {
    return MeasureViewModel.create({
      additiveDependencies: [this, other],
      value: subtract(get(this, 'value'), get(other, 'value'))
    });
  },

  times(other) {
    return MeasureViewModel.create({
      multiplicativeDependencies: [this, other],
      value: multiply(get(this, 'value'), get(other, 'value'))
    });
  },

  divideBy(other) {
    return MeasureViewModel.create({
      multiplicativeDependencies: [this, other],
      value: divide(get(this, 'value'), get(other, 'value'))
    });
  },

  to(unit) {
    return MeasureViewModel.create({
      multiplicativeDependencies: [this],
      value: convert(get(this, 'value'), unit)
    });
  }

});

export default MeasureViewModel;
