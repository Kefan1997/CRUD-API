import { Request, Response, NextFunction } from "express";
import { validate } from "uuid";

export function validateUser(req: Request, res: Response, next: NextFunction) {
  const {name, email, age} = req.body;

  if(!name || !email || typeof age !=='number') {
    res.status(400).json({message: 'Missing required fields'});
    return;
  }

  next();
}

export function validateUserId(req: Request, res: Response, next: NextFunction) {
  const {userId} = req.params;

  if(!validate(userId)) {
    res.status(400).json({ message: 'Invalid user ID format' });
    return;
  }

  next();
}