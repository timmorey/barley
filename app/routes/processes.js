import Ember from 'ember';
import moment from 'moment';

const { Route, RSVP: { all }, get, set } = Ember;

export default Route.extend({

  actions: {

    save(process, removedChildObjects) {
      set(process, 'dateModified', moment().toISOString());
      return get(process, 'parameters')
        .then(parameters => all(parameters.map(parameter => parameter.save())))
        .then(() => process.save())
        .then(() => all(removedChildObjects.map(child => child.destroyRecord())))
        .then(() => this.transitionTo('processes.process.edit', process));
    }

  }

});
