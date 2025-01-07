import axios from 'axios';
import type { Asset, SentimentData, User, WatchlistItem } from '../types';
import type { 
  AuthResponse, 
  LoginCredentials, 
  RegisterCredentials, 
  UserProfileResponse,
  UserProfile
} from '../types/auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
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
export const auth = {
  login: async (data: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    const { token, user } = response.data;
    setAuthToken(token);
    return { token, user };
  },

  register: async (data: RegisterCredentials): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data);
    const { token, user } = response.data;
    setAuthToken(token);
    return { token, user };
  },

  validateToken: async (): Promise<User> => {
    const response = await api.get('/auth/validate');
    return response.data;
  },
};

// Asset endpoints
export const assets = {
  getAll: async (): Promise<Asset[]> => {
    const response = await api.get('/assets');
    return response.data;
  },

  getSentiment: async (assetId: string): Promise<SentimentData> => {
    const response = await api.get(`/assets/${assetId}/sentiment`);
    return response.data;
  },
};

// Watchlist endpoints
export const watchlist = {
  getAll: async (): Promise<WatchlistItem[]> => {
    const response = await api.get('/watchlist');
    return response.data;
  },

  add: async (assetId: string): Promise<WatchlistItem> => {
    const response = await api.post('/watchlist', { assetId });
    return response.data;
  },

  remove: async (watchlistItemId: string): Promise<void> => {
    await api.delete(`/watchlist/${watchlistItemId}`);
  },
};

// User endpoints
export const user = {
  getProfile: async (): Promise<UserProfileResponse> => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  updateProfile: async (data: Partial<UserProfile>): Promise<UserProfileResponse> => {
    const response = await api.put('/users/profile', data);
    return response.data;
  },

  updatePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    await api.put('/users/password', { currentPassword, newPassword });
  }
}; 