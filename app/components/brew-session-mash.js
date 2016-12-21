import Ember from 'ember';
import BrewSessionViewModel from 'barley/view-models/brew-session';
import MeasureViewModel from 'barley/view-models/measure';

const { Component, computed, get, inject, set } = Ember;

export default Component.extend({

  classNames: ['brew-session-mash'],

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

  grainGroup: computed.alias('brewSessionViewModel.grainGroup'),
  totalGrainMass: computed.alias('brewSessionViewModel.totalGrainMass'),
  grainTemperature: computed.alias('brewSessionViewModel.grainTemperature'),
  mashThickness: computed.alias('brewSessionViewModel.mashThickness'),
  mashTemperature: computed.alias('brewSessionViewModel.mashTemperature'),
  strikeVolume: computed.alias('brewSessionViewModel.strikeVolume'),
  strikeTemperature: computed.alias('brewSessionViewModel.strikeTemperature'),

  actions: {

    updateGrains(grainGroup) {
      set(this, 'grainGroup', grainGroup);
    },

    updateMashThickness(event) {
      set(this, 'mashThickness', MeasureViewModel.create({ value: event.target.value }));
    },

    updateMashTemperature(event) {
      set(this, 'mashTemperature', MeasureViewModel.create({ value: event.target.value }));
    },

    updateGrainTemperature(event) {
      set(this, 'grainTemperature', MeasureViewModel.create({ value: event.target.value }));
    },

    updateStrikeVolume(event) {
      set(this, 'strikeVolume', MeasureViewModel.create({ value: event.target.value }));
    },

    updateStrikeTemperature(event) {
      set(this, 'strikeTemperature', MeasureViewModel.create({ value: event.target.value }));
    }

  }
});
