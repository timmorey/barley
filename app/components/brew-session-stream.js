import Ember from 'ember';
import BrewSessionViewModel from 'barley/view-models/brew-session';
// import MeasureViewModel from 'barley/view-models/measure';

const { Component, computed, get, inject, on, set } = Ember;

export default Component.extend({

  classNames: ['brew-session-stream'],

  store: inject.service(),

  bresSession: undefined,

  brewSessionViewModel: computed('brewSession', function() {
    const viewModel = BrewSessionViewModel.create({ content: get(this, 'brewSession') });
    get(this, 'store').findAll('resource')
      .then(resources => set(viewModel, 'resources', resources));
    get(this, 'store').findAll('process')
      .then(processes => set(viewModel, 'processes', processes));
    return viewModel;
  }),

  stream: computed.alias('brewSessionViewModel.stream'),

  _scrollToBottom: on('didInsertElement', function() {
    this.$('.brew-session-stream-list').scrollTop(this.$('.brew-session-stream-list').prop('scrollHeight'));
  }),

  actions: {

    addObservation() {
      set(this, 'brewSession.stream', (get(this, 'brewSession.stream') || []).concat({
        type: 'observation',
        timestamp: Date(),
        label: get(this, 'labelInputValue'),
        measure: get(this, 'measureInputValue')
      }));
      this.$('.brew-session-stream-input-label').select().focus();
      this.$('.brew-session-stream-list').animate({ scrollTop: this.$('.brew-session-stream-list').prop('scrollHeight') }, 'slow');
    },

    removeEvent(event) {
      set(this, 'brewSession.stream', get(this, 'brewSession.stream').without(event));
    }

  }

});
