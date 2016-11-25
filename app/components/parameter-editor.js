import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({

  classNames: ['parameter-editor'],

  parameter: undefined,

  actions: {

    updateMeasure(event) {
      return {
        name: get(this, 'parameter.name'),
        type: get(this, 'parameter.type'),
        measure: event.target.value,
        unit: get(this, 'parameter.unit') || ''
      };
    },

    updateUnit(event) {
      return {
        name: get(this, 'parameter.name'),
        type: get(this, 'parameter.type'),
        measure: get(this, 'parameter.measure') || '',
        unit: event.target.value
      };
    }

  }

});
