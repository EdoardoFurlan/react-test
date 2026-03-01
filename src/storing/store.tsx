import {create } from 'zustand'
import { persist } from 'zustand/middleware'
import { jwtDecode } from 'jwt-decode' // npm install jwt-decode

interface AuthState {
    token: string|null
    isloggedIn: boolean
    login: (token:string) => void
    logout: () => void
    getUserData: () => {username: string}|null
}

export const userAuthState = create<AuthState>()(
    persist(
        (set, get)=>({
            token:null,
            isloggedIn:false,

            login :(token:string) => {
                set({ token, isloggedIn:true });
            },

            logout: () => {
                set({ token: '', isloggedIn:false });
                localStorage.removeItem('auth-storage');
            },

            getUserData: () => {
                const token = get().token;
                if (!token) return null;
                try {
                    // Decodifichiamo il payload del JWT 🔓
                    return jwtDecode<{ username: string }>(token);
                } catch {
                    return null;
                }
            }
        }),
        {
            name :'auth-storage'
        }
    ), 
)
