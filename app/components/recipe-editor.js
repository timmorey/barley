import Ember from 'ember';

const { computed, get } = Ember;

export default Ember.Component.extend({

  classNames: ['recipe-editor'],

  recipe: undefined,

  isDirty: computed.or('recipe.hasDirtyAttributes', '_dirtyIngredients.length', '_removedIngredients.length'),

  _removedChildObjects: computed.alias('_removedIngredients'),

  _dirtyIngredients: computed.filterBy('recipe.ingredients', 'hasDirtyAttributes'),

  _removedIngredients: computed(function() {
    return [];
  }),

  actions: {

    save() {
      this.onSave(get(this, 'recipe'), get(this, '_removedChildObjects'))
        .then(() => get(this, '_removedChildObjects').clear());
    },

    addIngredient() {
      get(this, 'recipe.ingredients').addObject(this.onCreateIngredient());
    },

    removeIngredient(ingredient) {
      if (!get(ingredient, 'isNew')) {
        get(this, '_removedIngredients').addObject(ingredient);
      }
      get(this, 'recipe.ingredients').removeObject(ingredient);
    }

  }

});
