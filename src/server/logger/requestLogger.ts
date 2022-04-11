import { NextFunction, Request, Response } from 'express';
import logger from './logger';

const excludedPaths = ['/health', '/metrics', /\/static\/.*/];

const requestLogger = () => (req: Request, res: Response, next: NextFunction) => {
  const path = req.path;
  if (!excludedPaths.some((excludedPath) => path.match(excludedPath))) {
    logger.info(
      {
        originalUrl: req.originalUrl,
        url: req.url,
        method: req.method,
        query: req.body?.query?.replace(/\s/g, '').replace(/(query|mutation)/, '$1 '),
      },
      'Request to API'
    );
  }

  next();
};

export default requestLogger;

