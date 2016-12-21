import { module, test } from 'qunit';
import Measure from 'barley/view-models/measure';

module('Unit | view-model | Measure', {
  needs: []
});

test('it exists', function(assert) {
  const dataType = Measure.create();
  assert.ok(dataType);
});
