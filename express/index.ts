import express, { Request, Response } from 'express';
import next from 'next';

import { Logger } from './lib/logger';

const PORT = 3000;
const logger = Logger.create(module);

const app = next({ dev: true });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.all('*', (req: Request, res: Response) => (handle(req, res)));

  server.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
});
