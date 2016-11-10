import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('parameter-definition-editor', 'Integration | Component | parameter definition editor', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{parameter-definition-editor}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#parameter-definition-editor}}
      template block text
    {{/parameter-definition-editor}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
