import IORedis from 'ioredis';
import loggerInstance from '../logger/logger';
import { CacheClient } from './cacheClient';

const logRedisError = (err: any, msg: string) => {
  loggerInstance.error({
    command: err.command && err.command.name,
  },
    msg
  );
};

const createRedisClient = () => {
  const redisUrl = `redis://${process.env.REDIS_SERVICE_HOST}:${process.env.REDIS_SERVICE_PORT}`;
  const client = new IORedis(
    redisUrl,
    {
      retryStrategy: (times: number) => {
        if (times === 5) {
          client.quit();
          return null;
        }
        return Math.min(times * 50, 2000);
      },
    }
  );

  const init: CacheClient = {
    get: client.get.bind(client),
    set: client.set.bind(client),
    keys: client.keys.bind(client),
    del: client.del.bind(client),
    flush: client.flushdb.bind(client),
    scanStream: client.scanStream.bind(client),
    pipeline: client.pipeline.bind(client),
  };

  client.on('error', (err) => {
    if (err?.command?.name === 'auth') {
      client.quit();
    }
    logRedisError(err, 'Redis error');
  });

  client.on('reconnecting', (err) => {
    if (err) {
      logRedisError(err, 'Redis failed to reconnect');
    }
  });

  client.on('connect', () => {
    loggerInstance.info('Redis has connected');
  });

  client.on('ready', () => {
    loggerInstance.info('Redis is ready');
  });

  client.on('end', () => {
    loggerInstance.info('Redis connection has ended');
  });

  return init;
};

export default createRedisClient;