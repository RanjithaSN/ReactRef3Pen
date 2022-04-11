import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import WriteFilePlugin from 'write-file-webpack-plugin';

const outputPath = path.resolve(__dirname, '../dist/sw');

fs.mkdirSync(outputPath.toString(), {
  recursive: true
});

interface AppConfigOutput extends webpack.Output {
  publicPath: string;
}

interface AppWebpackConfiguration extends webpack.Configuration {
  output: AppConfigOutput;
}

const serviceWorkerDevConfiguration: AppWebpackConfiguration = {
  devtool: 'source-map',
  entry: [path.resolve(__dirname, '../src/service-worker/sw.ts')],
  mode: 'development',
  module: {
    rules: [
      {
        enforce: 'pre',
        exclude: /node_modules/,
        loaders: ['source-map-loader'],
        test: /\.js$/
      },
      {
        exclude: /node_modules/,
        loaders: ['babel-loader'],
        test: /\.tsx?$/
      },
      {
        exclude: /node_modules/,
        loaders: ['json-loader'],
        test: /\.json$/
      }
    ]
  },
  name: 'serviceWorker',
  output: {
    chunkFilename: 'sw.js',
    filename: 'sw.js',
    globalObject: 'this',
    path: outputPath,
    pathinfo: false,
    publicPath: '/'
  },
  plugins: [new WriteFilePlugin(), new webpack.DefinePlugin({
    APP_VERSION: parseInt(process.env.BUILD_ID || '1', 10)
  })],
  resolve: {
    extensions: ['.mjs', '.js', '.json', '.jsx', '.ts', '.tsx'],
    modules: ['node_modules']
  },
  target: 'web'
};

export default serviceWorkerDevConfiguration;
