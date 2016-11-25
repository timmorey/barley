import Ember from 'ember';
import moment from 'moment';
import ItemPicker from 'barley/components/item-picker';

const { computed, get, inject, isBlank, on, set } = Ember;

export default ItemPicker.extend({

  classNames: ['process-picker'],
  layoutName: 'components/item-picker',

  store: inject.service(),
  session: inject.service(),

  processes: computed.alias('items'),

  selectedItem: computed.alias('selectedProcess'),
  selectedProcess: computed('processes.[]', 'selectedProcessId', {
    get() {
      return (get(this, 'processes') || []).findBy('id', get(this, 'selectedProcessId'));
    },
    set(key, value) {
      set(this, 'selectedProcessId', get(value, 'id'));
      return value;
    }
  }),
  selectedProcessId: undefined,

  _initProcesses: on('init', function() {
    get(this, 'store').findAll('process')
      .then(processes => set(this, 'processes', processes));
  }),

  actions: {

    createOnEnter(select, event) {
      if (get(this, 'allowCreate') && event.keyCode === 13 && select.isOpen && !select.highlighted && !isBlank(select.searchText)) {
        const newProcess = get(this, 'store').createRecord('process', {
          title: select.searchText,
          ownerUid: get(this, 'session.currentUser.uid'),
          dateCreated: moment().toISOString(),
          dateModified: moment().toISOString()
        });
        newProcess.save()
          .then(() => select.actions.choose(newProcess));
      }
    }

  }

});
