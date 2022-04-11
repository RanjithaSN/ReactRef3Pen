// eslint-disable-next-line @typescript-eslint/no-var-requires
require('@babel/register')({
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
});
require('core-js/stable');
require('regenerator-runtime/runtime');
require('./build.ts');
