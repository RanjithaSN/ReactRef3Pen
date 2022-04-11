import { Router, Request, Response } from 'express';

const cacheRoutes = Router();

cacheRoutes.get('/', (_, res) => {
  res.status(200).json({
    message: 'Cache!'
  });
});

cacheRoutes.post(
  '/get',
  async (req: Request, res: Response) => {
    const { cacheClient, body: { key } } = req;

    res.status(200).json({
      [key]: cacheClient.get(key)
    });
  }
);

cacheRoutes.post(
  '/put',
  async (req: Request, res: Response) => {
    const { cacheClient, body: { key, value } } = req;

    cacheClient.put(key, value);

    res.status(200).json({
      message: `Cached key: ${key} with the value: ${value}`
    });
  }
);

cacheRoutes.get(
  '/keys',
  async (req: Request, res: Response) => {
    const { cacheClient } = req;

    res.status(200).json(cacheClient.keys());
  }
);

cacheRoutes.delete(
  '/del',
  async (req: Request, res: Response) => {
    const { cacheClient, body: { key } } = req;

    cacheClient.delete(key);

    res.status(200).json({
      message: `Key: ${key} deleted.`
    });
  }
);

cacheRoutes.get(
  '/flush',
  async (req: Request, res: Response) => {
    const { cacheClient } = req;

    cacheClient.flush();

    res.status(200).json({
      message: 'Flushed.'
    });
  }
);

export default cacheRoutes;
