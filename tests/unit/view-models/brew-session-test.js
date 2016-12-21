import { module, test } from 'qunit';
import BrewSession from 'barley/view-models/brew-session';

module('Unit | view-model | BrewSession', {
  needs: []
});

test('it exists', function(assert) {
  const dataType = BrewSession.create();
  assert.ok(dataType);
});
