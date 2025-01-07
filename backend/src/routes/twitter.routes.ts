// backend/src/routes/api/twitter.routes.ts

import { Router } from 'express';
import { TwitterController } from '../controllers/twitter.controller';
import { twitterRateLimit } from '../middlewares/rateLimit.middleware';

const router = Router();
const twitterController = new TwitterController();

// Get tweets for a specific crypto symbol
router.get(
  '/recent/:symbol',
  twitterRateLimit,
  (req, res) => twitterController.getRecentTweets(req, res)
);

// Get trending crypto tweets
router.get(
  '/trending',
  twitterRateLimit,
  (req, res) => twitterController.getTrendingTweets(req, res)
);

export default router;