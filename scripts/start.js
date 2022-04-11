/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
require('@babel/register')({
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
});
require('core-js/stable');
require('regenerator-runtime/runtime');
require('../src/server/server.dev.ts');
