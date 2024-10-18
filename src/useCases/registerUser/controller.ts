import { RequestHandler } from 'express';
import { registerUserService } from './service';

export const registerUserController: RequestHandler = async (req, res) => {
  const token = await registerUserService(req.body);

  res.json({ token }).status(201);
};
