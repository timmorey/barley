import Ember from 'ember';
import moment from 'moment';

const { Route, set } = Ember;

export default Route.extend({

  actions: {

    save(resource) {
      set(resource, 'dateModified', moment().toISOString());
      resource.save()
        .then(() => this.transitionTo('resources.resource.edit', resource));
    }

  }

});
