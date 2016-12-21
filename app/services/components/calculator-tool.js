import Ember from 'ember';
import mathjs from 'npm:mathjs';

const { Service, computed, get } = Ember;

export default Service.extend({

  historyItems: computed(function() {
    return [];
  }),

  _scope: computed(function() {
    return {};
  }),

  evaluate(input) {
    let output, error;
    try {
      output = mathjs.eval(input, get(this, '_scope'));
    } catch (e) {
      error = e.message;
    }
    get(this, 'historyItems').addObject({ input, output, error });
  }

});
