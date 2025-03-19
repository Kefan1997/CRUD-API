import { Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

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
      res.status(StatusCodes.OK).json(users);
    } catch (error) {
      LogService.error('Error fetching users', error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ errorCode: ReasonPhrases.INTERNAL_SERVER_ERROR, message: 'Internal server error' });
    }
  }

  static fetchUserById(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      LogService.info(`Fetching user by id:${userId}...`);
      const user = UserService.getUserById(userId);
      LogService.info('User fetched successfully', user);
      res.status(StatusCodes.OK).json(user);
    } catch (error) {
      if (error instanceof NotFoundError) {
        res
          .status(StatusCodes.NOT_FOUND)
          .json({ errorCode: ReasonPhrases.NOT_FOUND, message: error.message });
      } else {
        LogService.error('Error fetching user', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          errorCode: ReasonPhrases.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
        });
      }
    }
  }

  static createUser(req: Request, res: Response) {
    try {
      const { name, email, age } = req.body;

      LogService.info('Creating user...');
      const newUser: User = UserService.createUser(name, email, age);
      LogService.info('User created successfully', newUser);
      res.status(StatusCodes.CREATED).json(newUser);
    } catch (error) {
      LogService.error('Error creating user', error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ errorCode: ReasonPhrases.INTERNAL_SERVER_ERROR, message: 'Internal server error' });
    }
  }

  static updateUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      LogService.info('Updating user...');
      const updatedUser = UserService.updateUser(userId, req.body);
      LogService.info('User updated successfully', updatedUser);
      if (!updatedUser) {
        res
          .status(StatusCodes.NOT_FOUND)
          .json({ errorCode: ReasonPhrases.NOT_FOUND, message: 'User not found' });
        return;
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      LogService.error('Error updating user', error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ errorCode: ReasonPhrases.INTERNAL_SERVER_ERROR, message: 'Internal server error' });
    }
  }

  static deleteUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      LogService.info(`Deleting user with userId: ${userId}...`);
      const deletedUser = UserService.deleteUser(userId);

      if (!deletedUser) {
        res
          .status(StatusCodes.NOT_FOUND)
          .json({ errorCode: ReasonPhrases.NOT_FOUND, message: 'User not found' });
        return;
      }

      LogService.info(`User with userId: ${userId} deleted successfully`);
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      LogService.error('Error deleting user', error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ errorCode: ReasonPhrases.INTERNAL_SERVER_ERROR, message: 'Internal server error' });
    }
  }
}
