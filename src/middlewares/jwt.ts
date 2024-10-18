import prisma from 'db';
import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';

export const jwt: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.slice('Bearer '.length);

  if (!token) {
    res.status(401).json({ error: 'Token not provided' });
    return;
  }

  try {
    const verified = verify(token, process.env.JWT_SECRET!) as {
      userId: number;
    };

    const user = await prisma.user.findUnique({
      where: {
        id: verified.userId
      }
    });

    if (!user) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
