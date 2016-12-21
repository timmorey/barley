import computed from 'ember-computed';
import get from 'ember-metal/get';
import DS from 'ember-data';

const { Model, attr } = DS;

export default Model.extend({

  deviceId: attr(),
  deviceModel: attr(),
  type: attr(),
  temperatures: attr(),

  title: computed('deviceId', 'deviceModel', function() {
    return `${get(this, 'deviceModel')} - ${get(this, 'deviceId')}`;
  })

});
