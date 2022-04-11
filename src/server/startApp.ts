import AppConfig from 'AppConfig';
import { Application } from 'express';
import loggerInstance from './logger/logger';
interface AppSignals {
    [key: string]: number;
}

const signals: AppSignals = {
  SIGHUP: 1,
  SIGINT: 2,
  SIGTERM: 15
};

const appSignals: NodeJS.Signals[] = ['SIGHUP', 'SIGINT', 'SIGTERM'];

export default (app: Application, port: number, callback?: () => void) => {
  const server = app.listen(port, '0.0.0.0', () => {
    loggerInstance.info({
      ServingOn: server.address(),
      Environment: AppConfig.ENVIRONMENT_NAME
    });
  });

  // Do any necessary shutdown logic for our application here
  const shutdown = (signal: string, value: number) => {
    loggerInstance.fatal('Shutdown signal received');
    server.close(() => {
      loggerInstance.fatal(`server stopped by ${signal} with value ${value}`);
      process.exit(128 + value);
    });
  };

  // Create a listener for each of the signals that we want to handle
  appSignals.forEach((signal) => {
    process.on(signal, () => {
      loggerInstance.info(`process received a ${signal} signal`);
      shutdown(signal, signals[signal]);
    });
  });

  if (callback && typeof callback === 'function') {
    callback();
  }
  return server;
};
