import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import expressStaticGzip from 'express-static-gzip';
import corsMiddleware from './cors/corsMiddleware';
import healthMiddleware from './health/healthMiddleware';
import cacheClient from './cache/client';
import requestLogger from './logger/requestLogger';
import pushNotificationMiddleware from './push-notification/pushNotificationMiddleware';
import serviceWorkerMiddleware from './service-worker/service-worker-middleware';
import apiRoutes from './api/routes';

type SetHeaders = (res: { setHeader: (arg0: string, arg1: string) => void; }, path: string) => void;

interface CacheHeaders {
  index: boolean;
  enableBrotli?: boolean;
  serveStatic?: {
    setHeaders: SetHeaders
  };
}

const cacheHeaders: CacheHeaders = {
  index: false
};

if (process.env.NODE_ENV === 'production') {
  cacheHeaders.enableBrotli = true;
  cacheHeaders.serveStatic = {
    setHeaders: (res: { setHeader: (arg0: string, arg1: string) => void; }, path: string) => {
      if (/.(js|png|webp|jpg|svg|css)(.gz)?$/.test(path)) {
        res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
      } else {
        res.setHeader('Cache-Control', 'public, max-age=0');
      }
    }
  };
}

const createApp = async () => {
  const app = express();
  app.disable('x-powered-by');
  app.get('/health', healthMiddleware());
  app.use(requestLogger());
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(corsMiddleware());
  app.use('/static', expressStaticGzip('./dist/client', cacheHeaders));
  app.use('/robots.txt', express.static('./dist/client/robots.txt'));
  app.use('/sitemap.xml', express.static('./dist/client/sitemap.xml'));
  app.use('/apple-app-site-association', express.static('./dist/client/apple-app-site-association'));
  app.use(cacheClient());
  app.use('/api', apiRoutes);
  pushNotificationMiddleware(app);
  app.use('/service-worker.js', serviceWorkerMiddleware());
  return app;
};

export default createApp;
