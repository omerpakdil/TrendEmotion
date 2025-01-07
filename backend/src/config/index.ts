import dotenv from 'dotenv';

dotenv.config();

export const config = {
  twitter: {
    apiKey: process.env.TWITTER_API_KEY || '',
    apiSecret: process.env.TWITTER_API_SECRET || '',
    accessToken: process.env.TWITTER_ACCESS_TOKEN || '',
    accessSecret: process.env.TWITTER_ACCESS_SECRET || '',
    bearerToken: process.env.TWITTER_BEARER_TOKEN || '',
  }
}; 