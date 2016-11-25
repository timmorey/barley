import Ember from 'ember';

const { ObjectProxy, computed, get, getProperties } = Ember;

export default ObjectProxy.extend({

  grains: computed('ingredientGroups', function() {
    const grainGroup = this._ingredientGroupCalled('grains');
    return grainGroup ? get(grainGroup, 'ingredients') : [];
  }),

  hops: computed('ingredientGroups', function() {
    const hopGroup = this._ingredientGroupCalled('hops');
    return hopGroup ? get(hopGroup, 'ingredients') : [];
  }),

  yeast: computed('ingredientGroups', function() {
    const yeastGroup = this._ingredientGroupCalled('yeast');
    return yeastGroup ? get(yeastGroup, 'ingredients.0') : undefined;
  }),

  mashThickness: computed('instructionGroups', function() {
    if (get(this, '_mashInstruction')) {
      const param = this._parameterCalled('thickness', get(this, '_mashInstruction'));
      return getProperties(param, 'measure', 'unit');
    }
  }),

  mashTemperature: computed('instructionGroups', function() {
    if (get(this, '_mashInstruction')) {
      const param = this._parameterCalled('temperature', get(this, '_mashInstruction'));
      return getProperties(param, 'measure', 'unit');
    }
  }),

  mashDuration: computed('instructionGroups', function() {
    if (get(this, '_mashInstruction')) {
      const param = this._parameterCalled('time', get(this, '_mashInstruction'));
      return getProperties(param, 'measure', 'unit');
    }
  }),

  _mashInstruction: computed('instructionGroups', function() {
    const mashProcessId = '-KXVnVnIQtpgBqGZsufh';
    return (get(this, 'instructionGroups') || [])
      .reduce((instructions, instructionGroup) => instructions.concat(get(instructionGroup, 'instructions') || []), [])
      .findBy('processId', mashProcessId);
  }),

  _ingredientGroupCalled(title) {
    return (get(this, 'ingredientGroups') || [])
      .find(ingredientGroup => get(ingredientGroup, 'title').trim().toUpperCase() === title.trim().toUpperCase());
  },

  _parameterCalled(title, instruction) {
    return (get(instruction, 'parameters') || [])
      .find(parameter => get(parameter, 'name').trim().toUpperCase() === title.trim().toUpperCase());
  }

});
