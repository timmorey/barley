import Ember from 'ember';

const { Route, get } = Ember;

export default Route.extend({

  beforeModel() {
    return this.get('session').fetch().catch(() => {});
  },

  redirect() {
    if (!get(this, 'session.isAuthenticated')) {
      this.transitionTo('brew-sessions.new');
    }
  },

  actions: {

    goHome() {
      if (get(this, 'session.isAuthenticated')) {
        this.transitionTo('index');
      } else {
        this.transitionTo('brew-sessions.new');
      }
    },

    signIn() {
      this.get('session').open('firebase', { provider: 'github' })
        .then(() => this.transitionTo('index'));
    },

    signOut: function() {
      this.get('session').close();
      this.transitionTo('brew-sessions.new');
    },

    createIngredient(options) {
      return this.store.createRecord('ingredient', options);
    },

    createProcessParameterDefinition(options) {
      return this.store.createRecord('property', options);
    },

    searchRecipes(text) {
      return this.store.findAll('recipe')
        .then(recipes => recipes.filter(recipe => get(recipe, 'title').indexOf(text) !== -1));
    }

  }

});
