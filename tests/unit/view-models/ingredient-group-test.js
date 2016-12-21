import { module, test } from 'qunit';
import IngredientGroup from 'barley/view-models/ingredient-group';

module('Unit | view-model | IngredientGroup', {
  needs: []
});

test('it exists', function(assert) {
  const dataType = IngredientGroup.create();
  assert.ok(dataType);
});
