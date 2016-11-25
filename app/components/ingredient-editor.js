import Ember from 'ember';

const { Component, assign, get } = Ember;

export default Component.extend({

  classNames: ['ingredient-editor'],

  ingredient: undefined,

  actions: {

    updateMeasure(event) {
      return assign({}, get(this, 'ingredient'), { measure: event.target.value });
    },

    updateUnit(event) {
      return assign({}, get(this, 'ingredient'), { unit: event.target.value });
    },

    updateResource(resource) {
      return assign({}, get(this, 'ingredient'), { resourceId: get(resource, 'id') });
    }

  }

});
