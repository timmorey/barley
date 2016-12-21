import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({

  classNames: ['property-editor'],

  property: undefined,

  actions: {

    updateName(event) {
      return {
        name: event.target.value,
        value: get(this, 'property.value') || ''
      };
    },

    updateValue(event) {
      return {
        name: get(this, 'property.name') || '',
        value: event.target.value
      };
    }

  }

});
