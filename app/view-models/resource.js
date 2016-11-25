import Ember from 'ember';

const { ObjectProxy, computed, get, getProperties } = Ember;

export default ObjectProxy.extend({

  specificHeatCapacity: computed('properties', function() {
    const property = (get(this, 'properties') || []).find(property =>
      get(property, 'name').trim().toUpperCase() === 'SPECIFIC HEAT CAPACITY');
    return property ? getProperties(property, 'measure', 'unit') : undefined;
  }),

  density: computed('properties', function() {
    const property = (get(this, 'properties') || []).find(property =>
      get(property, 'name').trim().toUpperCase() === 'DENSITY');
    return property ? getProperties(property, 'measure', 'unit') : undefined;
  })

});
