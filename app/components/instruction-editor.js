import Ember from 'ember';

const { Component, assign, get } = Ember;

export default Component.extend({

  classNames: ['instruction-editor'],

  instruction: undefined,

  actions: {

    updateProcess(process) {
      return assign({}, get(this, 'instruction'), {
        processId: get(process, 'id'),
        parameters: (get(process, 'parameters') || []).map(processParameter => {
          return {
            name: get(processParameter, 'name'),
            type: get(processParameter, 'type')
          };
        })
      });
    },

    updateParameter(oldParameter, newParameter) {
      const parameterPos = get(this, 'instruction.parameters').indexOf(oldParameter);
      const updatedParameters = get(this, 'instruction.parameters').slice(0, parameterPos)
        .concat(newParameter)
        .concat(get(this, 'instruction.parameters').slice(parameterPos + 1));
      return { processId: get(this, 'instruction.processId'), parameters: updatedParameters };
    },

    removeParameter(parameter) {
      return { processId: get(this, 'instruction.processId'), parameters: get(this, 'instruction.parameters').without(parameter) };
    }

  }

});
