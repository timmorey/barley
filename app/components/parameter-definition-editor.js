import Ember from 'ember';

const { Component, assign, get } = Ember;

export default Component.extend({

  classNames: ['parameter-definition-editor'],

  parameterDefinition: undefined,

  actions: {

    updateName(event) {
      return assign({}, get(this, 'parameterDefinition'), { name: event.target.value });
    },

    updateType(event) {
      return assign({}, get(this, 'parameterDefinition'), { type: event.target.value });
    }

  }

});
