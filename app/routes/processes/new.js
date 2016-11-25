import Ember from 'ember';
import moment from 'moment';

const { Route, get } = Ember;

export default Route.extend({

  model() {
    return this.store.createRecord('process', {
      ownerUid: get(this, 'session.currentUser.uid'),
      dateCreated: moment().toISOString(),
      dateModified: moment().toISOString()
    });
  },

  afterModel(model) {
    return model.save()
      .then(() => this.transitionTo('processes.process.edit', model));
  }

});
