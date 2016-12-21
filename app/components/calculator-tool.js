import Ember from 'ember';

const { Component, computed, get, inject, isPresent, on, set } = Ember;

export default Component.extend({

  classNames: ['calculator-tool'],

  calculatorService: inject.service('components/calculator-tool'),

  inputValue: '',
  historyItems: computed.alias('calculatorService.historyItems'),

  curHistorIndex: 0,

  _listenForArrowKeys: on('didInsertElement', function() {
    this.$('.calculator-tool-input').keydown(event => {
      if (event.keyCode === 38) { // up arrow
        set(this, 'curHistorIndex', Math.max(get(this, 'curHistorIndex') - 1, 0));
        if (get(this, `historyItems.${get(this, 'curHistorIndex')}`)) {
          set(this, 'inputValue', get(this, `historyItems.${get(this, 'curHistorIndex')}.input`));
        }
      } else if (event.keyCode === 40) { // down arrow
        set(this, 'curHistorIndex', Math.min(get(this, 'curHistorIndex') + 1, get(this, 'historyItems.length')));
        if (get(this, `historyItems.${get(this, 'curHistorIndex')}`)) {
          set(this, 'inputValue', get(this, `historyItems.${get(this, 'curHistorIndex')}.input`));
        }
      }
    });
  }),

  _initCurHistoryIndex: on('init', function() {
    set(this, 'curHistorIndex', get(this, 'historyItems.length'));
  }),

  _scrollToBottom: on('didInsertElement', function() {
    this.$('.calculator-tool-history').animate({ scrollTop: this.$('.calculator-tool-history').prop('scrollHeight')}, 250);
  }),

  _focusInput: on('didInsertElement', function() {
    this.$('.calculator-tool-input').focus();
  }),

  actions: {

    evaluate() {
      if (isPresent(get(this, 'inputValue').trim())) {
        get(this, 'calculatorService').evaluate(get(this, 'inputValue'));
        set(this, 'inputValue', '');
        this._scrollToBottom(true);
        set(this, 'curHistorIndex', get(this, 'historyItems.length'));
      }
    }

  }
});
