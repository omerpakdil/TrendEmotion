import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import twitterRoutes from './twitter.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/twitter', twitterRoutes);

export default router; 