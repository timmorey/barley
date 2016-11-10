import Ember from 'ember';
import moment from 'moment';

const { Route, get } = Ember;

export default Route.extend({

  model() {
    return this.store.createRecord('recipe', {
      ownerUid: get(this, 'session.currentUser.uid'),
      dateCreated: moment().toISOString()
    });
  }

});
