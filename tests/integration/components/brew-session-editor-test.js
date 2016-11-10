import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('brew-session-editor', 'Integration | Component | brew session editor', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{brew-session-editor}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#brew-session-editor}}
      template block text
    {{/brew-session-editor}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
