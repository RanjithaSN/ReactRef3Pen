import path from 'path';
import * as webpack from 'webpack';
import WriteFilePlugin from 'write-file-webpack-plugin';
import { localeCopyPlugin, localeDefinePlugin } from './webpack.plugins';
import resolve from './webpack.resolve';
import * as rules from './webpack.rules';

const { distServer } = require('./paths');

const res = (pathName: string) => path.resolve(__dirname, pathName);

const entry = res('../src/server/renderApp.jsx');

const createServerDevConfig = (): webpack.Configuration => {
  return {
    devtool: 'source-map',
    entry: ['regenerator-runtime/runtime.js', entry],
    mode: 'development',
    name: 'server',
    resolve,
    module: {
      rules: [
        rules.tsx,
        rules.jsx,
        {
          test: /\.(scss|css)$/,
          loader: 'ignore-loader'
        },
        rules.images,
        rules.font
      ]
    },
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    },
    output: {
      path: distServer,
      filename: '[name].[hash].js',
      libraryTarget: 'commonjs2',
      pathinfo: false,
      publicPath: '/'
    },
    plugins: [
      new WriteFilePlugin(),
      new webpack.HotModuleReplacementPlugin(),
      localeDefinePlugin(),
      localeCopyPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
    ],
    target: 'node'
  };
};
export default createServerDevConfig;
