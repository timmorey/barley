import { module, test } from 'qunit';
import Resource from 'workforce-js/view-models/resource';

module('Unit | view-model | Resource', {
  needs: []
});

test('it exists', function(assert) {
  const dataType = Resource.create();
  assert.ok(dataType);
});
