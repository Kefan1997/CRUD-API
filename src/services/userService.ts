import { v4 as uuidv4 } from 'uuid';

import { User, Users } from '../modules/user';
import InMemoryUser from '../repositories/InMemoryUser';
import SQLiteUser from '../repositories/sqLiteUser';
import { DATA_STORAGE } from '../config';
import { NotFoundError } from '../errors/error';

const userRepository = DATA_STORAGE === 'memory' ? InMemoryUser : SQLiteUser;

export default class UserService {
  static getUsers(): Users {
    return userRepository.getAllUsers();
  }

  static getUserById(id: string): User | null {
    const user = userRepository.getUserById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  static createUser(name: string, email: string, age: number): User {
    const id = uuidv4();
    return userRepository.createUser(id, name, email, age);
  }

  static updateUser(id: string, userObj: Partial<User>): User | null {
    return userRepository.updateUser(id, userObj);
  }

  static deleteUser(id: string) {
    return userRepository.deleteUser(id);
  }
}
