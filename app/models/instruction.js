import DS from 'ember-data';

export default DS.Model.extend({

  process: DS.belongsTo('process', { async: true, inverse: false }),
  parameters: DS.hasMany('process-parameter', { async: true, inverse: false }),
  description: DS.attr()

});
