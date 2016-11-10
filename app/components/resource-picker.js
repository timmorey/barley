import Ember from 'ember';
import ItemPicker from 'barley/components/item-picker';

const { computed, get, inject, on, set } = Ember;

export default ItemPicker.extend({

  classNames: ['resource-picker'],
  layoutName: 'components/item-picker',

  store: inject.service(),

  resources: computed.alias('items'),
  selectedResource: computed.alias('selectedItem'),

  _initResources: on('init', function() {
    get(this, 'store').findAll('resource')
      .then(resources => set(this, 'resources', resources));
  })
});
