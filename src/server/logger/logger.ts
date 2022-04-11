import pino, { LoggerOptions } from 'pino';

const loggerOptions: LoggerOptions = {
  redact: ['req.headers.authorization', 'req.headers.APIKey'],
  mixin: () => ({
    stage: process.env.STAGE,
    system: 'PennyFE',
  }),
  prettyPrint:
    process.env.NODE_ENV === 'development'
      ? {
        colorize: true,
      }
      : undefined,
  level: process.env.LOGGER_LEVEL || 'debug',
  formatters: {
    level: (level) => ({ level }),
  },
};
const pinoInstance = pino(loggerOptions);

const createErrorLogMessage = (error: Error) => ({
  type: error.name,
  message: error.message,
  stack: error.stack,
});

const loggerDecorator = {
  logError: (error: Error) => {
    switch (error.constructor) {
      default:
        return pinoInstance.error(createErrorLogMessage(error));
    }
  },
} as any;

const loggerInstance = new Proxy(pinoInstance, {
  // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
  get(target, prop, receiver) {
    if (target.hasOwnProperty(prop)) {
      // @ts-ignore
      return target[prop];
    }

    if (loggerDecorator[prop]) {
      // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
      return function () {
        return loggerDecorator[prop](...arguments);
      };
    }

    return Reflect.get(target, prop, receiver);
  },
});

export default loggerInstance;
