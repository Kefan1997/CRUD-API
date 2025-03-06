import { DATA_STORAGE } from '../config';
import InMemoryUser from './InMemoryUser';
import SQLiteUser from './sqLiteUser';
import { User, Users } from '../modules/user';

export default class UserRepository {
  static getAllUsers(): Users {
    return DATA_STORAGE === 'memory' ? InMemoryUser.getAllUsers() : SQLiteUser.getAllUsers();
  }

  static getUserById(id: string): User | null {
    return DATA_STORAGE === 'memory' ? InMemoryUser.getUserById(id) : SQLiteUser.getUserById(id);
  }

  static createUser(id: string, name: string, email: string, age: number): User {
    return DATA_STORAGE === 'memory'
      ? InMemoryUser.createUser(id, name, email, age)
      : SQLiteUser.createUser(id, name, email, age);
  }

  static updateUser(id: string, userObj: Partial<User>): User | null {
    return DATA_STORAGE === 'memory'
      ? InMemoryUser.updateUser(id, userObj)
      : SQLiteUser.updateUser(id, userObj);
  }

  static deleteUser(id: string): { message: string; id: string } | null {
    return DATA_STORAGE === 'memory' ? InMemoryUser.deleteUser(id) : SQLiteUser.deleteUser(id);
  }
}
