import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import twitterRoutes from './twitter.routes';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.use('/api/twitter', twitterRoutes);

export default router; 