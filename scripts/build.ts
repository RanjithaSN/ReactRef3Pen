// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import webpack, { Configuration } from 'webpack';
import createClientConfig from '../webpack/client.prod.config';
import createServecConfig from '../webpack/server.prod.config';
import serviceworkerConfig from '../webpack/service-worker.prod';

const clientConfig = createClientConfig();

const serverConfig = createServecConfig();


const buildServer = () => {
  console.log('Building server');
  webpack([serverConfig as Configuration]).run((err, buildStats) => {
    const stats = buildStats.toJson();
    const serverStats = stats.children[0];
    let hasError = false;

    /* Show server build errors */
    if (serverStats.errors) {
      hasError = hasError || serverStats.errors.length > 0;
      serverStats.errors.map((error: any) => {
        console.error(error);
      });
    }
    /* If there was an error, exit with an error wcode */
    if (hasError) {
      process.exit(1);
    }
  });
};

const buildClient = () => {
  console.log('Building client');
  webpack([clientConfig as Configuration]).run((err, buildStats) => {
    const stats = buildStats.toJson();
    const clientStats = stats.children[0];

    let hasError = false;

    /* Show client build errors */
    if (clientStats.errors) {
      hasError = hasError || clientStats.errors.length > 0;
      clientStats.errors.map((error: any) => {
        console.error(error);
      });
    }

    /* If there was an error, exit with an error code */
    if (hasError) {
      process.exit(1);
    }
    buildServer();
  });
};


const buildServiceworker = () => {
  console.log('Building serviceworker');
  webpack([serviceworkerConfig as Configuration]).run((err, buildStats) => {
    const stats = buildStats.toJson();
    const serviceworkerStats = stats.children[0];

    let hasError = false;

    /* Show client build errors */
    if (serviceworkerStats.errors) {
      hasError = hasError || serviceworkerStats.errors.length > 0;
      serviceworkerStats.errors.map((error: any) => {
        console.error(error);
      });
    }

    /* If there was an error, exit with an error code */
    if (hasError) {
      process.exit(1);
    }
    buildClient();
  });
};


buildServiceworker();
