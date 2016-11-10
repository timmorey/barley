import { module, test } from 'qunit';
import <%= classifiedModuleName %> from 'workforce-js/view-models/<%= dasherizedModuleName %>';

module('Unit | view-model | <%= classifiedModuleName %>', {
  needs: []
});

test('it exists', function(assert) {
  const dataType = <%= classifiedModuleName %>.create();
  assert.ok(dataType);
});
