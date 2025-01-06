import bcrypt from 'bcryptjs';
import prisma from '../utils/prisma';
import { generateToken } from '../utils/jwt';
import { LoginDTO, RegisterDTO, AuthResponse } from '../types/auth';

export class AuthService {
  static async register(data: RegisterDTO): Promise<AuthResponse> {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
      },
    });

    const token = generateToken(user);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isPremium: user.isPremium,
      },
    };
  }

  static async login(data: LoginDTO): Promise<AuthResponse> {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(data.password, user.password);

    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken(user);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isPremium: user.isPremium,
      },
    };
  }
} 