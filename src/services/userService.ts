import { v4 as uuidv4 } from 'uuid';

import { User, Users } from '../modules/user';
import UserRepository from '../repositories/userRepository';

export default class UserService {
  static getUsers(): Users {
    return UserRepository.getAllUsers();
  }

  static getUserById(id: string): User | null {
    return UserRepository.getUserById(id);
  }

  static createUser(name: string, email: string, age: number): User {
    const id = uuidv4();
    return UserRepository.createUser(id, name, email, age);
  }

  static updateUser(id: string, userObj: Partial<User>): User | null {
    return UserRepository.updateUser(id, userObj);
  }

  static deleteUser(id: string) {
    return UserRepository.deleteUser(id);
  }
}
