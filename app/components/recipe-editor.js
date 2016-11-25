import Ember from 'ember';

const { Component, get, set } = Ember;

export default Component.extend({

  classNames: ['recipe-editor'],

  recipe: undefined,

  actions: {

    addIngredientGroup() {
      const newIngredientGroup = { title: 'New ingredient group', ingredients: [] };
      const updatedInredientGroups = (get(this, 'recipe.ingredientGroups') || []).concat(newIngredientGroup);
      set(this, 'recipe.ingredientGroups', updatedInredientGroups);
    },

    removeIngredientGroup(ingredientGroup) {
      set(this, 'recipe.ingredientGroups', get(this, 'recipe.ingredientGroups').without(ingredientGroup));
    },

    updateIngredientGroup(oldIngredientGroup, newIngredientGroup) {
      const ingredientGroupPos = get(this, 'recipe.ingredientGroups').indexOf(oldIngredientGroup);
      const updatedIngredientGroups = get(this, 'recipe.ingredientGroups').slice(0, ingredientGroupPos)
        .concat(newIngredientGroup)
        .concat(get(this, 'recipe.ingredientGroups').slice(ingredientGroupPos + 1));
      set(this, 'recipe.ingredientGroups', updatedIngredientGroups);
    },

    addInstructionGroup() {
      const newInstructionGroup = { title: 'New instruction group', instructions: [] };
      const updatedInstructionGroups = (get(this, 'recipe.instructionGroups') || []).concat(newInstructionGroup);
      set(this, 'recipe.instructionGroups', updatedInstructionGroups);
    },

    removeInstructionGroup(instructionGroup) {
      set(this, 'recipe.instructionGroups', get(this, 'recipe.instructionGroups').without(instructionGroup));
    },

    updateInstructionGroup(oldInstructionGroup, newInstructionGroup) {
      const instructionGroupPos = get(this, 'recipe.instructionGroups').indexOf(oldInstructionGroup);
      const updatedInstructionGroups = get(this, 'recipe.instructionGroups').slice(0, instructionGroupPos)
        .concat(newInstructionGroup)
        .concat(get(this, 'recipe.instructionGroups').slice(instructionGroupPos + 1));
      set(this, 'recipe.instructionGroups', updatedInstructionGroups);
    },

  }

});
