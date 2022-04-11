declare module 'webpack-hot-server-middleware' {
  import * as express from 'express';
  import * as webpack from 'webpack';

  export default function webpackHotServerMiddleware(
    compiler: webpack.Compiler | webpack.MultiCompiler
  ): express.Handler;
}
