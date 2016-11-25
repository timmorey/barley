import DS from 'ember-data';

export default DS.Model.extend({

  title: DS.attr({ defaultValue: '' }),
  ownerUid: DS.attr(),
  dateCreated: DS.attr(),
  dateModified: DS.attr(),
  version: DS.attr({ defaultValue: '0.0.0' })

});
