import axios from 'axios';
import type { Asset, SentimentData, User, WatchlistItem } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token: string): void => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearAuthToken = (): void => {
  delete api.defaults.headers.common['Authorization'];
};

// Auth endpoints
export const login = async (email: string, password: string): Promise<{ token: string; user: User }> => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

// Asset endpoints
export const getAssets = async (): Promise<Asset[]> => {
  const response = await api.get('/assets');
  return response.data;
};

export const getAssetSentiment = async (assetId: string): Promise<SentimentData> => {
  const response = await api.get(`/assets/${assetId}/sentiment`);
  return response.data;
};

// Watchlist endpoints
export const getWatchlist = async (): Promise<WatchlistItem[]> => {
  const response = await api.get('/watchlist');
  return response.data;
};

export const addToWatchlist = async (assetId: string): Promise<WatchlistItem> => {
  const response = await api.post('/watchlist', { assetId });
  return response.data;
};

export const removeFromWatchlist = async (watchlistItemId: string): Promise<void> => {
  await api.delete(`/watchlist/${watchlistItemId}`);
}; 