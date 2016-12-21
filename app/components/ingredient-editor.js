import Ember from 'ember';

const { Component, assign, get } = Ember;

export default Component.extend({

  classNames: ['ingredient-editor'],

  ingredient: undefined,

  actions: {

    updateAmount(event) {
      return assign({}, get(this, 'ingredient'), { amount: event.target.value });
    },

    updateResource(resource) {
      return assign({}, get(this, 'ingredient'), { resourceId: get(resource, 'id') });
    }

  }

});
