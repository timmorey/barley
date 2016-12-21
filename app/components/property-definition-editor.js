import Ember from 'ember';

const { Component, assign, get } = Ember;

export default Component.extend({

  classNames: ['property-definition-editor'],

  propertyDefinition: undefined,

  actions: {

    updateName(event) {
      return assign({}, get(this, 'propertyDefinition'), { name: event.target.value });
    },

    updateType(event) {
      return assign({}, get(this, 'propertyDefinition'), { type: event.target.value });
    }

  }

});
