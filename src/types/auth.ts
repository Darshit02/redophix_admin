// types/auth.ts
export interface User {
  id: number;
  uuid: string;
  username: string;
  email: string;
  user_type: string | null;
  phone: string | null;
  image: { image: string } | null; // Adjusted here
  address: string | null;
  gender: string | null;
  is_active: boolean;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  sessionExpiry: number | null;
}