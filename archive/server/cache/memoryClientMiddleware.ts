import { NextFunction, Request, Response } from 'express';
import { createMemoryCacheClient } from './cacheClient';

const memoryCacheClient = createMemoryCacheClient();

const memoryClientMiddleware = () => (req: Request, res: Response, next: NextFunction) => {
  req.cacheClient = memoryCacheClient;
  next();
}

export default memoryClientMiddleware;