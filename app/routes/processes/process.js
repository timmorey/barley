import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({

  model(params) {
    return this.store.findRecord('process', params.process_id);
  }

});
