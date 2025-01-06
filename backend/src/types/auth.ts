export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO extends LoginDTO {
  name: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    isPremium: boolean;
  };
} 