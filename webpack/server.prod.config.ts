import path from 'path';
import * as webpack from 'webpack';
import WriteFilePlugin from 'write-file-webpack-plugin';
import createServerDevConfig from './server.dev.config';

const res = (pathName: string) => path.resolve(__dirname, pathName);

const entry = res('../src/server/server.prod.ts');

const createServerConfig = (): webpack.Configuration => {
  const devConfig = createServerDevConfig();
  return {
    ...devConfig,
    devtool: undefined,
    entry: ['regenerator-runtime/runtime.js', entry],
    mode: 'production',
    output: {
      path: devConfig.output.path,
      filename: 'main.js',
      libraryTarget: 'commonjs2'
    },
    optimization: {
      concatenateModules: true
    },
    plugins: [
      new WriteFilePlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(false),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
    ]

  };
};

export default createServerConfig;
