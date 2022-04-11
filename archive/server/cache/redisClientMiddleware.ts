import { NextFunction, Request, Response } from 'express';
import createRedisClient from './redisClient';

const redisClientMiddleware = () => {
  const redisClient = createRedisClient();
  return (req: Request, res: Response, next: NextFunction) => {
    req.cacheClient = redisClient;
    next();
  }
}

export default redisClientMiddleware;