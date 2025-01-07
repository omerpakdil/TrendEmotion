import bcrypt from 'bcryptjs';
import prisma from '../utils/prisma';

type ProfileUpdateData = {
  name?: string;
  email?: string;
  language?: string;
  theme?: string;
  notificationSettings?: string;
  securitySettings?: string;
};

export class UserService {
  static async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new Error('User not found');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  static async updateProfile(userId: string, data: ProfileUpdateData) {
    if (data.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email }
      });

      if (existingUser && existingUser.id !== userId) {
        throw new Error('Email already in use');
      }
    }

    const updateFields: Record<string, string> = {};
    
    if (data.name) updateFields.name = data.name;
    if (data.email) updateFields.email = data.email;
    if (data.language) updateFields.language = data.language;
    if (data.theme) updateFields.theme = data.theme;
    if (data.notificationSettings) updateFields.notificationSettings = JSON.stringify(data.notificationSettings);
    if (data.securitySettings) updateFields.securitySettings = JSON.stringify(data.securitySettings);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateFields
    });

    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  static async updatePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      throw new Error('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    });
  }
} 