import Ember from 'ember';
import moment from 'moment';

const { Route, get } = Ember;

export default Route.extend({

  model() {
    const newRecipe = this.store.createRecord('recipe', {
      ownerUid: get(this, 'session.currentUser.uid'),
      dateCreated: moment().toISOString(),
      dateModified: moment().toISOString()
    });
    get(newRecipe, 'ingredientGroups').addObject({ title: 'Ingredients', ingredients: [] });
    get(newRecipe, 'instructionGroups').addObject({ title: 'Instructions', instructions: [] });
    return newRecipe;
  },

  afterModel(model) {
    return model.save()
      .then(() => this.transitionTo('recipes.recipe.edit', model));
  }

});
