import { TwitterApi, TweetV2 } from 'twitter-api-v2';
import { config } from '../../config';
import { Tweet } from '../../types/twitter.types';

export class TwitterService {
  private client: TwitterApi;

  constructor() {
    this.client = new TwitterApi({
      appKey: config.twitter.apiKey,
      appSecret: config.twitter.apiSecret,
      accessToken: config.twitter.accessToken,
      accessSecret: config.twitter.accessSecret,
    });
  }

  async getRecentTweets(symbol: string, limit: number = 100): Promise<Tweet[]> {
    try {
      const query = `${symbol} (crypto OR cryptocurrency) -is:retweet lang:en`;
      const tweets = await this.client.v2.search({
        query,
        max_results: limit,
        'tweet.fields': ['created_at', 'public_metrics', 'author_id'],
      });

      return (tweets.data?.data || []).map((tweet: TweetV2) => ({
        id: tweet.id,
        text: tweet.text,
        createdAt: tweet.created_at || '',
        metrics: tweet.public_metrics || {
          retweet_count: 0,
          reply_count: 0,
          like_count: 0,
          quote_count: 0
        },
        authorId: tweet.author_id || '',
      }));
    } catch (error) {
      console.error('Error fetching tweets:', error);
      throw new Error('Failed to fetch tweets');
    }
  }

  async getTrendingCryptoTweets(): Promise<Tweet[]> {
    try {
      const query = '(crypto OR cryptocurrency) -is:retweet lang:en';
      const tweets = await this.client.v2.search({
        query,
        max_results: 100,
        'tweet.fields': ['created_at', 'public_metrics', 'author_id'],
      });

      return (tweets.data?.data || []).map((tweet: TweetV2) => ({
        id: tweet.id,
        text: tweet.text,
        createdAt: tweet.created_at || '',
        metrics: tweet.public_metrics || {
          retweet_count: 0,
          reply_count: 0,
          like_count: 0,
          quote_count: 0
        },
        authorId: tweet.author_id || '',
      }));
    } catch (error) {
      console.error('Error fetching trending tweets:', error);
      throw new Error('Failed to fetch trending tweets');
    }
  }
}