import Ember from 'ember';
import IngredientViewModel from 'barley/view-models/ingredient';
import MeasureViewModel from 'barley/view-models/measure';

const { ObjectProxy, computed, get } = Ember;

export default ObjectProxy.extend({

  resources: undefined,

  ingredientViewModels: computed('ingredients', 'resources', function() {
    return get(this, 'ingredients').map(ingredient =>
      IngredientViewModel.create({
        content: ingredient,
        resources: get(this, 'resources')
      }));
  }),

  heatCapacity: computed('ingredientViewModels.@each.heatCapacity', function() {
    if (get(this, 'ingredientViewModels.length')) {
      return get(this, 'ingredientViewModels')
        .mapBy('heatCapacity')
        .reduce((total, heatCapacity) => {
          if (total && heatCapacity) {
            return total.plus(heatCapacity);
          }
        });
    } else {
      return MeasureViewModel.create({ value: '0 J / degC' });
    }
  }),

  totalMass: computed('ingredientViewModels.@each.mass', function() {
    if (get(this, 'ingredientViewModels.length')) {
      return get(this, 'ingredientViewModels')
        .mapBy('mass')
        .reduce((total, mass) => {
          if (total && mass) {
            return total.plus(mass);
          }
        });
    } else {
      return MeasureViewModel.create({ value: '0 g' });
    }
  })

});
