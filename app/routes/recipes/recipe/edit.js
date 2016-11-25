import Ember from 'ember';
import moment from 'moment';

const { Route, run, set } = Ember;

export default Route.extend({

  actions: {

    save(recipe) {
      set(recipe, 'dateModified', moment().toISOString());
      run.debounce(recipe, recipe.save, 500);
    }

  }
});
