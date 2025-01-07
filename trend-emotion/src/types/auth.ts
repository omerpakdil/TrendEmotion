export interface User {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfileResponse {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
  language: string;
  theme: string;
  notificationSettings: string;
  securitySettings: string;
}

export interface UserProfile extends User {
  language: string;
  theme: string;
  notificationSettings: Record<string, boolean>;
  securitySettings: Record<string, string | boolean>;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
} 