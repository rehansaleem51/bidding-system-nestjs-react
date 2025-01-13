import {create} from 'zustand';
import { persist} from 'zustand/middleware'



export const authStore = create() (
    
    persist(
        (set) => ({
            isAuthenticated: false,
            token: null,
            user: {},
            redirectionUrl: '',
            setUser: (user) => set({ user }),
            logout: () => set({isAuthenticated: false, token: null,  user: {} }),
            setTokenAndUser: (token, user, isAuthenticated) => set({ token, user, isAuthenticated}),    
        }),
        {
            name: 'auth-storage',
        }
          
        ),
);