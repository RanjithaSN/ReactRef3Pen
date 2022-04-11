import express from 'express';
import path from 'path';

export default () =>
  express.static(path.resolve('dist/sw/sw.js'), {
    setHeaders: (res) => {
      res.set('Service-Worker-Allowed', '/');
    },
  });
