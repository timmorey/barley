import mathjs from 'npm:mathjs';

export function initialize() {

  // Override default tesla (T) unit with one more relevant to us
  //
  mathjs.createUnit('T', { definition: '1 tablespoon' }, { override: true });
}

export default {
  name: 'mathjs',
  initialize
};
