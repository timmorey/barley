import { module, test } from 'qunit';
import BeerRecipe from 'barley/view-models/beer-recipe';

module('Unit | view-model | BeerRecipe', {
  needs: []
});

test('it exists', function(assert) {
  const dataType = BeerRecipe.create();
  assert.ok(dataType);
});
