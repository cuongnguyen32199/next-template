import next from 'next';
import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';

import { Logger } from './lib/logger';
import { connect } from './lib/database';

import userRoutes from './api/user';
import auth from './middlewares/auth';

const PORT = 3000;
const logger = Logger.create(module);

connect();
const app = next({ dev: true });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(cookieParser());
  server.use(express.json({ limit: '25MB' }));
  server.use(express.urlencoded({ extended: true }));

  server.use('/api/users', userRoutes);

  server.all('*', (req: Request, res: Response) => (handle(req, res)));
  server.use(auth);

  server.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
});
