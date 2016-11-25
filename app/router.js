import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('brew-sessions', function() {
    this.route('brew-session', { path: ':brewSession_id' }, function() {
      this.route('edit', function() {
        this.route('mash');
        this.route('boil');
      });
    });
    this.route('new');
  });
  this.route('processes', function() {
    this.route('process', { path: ':process_id'}, function() {
      this.route('edit');
    });
    this.route('new');
  });
  this.route('recipes', function() {
    this.route('recipe', { path: ':recipe_id' }, function() {
      this.route('edit');
    });
    this.route('new');
  });
  this.route('resources', function() {
    this.route('new');
    this.route('resource', { path: ':resource_id' }, function() {
      this.route('edit');
    });
  });
});

export default Router;
