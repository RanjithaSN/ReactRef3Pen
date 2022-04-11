import open from 'open';
import webpack, { Configuration } from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
// @ts-ignore
import { XMLHttpRequest } from 'xmlhttprequest';
import createClientConfig from '../../webpack/client.dev.config';
import createServerConfig from '../../webpack/server.dev.config';
import swConfig from '../../webpack/service-worker.dev';
import createExpressApp from './createExpressApp';
import startApp from './startApp';
global.XMLHttpRequest = XMLHttpRequest;

const PORT = parseInt(process.env.PORT || '0', 10) || 8001;

const clientConfig = createClientConfig();
const serverConfig = createServerConfig();

const { publicPath } = clientConfig.output;
const go = async () => {

  const app = await createExpressApp();

  const compiler = webpack([clientConfig, serverConfig, swConfig] as Configuration[]);
  const [clientCompiler] = compiler.compilers;
  const options = {
    publicPath,
    noInfo: true
  };
  const devMiddleware = webpackDevMiddleware(compiler, options);

  app.use(devMiddleware);
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(webpackHotServerMiddleware(compiler));

  devMiddleware.waitUntilValid(() => {
    startApp(app, PORT, () => {
      open(`http://localhost:${PORT}`);
    });
  }
  );
};

try {
  go();
} catch (e) {
  console.error(e);
  process.exit(1);
}
