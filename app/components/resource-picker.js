import Ember from 'ember';
import moment from 'moment';
import ItemPicker from 'barley/components/item-picker';

const { computed, get, inject, isBlank, on, set } = Ember;

export default ItemPicker.extend({

  classNames: ['resource-picker'],
  layoutName: 'components/item-picker',

  store: inject.service(),
  session: inject.service(),

  resources: computed.alias('items'),

  selectedItem: computed.alias('selectedResource'),
  selectedResource: computed('resources.[]', 'selectedResourceId', {
    get() {
      return (get(this, 'resources') || []).findBy('id', get(this, 'selectedResourceId'));
    },
    set(key, value) {
      set(this, 'selectedResourceId', get(value, 'id'));
      return value;
    }
  }),
  selectedResourceId: undefined,

  _initResources: on('init', function() {
    get(this, 'store').findAll('resource')
      .then(resources => set(this, 'resources', resources));
  }),

  actions: {

    createOnEnter(select, event) {
      if (get(this, 'allowCreate') && event.keyCode === 13 && select.isOpen && !select.highlighted && !isBlank(select.searchText)) {
        const newResource = get(this, 'store').createRecord('resource', {
          title: select.searchText,
          ownerUid: get(this, 'session.currentUser.uid'),
          dateCreated: moment().toISOString(),
          dateModified: moment().toISOString()
        });
        newResource.save()
          .then(() => select.actions.choose(newResource));
      }
    }

  }
});
