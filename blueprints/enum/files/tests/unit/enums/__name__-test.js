import { module, test } from 'qunit';
import <%= classifiedModuleName %> from 'workforce-js/enums/<%= dasherizedModuleName %>';

module('Unit | enum | <%= classifiedModuleName %>', {
  needs: []
});

test('it exists', function(assert) {
  assert.ok(<%= classifiedModuleName %>);
});
