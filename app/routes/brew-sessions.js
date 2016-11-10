import Ember from 'ember';
import moment from 'moment';

const { Route, set } = Ember;

export default Route.extend({

  actions: {

    save(brewSession) {
      set(brewSession, 'dateModified', moment().toISOString());
      brewSession.save()
        .then(() => this.transitionTo('brew-sessions.brew-session.edit', brewSession));
    }

  }

});
