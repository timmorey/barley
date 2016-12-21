import Ember from 'ember';
import IngredientViewModel from 'barley/view-models/ingredient';
import IngredientGroupViewModel from 'barley/view-models/ingredient-group';
import MeasureViewModel from 'barley/view-models/measure';

const { ObjectProxy, computed, get, isPresent, set } = Ember;

export default ObjectProxy.extend({

  resources: undefined,
  processes: undefined,

  grainGroup: computed('grains', {
    get() {
      return { title: 'Grains', ingredients: get(this, 'grains') || [] };
    },
    set(key, value) {
      set(this, 'grains', get(value, 'ingredients'));
      return value;
    }
  }),

  grainGroupViewModel: computed('grains', 'resources', function() {
    return IngredientGroupViewModel.create({
      content: get(this, 'grainGroup'),
      resources: get(this, 'resources')
    });
  }),

  totalGrainMass: computed.alias('grainGroupViewModel.totalMass'),

  grainTemperature: computed('conten.grainTemperature', {
    get() {
      if (isPresent(get(this, 'content.grainTemperature'))) {
        return MeasureViewModel.create({ value: get(this, 'content.grainTemperature') });
      }
    },
    set(key, value) {
      set(this, 'content.grainTemperature', get(value, 'value'));
      return value;
    }
  }),

  mashThickness: computed('content.mashThickness', 'strikeVolume', 'totalGrainMass', {
    get() {
      if (isPresent(get(this, 'content.mashThickness'))) {
        return MeasureViewModel.create({ value: get(this, 'content.mashThickness') });
      } else if (isPresent(get(this, 'content.strikeVolume'))) {
        if (get(this, 'strikeVolume') && get(this, 'totalGrainMass')) {
          return get(this, 'strikeVolume').divideBy(get(this, 'totalGrainMass'));
        }
      }
    },
    set(key, value) {
      set(this, 'content.mashThickness', get(value, 'value'));
      set(this, 'content.strikeVolume', null);
      return value;
    }
  }),

  mashTemperature: computed(
    'content.mashTemperature',
    'strikeWaterViewModel.heatCapacity',
    'strikeTemperature',
    'grainGroupViewModel.heatCapacity',
    'grainTemperature',
    'mashGroupViewModel.heatCapacity', {
    get() {
      if (isPresent(get(this, 'content.mashTemperature'))) {
        return MeasureViewModel.create({ value: get(this, 'content.mashTemperature') });
      } else if (isPresent(get(this, 'content.strikeTemperature'))) {
        const strikeHeatCapacity = get(this, 'strikeWaterViewModel.heatCapacity');
        const strikeTemperature = get(this, 'strikeTemperature');
        const grainHeatCapacity = get(this, 'grainGroupViewModel.heatCapacity');
        const grainTemperature = get(this, 'grainTemperature');
        const mashHeatCapacity = get(this, 'mashGroupViewModel.heatCapacity');
        if (strikeHeatCapacity && strikeTemperature && grainHeatCapacity && grainTemperature && mashHeatCapacity) {
          const strikeEnergy = strikeHeatCapacity.times(strikeTemperature);
          const grainEnergy = grainHeatCapacity.times(grainTemperature);
          const mashEnergy = strikeEnergy.plus(grainEnergy);
          const mashTemp = mashEnergy.divideBy(mashHeatCapacity);
          return mashTemp.to(get(strikeTemperature, 'unit'));
        }
      }
    },
    set(key, value) {
      set(this, 'content.mashTemperature', get(value, 'value'));
      set(this, 'content.strikeTemperature', null);
      return value;
    }
  }),

  strikeVolume: computed('content.strikeVolume', 'totalGrainMass', 'mashThickness', {
    get() {
      if (isPresent(get(this, 'content.strikeVolume'))) {
        return MeasureViewModel.create({ value: get(this, 'content.strikeVolume') });
      } else if (isPresent(get(this, 'content.mashThickness'))) {
        if (get(this, 'totalGrainMass') && get(this, 'mashThickness')) {
          return get(this, 'totalGrainMass').times(get(this, 'mashThickness'));
        }
      }
    },
    set(key, value) {
      set(this, 'content.strikeVolume', get(value, 'value'));
      set(this, 'content.mashThickness', null);
      return value;
    }
  }),

  strikeWater: computed('strikeVolume', function() {
    return {
      amount: get(this, 'strikeVolume.value'),
      resourceId: '-KZc-lkFlHeWWZuB-yXt'
    };
  }),

  strikeWaterViewModel: computed('strikeWater', 'resources', function() {
    return IngredientViewModel.create({
      content: get(this, 'strikeWater'),
      resources: get(this, 'resources')
    });
  }),

  mashGroupViewModel: computed('grains', 'strikeWater', 'resources', function() {
    return IngredientGroupViewModel.create({
      content: { ingredients: get(this, 'grains').concat(get(this, 'strikeWater')) },
      resources: get(this, 'resources')
    });
  }),

  strikeTemperature: computed(
    'content.strikeTemperature',
    'mashGroupViewModel.heatCapacity',
    'mashTemperature',
    'grainGroupViewModel.heatCapacity',
    'grainTemperature',
    'strikeWaterViewModel.heatCapacity', {
    get() {
      if (isPresent(get(this, 'content.strikeTemperature'))) {
        return MeasureViewModel.create({ value: get(this, 'content.strikeTemperature') });
      } else if (isPresent(get(this, 'content.mashTemperature'))) {
        const mashHeatCapacity = get(this, 'mashGroupViewModel.heatCapacity');
        const mashTemperature = get(this, 'mashTemperature');
        const grainHeatCapacity = get(this, 'grainGroupViewModel.heatCapacity');
        const grainTemperature = get(this, 'grainTemperature');
        const strikeHeatCapacity = get(this, 'strikeWaterViewModel.heatCapacity');
        if (mashHeatCapacity && mashTemperature && grainHeatCapacity && grainTemperature && strikeHeatCapacity) {
          const mashEnergy = mashHeatCapacity.times(mashTemperature);
          const grainEnergy = grainHeatCapacity.times(grainTemperature);
          const strikeEnergy = mashEnergy.minus(grainEnergy);
          const strikeTemp = strikeEnergy.divideBy(strikeHeatCapacity);
          return strikeTemp.to(get(mashTemperature, 'unit'));
        }
      }
    },
    set(key, value) {
      set(this, 'content.strikeTemperature', get(value, 'value'));
      set(this, 'content.mashTemperature', null);
      return value;
    }
  })

});
