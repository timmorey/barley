import DS from 'ember-data';

export default DS.Model.extend({

  title: DS.attr(),
  ownerUid: DS.attr(),
  dateCreated: DS.attr(),
  dateModified: DS.attr()

});
