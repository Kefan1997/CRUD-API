import { Request, Response } from 'express';
import { v4 as uuidv4, validate } from 'uuid';
import { User } from '../types/response';
import { getUsersFromFile, writeUsersToFile } from '../helpers';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsersFromFile();
    res.status(200).json(users);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  if (!validate(userId)) {
    res.status(400).json({ message: 'Invalid user ID format' });
    return;
  }

  const users = await getUsersFromFile();
  const user = users[userId];

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.status(200).json(user);
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, age } = req.body;
  if (!name || !email || typeof age !== 'number') {
    res.status(400).json({ message: 'Missing required fields' });
    return;
  }
  const users = await getUsersFromFile();
  const newUser: User = { id: uuidv4(), name, email, age };
  users[newUser.id] = newUser;

  await writeUsersToFile(users);

  res.status(201).json(newUser);
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  if (!validate(userId)) {
    res.status(400).json({ message: 'Invalid user ID format' });
    return;
  }

  const users = await getUsersFromFile();
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

  await writeUsersToFile(users);

  res.status(200).json((await getUsersFromFile())[userId]);
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  if (!validate(userId)) {
    res.status(400).json({ message: 'Invalid user ID format' });
    return;
  }

  const users = await getUsersFromFile();
  const user = users[userId];

  if (!user) {
    res.status(404).json({ message: 'User not found' });
  }

  delete users[userId];
  await writeUsersToFile(users);

  res.status(204).send();
};
