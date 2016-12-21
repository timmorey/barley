import Ember from 'ember';
import IngredientGroupViewModel from 'barley/view-models/ingredient-group';

const { Component, computed, get, inject, run, set } = Ember;

export default Component.extend({

  classNames: ['ingredient-group-editor'],

  store: inject.service(),

  ingredientGroup: undefined,

  allowEditTitle: true,
  allowRemove: true,
  showTotal: false,

  ingredientGroupViewModel: computed('ingredientGroup', function() {
    const viewModel = IngredientGroupViewModel.create({ content: get(this, 'ingredientGroup') });
    get(this, 'store').findAll('resource')
      .then(resources => set(viewModel, 'resources', resources));
    return viewModel;
  }),

  total: computed.alias('ingredientGroupViewModel.totalMass'),

  actions: {

    updateTitle(newTitle) {
      return { title: newTitle, ingredients: (get(this, 'ingredientGroup.ingredients') || []) };
    },

    addIngredient() {
      const newIngredient = { amount: '', resourceId: '' };
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
