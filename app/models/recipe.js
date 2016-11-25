import Ember from 'ember';
import DS from 'ember-data';
import BarleyObject from 'barley/models/abstract/barley-object';

const { computed, get, getProperties } = Ember;

export default BarleyObject.extend({

  version: DS.attr({ defaultValue: '0.0.0' }),

  ingredientGroups: DS.attr({ defaultValue: () => [] }),
  instructionGroups: DS.attr({ defaultValue: () => [] })

});
