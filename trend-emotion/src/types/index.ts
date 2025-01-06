export interface User {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
}

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  type: 'stock' | 'crypto';
  currentPrice: number;
}

export interface SentimentData {
  positive: number;
  negative: number;
  neutral: number;
  timestamp: string;
}

export interface WatchlistItem {
  id: string;
  userId: string;
  assetId: string;
  alertThreshold?: number;
} 