import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({

  classNames: ['property-editor'],

  property: undefined,

  actions: {

    updateName(event) {
      return {
        name: event.target.value,
        measure: get(this, 'proprety.measure') || '',
        unit: get(this, 'property.unit') || ''
      };
    },

    updateMeasure(event) {
      return {
        name: get(this, 'property.name') || '',
        measure: event.target.value,
        unit: get(this, 'property.unit') || ''
      };
    },

    updateUnit(event) {
      return {
        name: get(this, 'property.name') || '',
        measure: get(this, 'property.measure') || '',
        unit: event.target.value
      };
    }

  }

});
