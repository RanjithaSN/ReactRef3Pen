process.env.NO_DOC = 'true';

import LoadablePlugin from '@loadable/webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ImageminWebpWebpackPlugin from 'imagemin-webp-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import * as webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import WriteFilePlugin from 'write-file-webpack-plugin';
import { consents, distClient, selfcareSrc } from './paths';
import { localeCopyPlugin, localeDefinePlugin, manifestPlugin } from './webpack.plugins';
import resolve from './webpack.resolve';
import * as rules from './webpack.rules';

const webpackClientConfigurationForProd = (): webpack.Configuration => {

  const config: webpack.Configuration = {
    mode: 'production',
    // devtool: 'source-map',
    entry: ['./config/polyfills.js', './src/index.jsx'],
    resolve,
    stats: {
      children: false // reduce noise from mini-css-extract-plugin
    },
    module: {
      rules: [
        rules.tsx,
        rules.jsx,
        rules.scss(true),
        rules.images,
        rules.font
      ]
    },
    output: {
      path: distClient,
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js',
      publicPath: '/static/'
    },
    plugins: [
      new WriteFilePlugin(),
      manifestPlugin,
      new webpack.optimize.OccurrenceOrderPlugin(false),
      new ImageminWebpWebpackPlugin({
        config: [{
          test: /\.(jpe?g|png)/,
          options: {
            quality: 75
          }
        }],
        overrideExtension: false
      }),
      new LoadablePlugin({
        filename: 'stats.json',
        writeToDisk: true
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[chunkhash].css',
        chunkFilename: '[name].[chunkhash].css',
        ignoreOrder: true
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(selfcareSrc, 'config.json')
          },
          {
            from: path.resolve(selfcareSrc, 'sitemap.xml')
          },
          {
            from: path.resolve(selfcareSrc, 'robots.txt')
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
          },
          {
            from: path.resolve(selfcareSrc, 'benefits_config.json')
          },
          {
            from: path.resolve(selfcareSrc, 'assetlinks/sbx1-assetlinks.json'),
            to: '.well-known/assetlinks.json'
          }
        ]
      }),
      localeCopyPlugin(),
      localeDefinePlugin(),
      new webpack.HashedModuleIdsPlugin(),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.js$|\.css$/,
        threshold: 10,
        minRatio: 0.8
      })
    ],
    optimization: {
      concatenateModules: true,
      splitChunks: {
        chunks: 'all'
      },
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            // Eliminate comments
            comments: false,
            // Compression specific options
            compress: {
              // remove warnings
              warnings: false,
              // Drop console statements
              drop_console: true
            }
          }
        })
      ]
    }
  };

  return config;
};

export default webpackClientConfigurationForProd;
