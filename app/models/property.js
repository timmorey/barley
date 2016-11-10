import Ember from 'ember';
import DS from 'ember-data';
import PropertyType from 'barley/enums/property-type';

const { setProperties } = Ember;

export default DS.Model.extend({

  name: DS.attr(),
  type: DS.attr(),

  measure: DS.attr('number'),
  unit: DS.attr({ defaultValue: null }),

  ingredients: DS.hasMany('ingredient', { async: true, inverse: null }),

  setMeasurementValue(measure, unit) {
    setProperties(this, {
      type: PropertyType.Measurement,
      measure: measure,
      unit: unit
    });
  },

  setIngredientsValue(ingredients) {
    setProperties(this, {
      type: PropertyType.IngredientList,
      ingredients: ingredients
    });
  }

});
