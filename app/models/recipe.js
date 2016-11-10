import DS from 'ember-data';
import BarleyObject from 'barley/models/abstract/barley-object';

export default BarleyObject.extend({

  ingredients: DS.hasMany('ingredient', { async: true, inverse: null }),
  instructions: DS.hasMany('instruction', { async: true, inverse: null })

});
