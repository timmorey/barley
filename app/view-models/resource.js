import Ember from 'ember';
import MeasureViewModel from 'barley/view-models/measure';

const { ObjectProxy, computed, get } = Ember;

export default ObjectProxy.extend({

  specificHeatCapacity: computed('properties', function() {
    const property = (get(this, 'properties') || []).find(property =>
      get(property, 'name').trim().toUpperCase() === 'SPECIFIC HEAT CAPACITY');
    if (property) {
      return MeasureViewModel.create({ value: get(property, 'value') });
    }
  }),

  density: computed('properties', function() {
    const property = (get(this, 'properties') || []).find(property =>
      get(property, 'name').trim().toUpperCase() === 'DENSITY');
    if (property) {
      return MeasureViewModel.create({ value: get(property, 'value') });
    }
  })

});
