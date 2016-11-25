import Ember from 'ember';
import moment from 'moment';

const { Route, run, set } = Ember;

export default Route.extend({

  actions: {

    save(resource) {
      set(resource, 'dateModified', moment().toISOString());
      run.debounce(resource, resource.save, 500);
    }

  }
});
