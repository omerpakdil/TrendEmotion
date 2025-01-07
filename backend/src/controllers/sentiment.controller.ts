import { Request, Response } from 'express';
import { SentimentService } from '../services/data/sentiment.service';
import { TwitterService } from '../services/data/twitter.service';

export class SentimentController {
  private sentimentService: SentimentService;
  private twitterService: TwitterService;

  constructor() {
    this.sentimentService = new SentimentService();
    this.twitterService = new TwitterService();
  }

  async analyzeTweets(req: Request, res: Response): Promise<void> {
    try {
      const { symbol } = req.params;
      const tweets = await this.twitterService.getRecentTweets(symbol);
      
      const analyses = this.sentimentService.analyzeTexts(
        tweets.map(tweet => ({
          text: tweet.text,
          timestamp: tweet.createdAt,
          source: 'twitter'
        }))
      );

      const overallSentiment = this.sentimentService.aggregateAnalyses(analyses);

      res.json({
        success: true,
        data: {
          analyses,
          overallSentiment,
          totalAnalyzed: analyses.length
        }
      });
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to analyze tweets'
      });
    }
  }

  async analyzeText(req: Request, res: Response): Promise<void> {
    try {
      const { text } = req.body;
      
      if (!text) {
        res.status(400).json({
          success: false,
          error: 'Text is required'
        });
        return;
      }

      const sentiment = this.sentimentService.analyzeSentiment(text);

      res.json({
        success: true,
        data: sentiment
      });
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to analyze text'
      });
    }
  }
} 