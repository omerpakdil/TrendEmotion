import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-here';

export const generateToken = (user: User): string => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    JWT_SECRET,
    {
      expiresIn: '7d',
    }
  );
};

export const verifyToken = (token: string): jwt.JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
}; 