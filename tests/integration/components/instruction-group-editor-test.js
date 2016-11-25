import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('instruction-group-editor', 'Integration | Component | instruction group editor', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{instruction-group-editor}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#instruction-group-editor}}
      template block text
    {{/instruction-group-editor}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
