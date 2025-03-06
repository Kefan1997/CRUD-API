import Database from 'better-sqlite3';

const db = new Database('database.sqlite', { verbose: console.log });

db.prepare(
  `CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    age INTEGER NOT NULL
  )`
).run();

export default db;
