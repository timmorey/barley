import Ember from 'ember';
import ItemPicker from 'barley/components/item-picker';

const { computed, get, inject, on, set } = Ember;

export default ItemPicker.extend({

  classNames: ['sensor-picker'],
  layoutName: 'components/item-picker',

  store: inject.service(),

  allowCreate: false,

  sensors: computed.alias('items'),

  selectedItem: computed.alias('selectedSensor'),
  selectedSensor: computed('sensors.[]', 'selectedSensorId', {
    get() {
      return (get(this, 'sensors') || []).findBy('id', get(this, 'selectedSensorId'));
    },
    set(key, value) {
      set(this, 'selectedSensorId', value ? get(value, 'id') : undefined);
      return value;
    }
  }),
  selectedSensorId: undefined,

  _initSensors: on('init', function() {
    get(this, 'store').findAll('sensor')
      .then((sensors) => set(this, 'sensors', sensors));
  }),

  actions: {

    createOnEnter() {
      // No-op
    }

  }

});
