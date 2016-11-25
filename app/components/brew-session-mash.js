import Ember from 'ember';
import BrewSessionViewModel from 'barley/view-models/brew-session';

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

  grainsGroup: computed('brewSession.grains', {
    get() {
      return { title: 'Grains', ingredients: get(this, 'brewSession.grains') };
    },
    set(key, value) {
      set(this, 'brewSession.grains', get(value, 'ingredients'));
      return value;
    }
  }),

  totalGrainMass: computed.alias('brewSessionViewModel.totalGrainMass'),

  mashThickness: computed.alias('brewSessionViewModel.mashThickness'),

  strikeVolume: computed.alias('brewSessionViewModel.strikeVolume'),

  mashTemperature: computed.alias('brewSessionViewModel.mashTemperature'),

  grainTemperature: computed.alias('brewSessionViewModel.grainTemperature'),

  strikeTemperature: computed.alias('brewSessionViewModel.strikeTemperature'),

  actions: {

    updateGrains(grainsGroup) {
      set(this, 'grainsGroup', grainsGroup);
    },

    updateMashThicknessMeasure(event) {
      set(this, 'brewSession.mashThickness', { measure: event.target.value, unit: get(this, 'brewSession.mashThickness.unit') || '' });
    },

    updateMashThicknessUnit(event) {
      set(this, 'brewSession.mashThickness', { measure: get(this, 'brewSession.mashThickness.measure') || '', unit: event.target.value });
    },

    updateMashTemperatureMeasure(event) {
      set(this, 'brewSession.mashTemperature', { measure: event.target.value, unit: get(this, 'brewSession.mashTemperature.unit') || '' });
    },

    updateMashTemperatureUnit(event) {
      set(this, 'brewSession.mashTemperature', { measure: get(this, 'brewSession.mashTemperature.measure') || '', unit: event.target.value });
    },

    updateGrainTemperatureMeasure(event) {
      set(this, 'brewSession.grainTemperature', { measure: event.target.value, unit: get(this, 'brewSession.grainTemperature.unit') || '' });
    },

    updateGrainTemperatureUnit(event) {
      set(this, 'brewSession.grainTemperature', { measure: get(this, 'brewSession.grainTemperature.measure') || '', unit: event.target.value });
    }

  }
});
