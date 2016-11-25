import Ember from 'ember';
import moment from 'moment';
import BeerRecipeViewModel from 'barley/view-models/beer-recipe';

const { Component, get, setProperties } = Ember;

export default Component.extend({

  classNames: ['brew-session-staging'],

  brewSession: undefined,

  actions: {

    updateRecipe(recipe) {
      const recipeViewModel = BeerRecipeViewModel.create({ content: recipe });
      setProperties(get(this, 'brewSession'), {
        baseRecipe: recipe,
        title: `${moment().format('YYYY MMM D')} - ${get(recipeViewModel, 'title')}`,
        grains: get(recipeViewModel, 'grains'),
        hops: get(recipeViewModel, 'hops'),
        yeast: get(recipeViewModel, 'yeast'),
        mashThickness: get(recipeViewModel, 'mashThickness'),
        mashTemperature: get(recipeViewModel, 'mashTemperature'),
        mashDuration: get(recipeViewModel, 'mashDuration')
      });
    }

  }
});
