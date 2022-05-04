import mongoose from 'mongoose';

import { Logger } from './logger';
const logger = Logger.create(module);

const { MONGO_DB_HOST, MONGO_DB_PORT, MONGO_DB_USER, MONGO_DB_PASSWORD, MONGO_DB_DATABASE } = process.env;

const uri = `mongodb://${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_DATABASE}`;
const replica = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}/${MONGO_DB_DATABASE}?retryWrites=true&w=majority`;

export async function connect() {
  mongoose.connect(replica);
  mongoose.connection.on('connected', () => logger.info('Connected database'));

  return mongoose;
}
