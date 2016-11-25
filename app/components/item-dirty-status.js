import Ember from 'ember';
import moment from 'moment';

const { Component, computed, get, on, run, set } = Ember;

export default Component.extend({

  classNames: ['item-dirty-status'],
  classNameBindings: ['statusClassName'],
  attributeBindings: ['title'],

  item: undefined,

  statusClassName: computed('item.isError', 'item.hasDirtyAttributes', function() {
    if (get(this, 'item.isError')) {
      return 'error';
    } else if (get(this, 'item.hasDirtyAttributes')) {
      return 'dirty';
    }
    return 'clean';
  }),

  title: computed('item.isError', 'item.errors.[]', 'item.hasDirtyAttributes', '_dateModifiedFromNow', function() {
    if (get(this, 'item.isError')) {
      return get(this, 'item.errors.firstObject');
    } else if (get(this, 'item.hasDirtyAttributes')) {
      return `Last saved ${get(this, '_dateModifiedFromNow')}`;
    }
    return 'Up-to-date';
  }),

  _dateModifiedFromNow: computed('item.dateModified', function() {
    return moment(get(this, 'item.dateModified')).fromNow();
  }).volatile(),

  _updateDateModifiedFromNow: on('init', function() {
    set(this, '_updateDateModifiedFromNowTick', run.later(() => {
      this.notifyPropertyChange('_dateModifiedFromNow');
      this._updateDateModifiedFromNow();
    }, 1000));
  }),

  _stopUpdatingDateModifiedFromNow: on('willDestroyElement', function() {
    run.cancel(get(this, '_updateDateModifiedFromNowTick'));
  })

});
