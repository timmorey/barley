import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({

  classNames: ['instruction-group-editor'],

  instructionGroup: undefined,

  actions: {

    addInstruction() {
      const newInstruction = { measure: '', unit: '', resource: null };
      const updatedInstructions = (get(this, 'instructionGroup.instructions') || []).concat(newInstruction);
      return { title: get(this, 'instructionGroup.title'), instructions: updatedInstructions };
    },

    removeInstruction(instruction) {
      const updatedInstructions = get(this, 'instructionGroup.instructions').without(instruction);
      return { title: get(this, 'instructionGroup.title'), instructions: updatedInstructions };
    },

    updateInstruction(oldInstruction, newInstruction) {
      const instructionPos = get(this, 'instructionGroup.instructions').indexOf(oldInstruction);
      const updatedInstructions = get(this, 'instructionGroup.instructions').slice(0, instructionPos)
        .concat(newInstruction)
        .concat(get(this, 'instructionGroup.instructions').slice(instructionPos + 1));
      return { title: get(this, 'instructionGroup.title'), instructions: updatedInstructions };
    }

  }
});
