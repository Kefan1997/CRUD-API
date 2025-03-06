import fs from 'node:fs/promises';
import { Users } from '../modules/user';

const DATA_FILE = './users.json';

export const getUsersFromFile = async (): Promise<Users> => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    console.error(e);
    return {};
  }
};

export const writeUsersToFile = async (users: Users): Promise<void> => {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2));
  } catch (e) {
    console.error(e);
  }
};
