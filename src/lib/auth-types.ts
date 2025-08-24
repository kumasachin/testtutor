// User types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  isEmailVerified: boolean;
  preferences?: UserPreferences;
  stats?: UserStats;
}

export interface UserPreferences {
  defaultFeedbackMode: "immediate" | "end" | "never";
  defaultShuffleQuestions: boolean;
  defaultShuffleAnswers: boolean;
  emailNotifications: boolean;
  theme: "light" | "dark" | "system";
}

export interface UserStats {
  totalTestsTaken: number;
  averageScore: number;
  totalTimeSpent: number;
  improvementRate: number;
  favoriteCategories: string[];
  strongAreas: string[];
  weakAreas: string[];
}

// Authentication types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  updatePreferences: (preferences: Partial<UserPreferences>) => Promise<void>;
}

// API Response types
export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
  errors?: Record<string, string[]>;
}

// Session types
export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

// Password reset types
export interface PasswordResetRequest {
  email: string;
}

export interface PasswordReset {
  token: string;
  newPassword: string;
}
