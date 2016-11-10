import Ember from 'ember';

const { Route, RSVP: { hash }, get } = Ember;

export default Route.extend({

  model() {
    return hash({
      brewSessions: this.store.query('brew-session', {
        orderBy: 'ownerUid',
        equalTo: get(this, 'session.currentUser.uid')
      }),
      recipes: this.store.query('recipe', {
        orderBy: 'ownerUid',
        equalTo: get(this, 'session.currentUser.uid')
      }),
      processes: this.store.query('process', {
        orderBy: 'ownerUid',
        equalTo: get(this, 'session.currentUser.uid')
      }),
      resources: this.store.query('resource', {
        orderBy: 'ownerUid',
        equalTo: get(this, 'session.currentUser.uid')
      })
    });
  },

  actions: {

    createBrewSession() {
      this.transitionTo('brew-sessions.new');
    },

    openBrewSession(session) {
      this.transitionTo('brew-sessions.brew-session.edit', session);
    },

    createRecipe() {
      this.transitionTo('recipes.new');
    },

    openRecipe(recipe) {
      this.transitionTo('recipes.recipe.edit', recipe);
    },

    createProcess() {
      this.transitionTo('processes.new');
    },

    openProcess(process) {
      this.transitionTo('processes.process.edit', process);
    },

    createResource() {
      this.transitionTo('resources.new');
    },

    openResource(resource) {
      this.transitionTo('resources.resource.edit', resource);
    }

  }
});
