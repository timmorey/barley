import Ember from 'ember';
import moment from 'moment';

const { Route, RSVP: { all }, get, set } = Ember;

export default Route.extend({

  actions: {

    save(recipe, removedChildObjects) {
      set(recipe, 'dateModified', moment().toISOString());
      return get(recipe, 'ingredients')
        .then(ingredients => all(ingredients.map(ingredient => ingredient.save())))
        .then(() => recipe.save())
        .then(() => all(removedChildObjects.map(child => child.destroyRecord())))
        .then(() => this.transitionTo('recipes.recipe.edit', recipe));
    }

  }

});
