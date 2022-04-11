process.env.NODE_ENV = 'development';
process.env.NO_DOC = 'true';

import LoadablePlugin from '@loadable/webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ImageminWebpWebpackPlugin from 'imagemin-webp-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import webpack from 'webpack';
import WriteFilePlugin from 'write-file-webpack-plugin';
import { consents, distClient, selfcareSrc } from './paths';
import * as plugins from './webpack.plugins';
import resolve from './webpack.resolve';
import * as rules from './webpack.rules';

export default () => ({
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false',
    './config/polyfills.js',
    './src/index.jsx'
  ],
  name: 'client',
  resolve,
  module: {
    rules: [
      rules.tsx,
      rules.jsx,
      rules.scss(false),
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
    path: distClient,
    filename: '[name].[hash].js',
    publicPath: '/static/'
  },
  plugins: [
    new WriteFilePlugin(),
    plugins.manifestPlugin,
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new LoadablePlugin({
      filename: 'stats.json',
      writeToDisk: true
    }),
    new ImageminWebpWebpackPlugin({
      config: [{
        test: /\.(jpe?g|png)/,
        options: {
          quality: 75
        }
      }],
      overrideExtension: false
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(selfcareSrc, 'config.json')
        },
        {
          from: path.resolve(consents, 'privacy_policy.json')
        },
        {
          from: path.resolve(consents, 'right_to_regret.json')
        },
        {
          from: path.resolve(consents, 'terms.json')
        },
        {
          from: path.resolve(selfcareSrc, 'apple-app-site-association')
        }
      ]
    }),
    plugins.localeDefinePlugin(),
    plugins.localeCopyPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
});
