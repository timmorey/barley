import DS from 'ember-data';
import BarleyObject from 'barley/models/abstract/barley-object';

export default BarleyObject.extend({

  version: DS.attr({ defaultValue: '0.0.0' }),

  baseRecipe: DS.belongsTo('recipe', { async: true, inverse: null }),

  grains: DS.attr({ defaultValue: () => [] }),
  hops: DS.attr({ defaultValue: () => [] }),
  yeast: DS.attr({ defaultValue: null }),

  mashThickness: DS.attr({ defaultValue: null }),
  mashTemperature: DS.attr({ defaultValue: null }),
  mashDuration: DS.attr({ defaultValue: null }),

  grainTemperature: DS.attr({ defaultValue: null }),

  strikeVolume: DS.attr({ defaultValue: null }),
  strikeTemperature: DS.attr({ defaultValue: null }),

  stream: DS.attr({ defaultValue: () => [] })

});
