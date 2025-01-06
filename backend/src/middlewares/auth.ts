import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import prisma from '../utils/prisma';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true },
    });

    if (!user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
}; 