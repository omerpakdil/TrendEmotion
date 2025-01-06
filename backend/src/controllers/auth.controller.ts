import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { LoginDTO, RegisterDTO } from '../types/auth';

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body as RegisterDTO;
      const result = await AuthService.register(data);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body as LoginDTO;
      const result = await AuthService.login(data);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
} 