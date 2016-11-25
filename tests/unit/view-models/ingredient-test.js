import { module, test } from 'qunit';
import Ingredient from 'workforce-js/view-models/ingredient';

module('Unit | view-model | Ingredient', {
  needs: []
});

test('it exists', function(assert) {
  const dataType = Ingredient.create();
  assert.ok(dataType);
});
