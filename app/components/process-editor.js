import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({

  classNames: ['process-editor'],

  process: undefined,

  isDirty: computed.or('process.hasDirtyAttributes', '_dirtyParameters.length', '_removedParameters.length'),

  _dirtyParameters: computed.filter('process.parameters', function(parameter) {
    return get(parameter, 'hasDirtyAttributes');
  }),

  _removedParameters: computed(function() {
    return [];
  }),

  actions: {

    save() {
      this.onSave(get(this, 'process'), get(this, '_removedParameters'))
        .then(() => get(this, '_removedParameters').clear());
    },

    addParameter() {
      get(this, 'process.parameters').addObject(this.onCreateParameterDefinition());
    },

    removeParameter(parameter) {
      if (!get(parameter, 'isNew')) {
        get(this, '_removedParameters').addObject(parameter);
      }
      get(this, 'process.parameters').removeObject(parameter);
    }
  }

});
