import fs from 'node:fs';

import { Users, User } from '../modules/user';
import { MOCK_USERS_DATA_PATH } from '../config';

export default class InMemoryUser {
  private static users: Users = JSON.parse(fs.readFileSync(MOCK_USERS_DATA_PATH, 'utf-8'));

  static getAllUsers(): Users {
    return this.users;
  }

  static getUserById(id: string): User | null {
    return this.users[id] || null;
  }

  static createUser(id: string, name: string, email: string, age: number): User {
    const newUser = { id, name, email, age };

    this.users[id] = newUser;

    fs.writeFileSync(MOCK_USERS_DATA_PATH, JSON.stringify(this.users, null, 2));

    return newUser;
  }

  static updateUser(id: string, userObj: Partial<User>): User | null {
    const user = this.users[id];

    if (!user) {
      return null;
    }

    const updateName = userObj.name ?? user.name;
    const updateEmail = userObj.email ?? user.email;
    const updateAge = userObj.age ?? user.age;

    const updatedUser = { ...user, name: updateName, email: updateEmail, age: updateAge };

    this.users[id] = updatedUser;

    fs.writeFileSync(MOCK_USERS_DATA_PATH, JSON.stringify(this.users, null, 2));

    return updatedUser;
  }

  static deleteUser(id: string): { message: string; id: string } | null {
    const user = this.users[id];

    if (!user) {
      return null;
    }

    delete this.users[id];

    fs.writeFileSync(MOCK_USERS_DATA_PATH, JSON.stringify(this.users, null, 2));

    return { message: 'User deleted successfully', id };
  }
}
