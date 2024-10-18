import { RequestHandler } from 'express';

export const getProfileController: RequestHandler = async (req, res) => {
  const user = req.user!;

  res.json({
    user
  });
};
