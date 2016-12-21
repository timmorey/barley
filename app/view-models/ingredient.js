import Ember from 'ember';
import MeasureViewModel from 'barley/view-models/measure';
import ResourceViewModel from 'barley/view-models/resource';

const { ObjectProxy, computed, get } = Ember;

export default ObjectProxy.extend({

  resources: undefined,

  resource: computed('resourceId', 'resources', function() {
    return (get(this, 'resources') || []).findBy('id', get(this, 'resourceId'));
  }),

  resourceViewModel: computed('resource', function() {
    return ResourceViewModel.create({ content: get(this, 'resource') });
  }),

  measure: computed('amount', function() {
    return MeasureViewModel.create({ value: get(this, 'amount') });
  }),

  mass: computed('measure', 'resourceViewModel.density', function() {
    if (get(this, 'measure.isMass')) {
      return get(this, 'measure');
    } else if (get(this, 'measure.isVolume') && get(this, 'resourceViewModel.density')) {
      return get(this, 'measure').times(get(this, 'resourceViewModel.density'));
    }
  }),

  volume: computed('measure', 'resourceViewModel.density', function() {
    if (get(this, 'measure.isVolume')) {
      return get(this, 'measure');
    } else if (get(this, 'measure.isMass') && get(this, 'resourceViewModel.density')) {
      return get(this, 'measure').divideBy(get(this, 'resourceViewModel.density'));
    }
  }),

  heatCapacity: computed('mass', 'resourceViewModel.specificHeatCapacity', function() {
    if (get(this, 'mass') && get(this, 'resourceViewModel.specificHeatCapacity')) {
      return get(this, 'mass').times(get(this, 'resourceViewModel.specificHeatCapacity'));
    }
  })

});
