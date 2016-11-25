import Ember from 'ember';
import ResourceViewModel from 'barley/view-models/resource';
import { multiply, divide, isMass, isVolume } from 'barley/utils/units';

const { ObjectProxy, computed, get, getProperties } = Ember;

export default ObjectProxy.extend({

  resources: undefined,

  currentTemperature: undefined,

  resource: computed('resourceId', 'resources', function() {
    return (get(this, 'resources') || []).findBy('id', get(this, 'resourceId'));
  }),

  resourceViewModel: computed('resource', function() {
    return ResourceViewModel.create({ content: get(this, 'resource') });
  }),

  heatEnergy: computed('resourceViewModel.specificHeatCapacity', 'currentTemperature', 'measure', 'unit', function() {
    const specificHeatCapacity = get(this, 'resourceViewModel.specificHeatCapacity');
    const mass = get(this, 'mass');
    const temperature = get(this, 'currentTemperature');
    if (specificHeatCapacity === undefined || mass === undefined || temperature === undefined) {
      return undefined;
    } else {
      return multiply(multiply(specificHeatCapacity, mass), temperature);
    }
  }),

  amount: computed('measure', 'unit', function() {
    return getProperties(this, 'measure', 'unit');
  }),

  isMassMeasurement: computed('unit', function() {
    return isMass(getProperties(this, 'measure', 'unit'));
  }),

  isVolumeMeasurement: computed('unit', function() {
    return isVolume(getProperties(this, 'measure', 'unit'));
  }),

  mass: computed('isMassMeasurement', 'isVolumeMeasurement', 'resourceViewModel.density', 'measure', function() {
    if (get(this, 'isMassMeasurement')) {
      return getProperties(this, 'measure', 'unit');
    } else if (get(this, 'isVolumeMeasurement') && get(this, 'resourceViewModel.density')) {
      return multiply(get(this, 'amount'), get(this, 'resourceViewModel.density'));
    }
  }),

  volume: computed('isMassMeasurement', 'isVolumeMeasurement', 'resourceViewModel.density', 'measure', function() {
    if (get(this, 'isVolumeMeasurement')) {
      return get(this, 'amount');
    } else if (get(this, 'isMassMeasurement') && get(this, 'resourceViewModel.density')) {
      return divide(get(this, 'amount'), get(this, 'resourceViewModel.density'));
    }
  })

});
