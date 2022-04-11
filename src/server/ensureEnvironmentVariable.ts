import logger from './logger/logger';

const ensureEnvironmentVar = (varName: string, skipExit?: boolean): boolean => {
  if (!process.env[varName]) {
    if (skipExit) {
      return false;
    } else {
      logger.fatal(`${varName} environment variable is not set`);
      if (process.exit) {
        process.exit();
      }
      return false;
    }
  }
  return true;
};

export default ensureEnvironmentVar;
