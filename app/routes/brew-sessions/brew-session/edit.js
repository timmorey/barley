import Ember from 'ember';
import moment from 'moment';

const { Route, run, set } = Ember;

export default Route.extend({

  actions: {

    save(brewSession) {
      set(brewSession, 'dateModified', moment().toISOString());
      run.debounce(brewSession, brewSession.save, 500);
    }

  }
});
