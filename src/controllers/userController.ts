import { Request, Response } from 'express';
import { User, Users } from '../types/response';
import { v4 as uuidv4, validate } from 'uuid';

const users: Users = {};

export const getUsers = (req: Request, res: Response) => {
  res.status(200).json(users);
};

export const getUserById = (req: Request, res: Response): void => {
  const { userId } = req.params;
  if (!validate(userId)) {
    res.status(400).json({ message: 'Invalid user ID format' });
    return;
  }

  const user = users[userId];

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.status(200).json(user);
};

export const createUser = (req: Request, res: Response): void => {
  const { name, email, age } = req.body;
  if (!name || !email || typeof age !== 'number') {
    res.status(400).json({ message: 'Missing required fields' });
    return;
  }

  const newUser: User = { id: uuidv4(), name, email, age };
  users[newUser.id] = newUser;
  res.status(201).json(newUser);
};

export const updateUser = (req: Request, res: Response): void => {
  const { userId } = req.params;
  if (!validate(userId)) {
    res.status(400).json({ message: 'Invalid user ID format' });
    return;
  }

  const user = users[userId];

  if (!user) {
    res.status(404).json({ message: 'User not found' });
  }

  const { name, email, age } = req.body;

  users[userId] = {
    ...user,
    name: name || user.name,
    email: email || user.email,
    age: age || user.age,
  };

  res.status(200).json(users[userId]);
};

export const deleteUser = (req: Request, res: Response): void => {
  const { userId } = req.params;
  if (!validate(userId)) {
    res.status(400).json({ message: 'Invalid user ID format' });
    return;
  }

  const user = users[userId];

  if (!user) {
    res.status(404).json({ message: 'User not found' });
  }

  delete users[userId];
  res.status(204).send();
};
