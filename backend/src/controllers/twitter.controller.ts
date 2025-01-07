// backend/src/controllers/twitter.controller.ts

import { Request, Response } from 'express';
import { MockTwitterService } from '../services/data/mock-twitter.service';

export class TwitterController {
  private twitterService: MockTwitterService;

  constructor() {
    this.twitterService = new MockTwitterService();
  }

  async getRecentTweets(req: Request, res: Response): Promise<void> {
    try {
      const { symbol } = req.params;
      const limit = parseInt(req.query.limit as string) || 100;

      const tweets = await this.twitterService.getRecentTweets(symbol, limit);
      res.json({ success: true, data: tweets });
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch tweets'
      });
    }
  }

  async getTrendingTweets(req: Request, res: Response): Promise<void> {
    try {
      const tweets = await this.twitterService.getTrendingCryptoTweets();
      res.json({ success: true, data: tweets });
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch trending tweets'
      });
    }
  }
}