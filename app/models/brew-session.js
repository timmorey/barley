import DS from 'ember-data';
import BarleyObject from 'barley/models/abstract/barley-object';

export default BarleyObject.extend({

  recipe: DS.belongsTo('recipe', { async: true, inverse: null })

});
