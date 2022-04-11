import { Application } from 'express';
import fs from 'fs';
import { Redis } from 'ioredis';
import loggerInstance from 'server/logger/logger';
import webPush from 'web-push';
import { getDefaultFavIcon } from '../helpers/icon-helpers';

const deleteKeys = (redisClient: Redis, pattern: string) =>
  new Promise((resolve, reject) => {
    const stream = redisClient.scanStream({
      match: pattern,
    });
    stream.on('data', (keys: string[]) => {
      if (keys.length) {
        const pipeline = redisClient.pipeline();
        keys.forEach((key) => {
          pipeline.del(key);
        });
        pipeline.exec();
      }
    });
    stream.on('end', resolve);
  });

const sendMessage = async (redisClient: Redis, pattern: string, payload: {}, TTL = 60) =>
  new Promise((resolve, reject) => {
    const stream = redisClient.scanStream({
      match: pattern,
    });
    const options = {
      gcmAPIKey: process.env.GOOGLE_CLOUD_MESSSAGING_API_KEY,
      TTL,
    };
    stream.on('data', async (keys: string[]) => {
      if (keys.length) {
        keys.forEach(async (key) => {
          const pipeline = redisClient.pipeline();
          try {
            const subscription = await redisClient.get(key);
            await webPush.sendNotification(JSON.parse(subscription), JSON.stringify(payload), options);
          } catch (e) {
            pipeline.del(key);
          }
          pipeline.exec();
        });
      }
    });
    stream.on('end', resolve);
  });

const pushNotificationMiddleware = async (app: Application) => {
  app.post('/push/save-subscription', async (req, res) => {
    const subscription = req.body;
    const cacheClient = req.cacheClient as unknown as Redis;
    if (cacheClient) {
      await deleteKeys(cacheClient, `sub:${subscription.endpoint}:*`);
      cacheClient.set(`sub:${subscription.endpoint}:`, JSON.stringify(subscription));
    }

    res.json({ message: 'success' });
  });
  app.use('/push/config', async (req, res) => {
    const statsContent = await fs.readFileSync('dist/client/stats.json');
    const stats = JSON.parse(statsContent.toString());
    stats.outputPath = undefined; // Remove internal output path
    try {
      res.json({ stats, publicKey: process.env.VAPID_PUBLIC_KEY });
    } catch (error) {
      res.json({ error: error.message });
    }
  });
  app.use('/push?', async (req, res) => {
    const statsContent = await fs.readFileSync('dist/client/stats.json');
    const stats = JSON.parse(statsContent.toString());
    const defaultFavIcon = getDefaultFavIcon(stats);
    const cacheClient = req.cacheClient as unknown as Redis;
    const { title, body, icon } = req.body;
    if (cacheClient) {
      webPush.setVapidDetails(process.env.APP_URL, process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
      const payload = {
        title,
        body,
        icon: icon ? icon : `${process.env.APP_URL}${defaultFavIcon}`,
        data: { url: '/om/mobil' },
      };

      const pattern = 'sub:*';

      sendMessage(cacheClient, pattern, payload);
      loggerInstance.info({
        title,
        body,
        icon: icon ? icon : `${process.env.APP_URL}${defaultFavIcon}`,
        data: { url: '/om/mobil' },
      })
      res.json({
        done: true,
      });
    } else {
      res.json({ error: true });
    }
  });
};

export default pushNotificationMiddleware;
