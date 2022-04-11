// @ts-ignore
import promMid from 'express-prometheus-middleware';

const prometheusMiddleware = () =>
  promMid({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
  });

export default prometheusMiddleware;
