export interface User {
  uid: string;
  email: string;
  displayName?: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt?: Date;
}

export interface Feedback {
  id: string;
  userId: string;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  rating: number;
  comment: string;
  status: 'novo' | 'lido' | 'respondido';
  response?: {
    text: string;
    respondedBy: string;
    respondedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};
