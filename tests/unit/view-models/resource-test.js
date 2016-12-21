import { module, test } from 'qunit';
import Resource from 'barley/view-models/resource';

module('Unit | view-model | Resource', {
  needs: []
});

test('it exists', function(assert) {
  const dataType = Resource.create();
  assert.ok(dataType);
});
