import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({

  classNames: ['item-picker'],

  items: undefined,
  selectedItem: undefined

});
