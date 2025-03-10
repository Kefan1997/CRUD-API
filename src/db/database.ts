import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(__dirname, 'database.sqlite');
console.log('dbPath', dbPath)

const db = new Database(dbPath, { verbose: console.log });

db.prepare(
  `CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    age INTEGER NOT NULL
  )`
).run();

export default db;
