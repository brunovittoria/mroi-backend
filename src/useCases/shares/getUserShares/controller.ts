import { RequestHandler } from 'express';
import { getUserSharesService } from './service';

export const getUserSharesController: RequestHandler = async (req, res) => {
  const shares = await getUserSharesService(req.user!.id);

  res.json({ shares });
};
