import { AuthContextType, User } from '../types';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import {
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged,
} from 'firebase/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));

                let role: 'user' | 'admin' = 'user';
                let displayName = firebaseUser.displayName || '';
                
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    role = (data.role === 'admin') ? 'admin' : 'user';
                    displayName = data.name || firebaseUser.displayName || '';
                }

                const userData: User = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email || '',
                    displayName: displayName,
                    role: role,
                };
                setUser(userData);
            }
            else {
                setUser(null);
            }
            setLoading(false);

        });

        return () => unsubscribe();
    }, []);

    const signIn = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const firebaseUser = userCredential.user;
            const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));

            let role: 'user' | 'admin' = 'user';
            let displayName = firebaseUser.displayName || '';
            
            if (userDoc.exists()) {
                const data = userDoc.data();
                role = (data.role === 'admin') ? 'admin' : 'user';
                displayName = data.name || firebaseUser.displayName || '';
            }

            const userData: User = {
                uid: firebaseUser.uid,
                email: firebaseUser.email || '',
                displayName: displayName,
                role: role,
            };
            setUser(userData);
        } catch (error) {
            throw error;
        }
    };

    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
            setUser(null);
        } catch (error) {
            throw error;
        }
    };

    const value: AuthContextType = {
        user,
        loading,
        signIn,
        signOut
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
