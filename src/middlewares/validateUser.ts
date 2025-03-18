import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import Joi from 'joi';
import { validate } from 'uuid';

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  age: Joi.number().required(),
});

export function validateUser(req: Request, res: Response, next: NextFunction) {
  const { error } = userSchema.validate(req.body, { abortEarly: false });

  if (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ errorCode: ReasonPhrases.BAD_REQUEST, message: 'Missing required fields' });
    return;
  }

  next();
}

export function validateUserId(req: Request, res: Response, next: NextFunction) {
  const { userId } = req.params;

  if (!validate(userId)) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ errorCode: ReasonPhrases.BAD_REQUEST, message: 'Invalid user ID format' });
    return;
  }

  next();
}
