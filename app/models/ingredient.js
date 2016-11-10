import DS from 'ember-data';

export default DS.Model.extend({

  measure: DS.attr(),
  unit: DS.attr(),
  resource: DS.belongsTo('resource', { async: true, inverse: false })

});
