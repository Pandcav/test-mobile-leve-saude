export interface User {
  uid: string;
  email: string;
  displayName?: string;
}

export interface Feedback {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface AuthContextType{
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    register: (email: string, password: string, displayName?: string) => Promise<void>;
}
