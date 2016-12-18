import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({

  beforeModel() {
    return this.get('session').fetch().catch(() => {});
  },

  actions: {

    goHome() {
      this.transitionTo('index');
    },

    signIn() {
      this.get('session').open('firebase', { provider: 'google' })
        .then(() => this.transitionTo('index'));
    },

    signOut: function() {
      this.get('session').close();
      this.transitionTo('brew-sessions.new');
    }

  }

});
