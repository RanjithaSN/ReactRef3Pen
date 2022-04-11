declare module 'webpack-bundle-analyzer' {
  import * as webpack from 'webpack';

  interface Options {
    analyzerMode: string;
    openAnalyzer: boolean;
  }

  export class BundleAnalyzerPlugin extends webpack.Plugin {
    public constructor(options: Options);
  }
}
