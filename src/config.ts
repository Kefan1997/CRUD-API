import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config();

export const DATA_STORAGE = process.env.DATA_STORAGE || 'sqlite';

if (!process.env.MOCK_USERS_DATA_PATH) {
  throw new Error('MOCK_USERS_DATA_PATH is required in the environment variables');
}

export const MOCK_USERS_DATA_PATH = path.resolve(process.env.MOCK_USERS_DATA_PATH);
