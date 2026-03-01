import {create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
    username: string
    setUsername: (name:string) => void
    logout: () => void  
}

export const userAuthState = create<AuthState>()(
    persist(
        (set)=>({
            username:'',
            setUsername:(name) => set({username:name}),
            logout: () => {
                set({ username: '' })
                localStorage.removeItem('auth-storage');
            }
        }),
        {
            name :'auth-storage'
        }
    ), 
)
