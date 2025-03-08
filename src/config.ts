import dotenv from 'dotenv';
dotenv.config();

export const DATA_STORAGE = process.env.DATA_STORAGE || 'sqlite';
