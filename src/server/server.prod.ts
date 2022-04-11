/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
//@ts-ignore
const { XMLHttpRequest } = require('xmlhttprequest');
const createExpressApp = require('./createExpressApp').default;
const renderApp = require('./renderApp').default;
const compression = require('compression');
const startApp = require('./startApp').default;
global.XMLHttpRequest = XMLHttpRequest;

const PORT = parseInt(process.env.PORT || '8002', 10);

const go = async () => {
  const app = await createExpressApp();
  app.use(compression());
  app.use(renderApp());
  startApp(app, PORT);
};

try {
  go();
} catch (e) {
  console.error(e);
}
