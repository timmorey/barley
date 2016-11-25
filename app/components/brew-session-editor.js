import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({

  tagName: 'form',
  classNames: ['brew-session-editor'],

  brewSession: undefined

});
