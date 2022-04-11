import { Request, Response } from 'express';
import AppConfig from 'AppConfig';

const healthMiddleware = () => (_: Request, res: Response) => {
  res.setHeader('X-Health', 'OK');
  res.json({
    status: 'OK',
    healthy: true,
    buildId: AppConfig.APP_VERSION,
    releaseId: AppConfig.RELEASE_VERSION
  });
};

export default healthMiddleware;
