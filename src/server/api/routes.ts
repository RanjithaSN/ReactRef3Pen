import { Router } from 'express';
import stubs from './stubs/routes';
import cache from './cache/routes';

const apiRoutes = Router();

apiRoutes.get('/', (_, res) => {
  res.status(200).json({
    message: 'API is alive.'
  });
});

apiRoutes.use('/stubs', stubs);
apiRoutes.use('/cache', cache);

export default apiRoutes;
