import Ember from 'ember';

const { Component, get, run } = Ember;

export default Component.extend({

  classNames: ['ingredient-group-editor'],

  ingredientGroup: undefined,

  allowEditTitle: true,
  allowRemove: true,

  actions: {

    updateTitle(newTitle) {
      return { title: newTitle, ingredients: (get(this, 'ingredientGroup.ingredients') || []) };
    },

    addIngredient() {
      const newIngredient = { measure: '', unit: '', resource: null };
      const updatedIngredients = (get(this, 'ingredientGroup.ingredients') || []).concat(newIngredient);
      run.next(() => this.$('.ingredient-editor:last .ingredient-editor-measure-input').focus());
      return { title: get(this, 'ingredientGroup.title'), ingredients: updatedIngredients };
    },

    removeIngredient(ingredient) {
      const updatedIngredients = get(this, 'ingredientGroup.ingredients').without(ingredient);
      return { title: get(this, 'ingredientGroup.title'), ingredients: updatedIngredients };
    },

    updateIngredient(oldIngredient, newIngredient) {
      const ingredientPos = get(this, 'ingredientGroup.ingredients').indexOf(oldIngredient);
      const updatedIngredients = get(this, 'ingredientGroup.ingredients').slice(0, ingredientPos)
        .concat(newIngredient)
        .concat(get(this, 'ingredientGroup.ingredients').slice(ingredientPos + 1));
      return { title: get(this, 'ingredientGroup.title'), ingredients: updatedIngredients };
    }

  }

});
