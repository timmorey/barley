import Ember from 'ember';

const { Component, get, set } = Ember;

export default Component.extend({

  classNames: ['resource-editor'],

  resource: undefined,

  actions: {

    addProperty() {
      const newProperty = { name: '', value: '' };
      const updatedProperties = (get(this, 'resource.properties') || []).concat(newProperty);
      set(this, 'resource.properties', updatedProperties);
    },

    removeProperty(property) {
      set(this, 'resource.properties', get(this, 'resource.properties').without(property));
    },

    updateProperty(oldProperty, newProperty) {
      const propertyPos = get(this, 'resource.properties').indexOf(oldProperty);
      const updatedProperties = get(this, 'resource.properties').slice(0, propertyPos)
        .concat(newProperty)
        .concat(get(this, 'resource.properties').slice(propertyPos + 1));
      set(this, 'resource.properties', updatedProperties);
    }

  }

});
