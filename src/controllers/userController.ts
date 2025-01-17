import { Request, Response } from 'express';
import { User } from '../types/response';
import { v4 as uuidv4 } from 'uuid';

const users: User[] = [];

export const getUsers = (req: Request, res: Response) => {
  res.status(200).json(users);
};

export const getUserById = (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!uuidv4.validate(userId)) {
    return res.status(400).json({ message: 'Invalid user ID format' });
  }

  const user = users.find((user) => user.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(user);
};

export const createUser = (req: Request, res: Response) => {
  const { name, email, age } = req.body;
  if (!name || !email || typeof age !== 'number') {
    return res.status(404).json({ message: 'Missing required fields' });
  }

  const newUser: User = { id: uuidv4(), name, email, age };
  users.push(newUser);
  res.status(201).json(newUser);
};
