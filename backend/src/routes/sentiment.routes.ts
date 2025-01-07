import { Router } from 'express';
import { SentimentController } from '../controllers/sentiment.controller';

const router = Router();
const sentimentController = new SentimentController();

// Analyze tweets for a specific crypto symbol
router.get('/analyze/tweets/:symbol', (req, res) => 
  sentimentController.analyzeTweets(req, res)
);

// Analyze custom text
router.post('/analyze/text', (req, res) => 
  sentimentController.analyzeText(req, res)
);

export default router; 