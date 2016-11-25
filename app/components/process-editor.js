import Ember from 'ember';

const { Component, get, set } = Ember;

export default Component.extend({

  classNames: ['process-editor'],

  process: undefined,

  actions: {

    addParameter() {
      const newParameter = { name: '', value: '' };
      const updatedParameters = (get(this, 'process.parameters') || []).concat(newParameter);
      set(this, 'process.parameters', updatedParameters);
    },

    removeParameter(parameter) {
      set(this, 'process.parameters', get(this, 'process.parameters').without(parameter));
    },

    updateParameter(oldParameter, newParameter) {
      const parameterPos = get(this, 'process.parameters').indexOf(oldParameter);
      const updatedParameters = get(this, 'process.parameters').slice(0, parameterPos)
        .concat(newParameter)
        .concat(get(this, 'process.parameters').slice(parameterPos + 1));
      set(this, 'process.parameters', updatedParameters);
    }

  }

});
