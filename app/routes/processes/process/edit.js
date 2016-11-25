import Ember from 'ember';
import moment from 'moment';

const { Route, run, set } = Ember;

export default Route.extend({

  actions: {

    save(process) {
      set(process, 'dateModified', moment().toISOString());
      run.debounce(process, process.save, 500);
    }

  }
});
