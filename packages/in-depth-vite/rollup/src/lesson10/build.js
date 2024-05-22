// const rollup = require('rollup');
// const util = require('util');
import * as rollup from 'rollup';
import * as util from 'util';

async function build() {
  const bundle = await rollup.rollup({
    input: ['./index.js'],
  });
  const result = await bundle.generate({
    format: 'es',
  });
  console.log(result);
  // console.log(util.inspect(bundle));
}
build();