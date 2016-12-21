import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({

  classNames: 'mash-tun',

  sensor: undefined,

  temps: computed('sensor.temperatures', function() {
    if (get(this, 'sensor')) {
      return Object.keys(get(this, 'sensor.temperatures')).map((timestamp) => {
        return { timestamp: new Date(timestamp), temperature: get(this, `sensor.temperatures.${timestamp}`) };
      });
    }
    return [];
  }),

  sortedTemps: computed('temps.[]', function() {
    return get(this, 'temps').sortBy('timestamp');
  }),
  latestTemp: computed.alias('sortedTemps.lastObject'),

  datasets: computed('temps.[]', function() {
    let sets = [];
    let setstart = 0;
    for (let i = 1; i < get(this, 'sortedTemps.length'); i++) {
      let prevTime = get(this, `sortedTemps.${i - 1}.timestamp`).getTime();
      let nextTime = get(this, `sortedTemps.${i}.timestamp`).getTime();
      if (nextTime - prevTime > 60000) {
        sets.addObject(get(this, 'sortedTemps').slice(setstart, i));
        setstart = i;
      }
    }
    sets.addObject(get(this, 'sortedTemps').slice(setstart));
    return sets;
  }),

  tempTimeSeries: computed('datasets.[]', function() {
    return get(this, 'datasets').reduce((tempData, dataset, datasetIndex) => {
      return tempData.concat(dataset.map((tempReading) => {
        return {
          time: get(tempReading, 'timestamp'),
          value: Number(get(tempReading, 'temperature').split(' ')[0]),
          label: `session ${datasetIndex}`
        };
      }));
    }, []);
  })

});
