import { Request, Response } from 'express';
import { User } from '../modules/user';
import UserService from '../services/userService';
import { NotFoundError } from '../errors/error';
import LogService from '../services/logService';

export default class UserController {
  static fetchUsers(req: Request, res: Response) {
    try {
      LogService.info('Fetching users...');
      const users = UserService.getUsers();
      LogService.info('Users fetched successfully', users);
      res.status(200).json(users);
    } catch (error) {
      LogService.error('Error fetching users', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static fetchUserById(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const user = UserService.getUserById(userId);

      res.status(200).json(user);
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(404).json({ message: error.message });
      } else {
        LogService.error('Error fetching user', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  static createUser(req: Request, res: Response) {
    try {
      const { name, email, age } = req.body;

      const newUser: User = UserService.createUser(name, email, age);

      res.status(201).json(newUser);
    } catch (error) {
      LogService.error('Error creating user', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static updateUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const updatedUser = UserService.updateUser(userId, req.body);

      if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      LogService.error('Error updating user', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static deleteUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const deletedUser = UserService.deleteUser(userId);

      if (!deletedUser) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      LogService.error('Error deleting user', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
