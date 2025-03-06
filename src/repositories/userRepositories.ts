import db from '../db/database';
import { User } from '../modules/user';

export default class UserRepository {
  static getAllUsers(): User[] {
    return db.prepare('SELECT * FROM users').all() as User[];
  }

  static getUserById(id: string): User | null {
    return db.prepare('SELECT * FROM users WHERE id = ?').get(id) as User | null;
  }

  static createUser(id: string, name: string, email: string, age: number): User {
    const stmt = db.prepare('INSERT INTO users (id, name, email, age) VALUES (?, ?, ?, ?)');
    stmt.run(id, name, email, age);

    return { id, name, email, age };
  }

  static updateUser(id: string, userObj: Partial<User>): User | null {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    const user = stmt.get(id) as User | undefined;

    if (!user) {
      return null;
    }

    const updateName = userObj.name ?? user.name;
    const updateEmail = userObj.email ?? user.email;
    const updateAge = userObj.age ?? user.age;

    const updateStmt = db.prepare('UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?');
    updateStmt.run(updateName, updateEmail, updateAge, id);

    return { id, name: updateName, email: updateEmail, age: updateAge };
  }

  static deleteUser(id: string): { message: string; id: string } | null {
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);

    if (!user) {
      return null;
    }

    const stmt = db.prepare('DELETE FROM users WHERE id = ?');
    stmt.run(id);

    return { message: 'User deleted successfully', id };
  }
}
