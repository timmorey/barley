import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('brew-session-boil', 'Integration | Component | brew session boil', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{brew-session-boil}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#brew-session-boil}}
      template block text
    {{/brew-session-boil}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
