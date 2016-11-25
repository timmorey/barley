import Ember from 'ember';

const { Component, run, set } = Ember;

export default Component.extend({

  classNames: ['editable-string'],

  value: undefined,

  isEditing: false,

  click() {
    set(this, 'isEditing', true);
      run.next(() => this._focusInput());
  },

  actions: {

    extractValue(event) {
      return event.target.value;
    },

    focusInput() {
      run.next(() => this._focusInput());
    },

    blurOnEnter(_, event) {
      if (event.keyCode === 13) {
        set(this, 'isEditing', false);
      }
    }

  },

  _focusInput() {
    this.$('.editable-string-input').focus();
    this.$('.editable-string-input').select();
  }

});
