import DS from 'ember-data';
import BarleyObject from 'barley/models/abstract/barley-object';

export default BarleyObject.extend({

  parameters: DS.hasMany('property', { async: true, inverse: null })

});
