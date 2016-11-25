import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ingredient-group-editor', 'Integration | Component | ingredient group editor', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ingredient-group-editor}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ingredient-group-editor}}
      template block text
    {{/ingredient-group-editor}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
