import axios from 'axios';
import type { AuthResponse, LoginDTO, RegisterDTO } from '../../types/auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const authApi = axios.create({
  baseURL: `${API_URL}/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (data: LoginDTO): Promise<AuthResponse> => {
  const response = await authApi.post<AuthResponse>('/login', data);
  return response.data;
};

export const register = async (data: RegisterDTO): Promise<AuthResponse> => {
  const response = await authApi.post<AuthResponse>('/register', data);
  return response.data;
};

export const validateToken = async (token: string): Promise<AuthResponse> => {
  const response = await authApi.get<AuthResponse>('/validate', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}; 