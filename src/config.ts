import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config();

export const DATA_STORAGE = process.env.DATA_STORAGE || 'sqlite';
export const MOCK_USERS_DATA_PATH = path.resolve(
  process.env.MOCK_USERS_DATA_PATH || 'src/mocks/users.json'
);
