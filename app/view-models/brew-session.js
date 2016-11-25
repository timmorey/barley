import Ember from 'ember';
import IngredientViewModel from 'barley/view-models/ingredient';
import { add, subtract, multiply, divide, convert } from 'barley/utils/units';

const { ObjectProxy, computed, get } = Ember;

export default ObjectProxy.extend({

  resources: undefined,
  processes: undefined,

  totalGrainMass: computed('grains', function() {
    return (get(this, 'grains') || []).reduce((total, ingredient) => {
      return add(total, ingredient);
    });
  }),

  strikeVolume: computed('totalGrainMass', 'mashThickness', function() {
    return multiply(get(this, 'totalGrainMass'), get(this, 'mashThickness'));
  }),

  strikeWater: computed('strikeVolume', function() {
    return {
      measure: get(this, 'strikeVolume.measure'),
      unit: get(this, 'strikeVolume.unit'),
      resourceId: '-KXVlcF4yrC2QQvwdXPc'
    };
  }),

  strikeTemperature: computed('mashTemperature', 'grainTemperature', 'strikeVolume', 'resources', function() {
    const mashIngredients = get(this, 'grains').concat(get(this, 'strikeWater'));
    const mashEnergy = mashIngredients.reduce((mashEnergy, ingredient) => {
      if (mashEnergy === undefined) {
        return undefined;
      }
      const ingredientViewModel = IngredientViewModel.create({
        content: ingredient,
        resources: get(this, 'resources'),
        currentTemperature: get(this, 'mashTemperature')
      });
      if (get(ingredientViewModel, 'heatEnergy') === undefined) {
        return undefined;
      }
      return add(mashEnergy, get(ingredientViewModel, 'heatEnergy'));
    }, { measure: 0, unit: 'J' });
    const grainEnergy = get(this, 'grains').reduce((grainEnergy, ingredient) => {
      if (grainEnergy === undefined) {
        return undefined;
      }
      const ingredientViewModel = IngredientViewModel.create({
        content: ingredient,
        resources: get(this, 'resources'),
        currentTemperature: get(this, 'grainTemperature')
      });
      if (get(ingredientViewModel, 'heatEnergy') === undefined) {
        return undefined;
      }
      return add(grainEnergy, get(ingredientViewModel, 'heatEnergy'));
    }, { measure: 0, unit: 'J' });
    if (mashEnergy === undefined || grainEnergy === undefined) {
      return undefined;
    }
    const waterEnergy = subtract(mashEnergy, grainEnergy);
    const waterViewModel = IngredientViewModel.create({ content: get(this, 'strikeWater'), resources: get(this, 'resources') });
    const waterTemp = divide(divide(waterEnergy, get(waterViewModel, 'mass')), get(waterViewModel, 'resourceViewModel.specificHeatCapacity'));
    return convert(waterTemp, get(this, 'mashTemperature.unit'));
  })

});
