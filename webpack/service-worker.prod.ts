import webpack from 'webpack';
import serviceWorkerDevConfiguration from './service-worker.dev';

const serviceWorkerProdConfiguration: webpack.Configuration = {
  ...serviceWorkerDevConfiguration,
  devtool: undefined,
  mode: 'production'
};

export default serviceWorkerProdConfiguration;
