import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth';

const router = Router();

// Tüm rotalar authentication gerektirir
router.use(authenticate);

// Profil yönetimi
router.get('/profile', UserController.getProfile);
router.put('/profile', UserController.updateProfile);
router.put('/password', UserController.updatePassword);

export default router; 