import Ember from 'ember';
import ItemPicker from 'barley/components/item-picker';

const { computed, get, inject, on, set } = Ember;

export default ItemPicker.extend({

  classNames: ['recipe-picker'],
  layoutName: 'components/item-picker',

  store: inject.service(),
  session: inject.service(),

  recipes: computed.alias('items'),

  selectedItem: computed.alias('selectedRecipe'),
  selectedRecipe: computed('recipes.[]', 'selectedRecipeId', {
    get() {
      return (get(this, 'recipes') || []).findBy('id', get(this, 'selectedRecipeId'));
    },
    set(key, value) {
      set(this, 'selectedRecipeId', get(value, 'id'));
      return value;
    }
  }),
  selectedRecipeId: undefined,

  _initRecipes: on('init', function() {
    get(this, 'store').findAll('recipe')
      .then(recipes => set(this, 'recipes', recipes));
  }),

  actions: {

    createOnEnter() {
      // No-op
    }

  }

});
