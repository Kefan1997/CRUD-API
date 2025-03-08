import { Request, Response } from 'express';
import { User } from '../modules/user';
import UserService from '../services/userService';

export default class UserController {
  static fetchUsers(req: Request, res: Response) {
    try {
      const users = UserService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static fetchUserById(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const user = UserService.getUserById(userId);

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.status(200).json(user);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static createUser(req: Request, res: Response) {
    try {
      const { name, email, age } = req.body;

      const newUser: User = UserService.createUser(name, email, age);

      res.status(201).json(newUser);
    } catch (e) {
      console.error(e);
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
    } catch (e) {
      console.error(e);
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
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
