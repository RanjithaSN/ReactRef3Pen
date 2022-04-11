import cors from 'cors';
import ensureEnvironmentVar from '../ensureEnvironmentVariable';
import loggerInstance from '../logger/logger';

const allowedOriginsVariable = process.env.ALLOWED_ORIGINS;
const allowedOrigins: string[] = allowedOriginsVariable ? allowedOriginsVariable.split(',') : [];

if (!ensureEnvironmentVar('ALLOWED_ORIGINS', true)) {
  loggerInstance.warn('Cors will be disabled');
}

const corsMiddleware = () =>
  cors({
    credentials: true,
    // origin: 'http://localhost:8001',
    origin: (origin, callback) => {
      if (process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }

      if (allowedOrigins.length > 0 && allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not ' + 'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  });

export default corsMiddleware;
