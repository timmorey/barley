import { module, test } from 'qunit';
import PropertyType from 'barley/enums/property-type';

module('Unit | enum | PropertyType', {
  needs: []
});

test('it exists', function(assert) {
  assert.ok(PropertyType);
});
