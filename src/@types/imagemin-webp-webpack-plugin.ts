/* eslint-disable @typescript-eslint/explicit-member-accessibility */
declare module 'imagemin-webp-webpack-plugin' {
  import { Compiler } from 'webpack';

  interface Options {
    config: {
      test: string | RegExp,
      options: {
        quality: number
      }
    }[],
    overrideExtension: boolean
  }
  export default class ImageminWebpWebpackPlugin {
    constructor(options: Options);
    apply(compiler: Compiler): void;
  }
}
