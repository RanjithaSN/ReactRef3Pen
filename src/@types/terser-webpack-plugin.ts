declare module 'terser-webpack-plugin' {
  import * as webpack from 'webpack';

  interface Options {
    terserOptions: any;
  }

  export default class TerserWebpackPlugin extends webpack.Plugin {
    public constructor(options: Options);
  }
}
