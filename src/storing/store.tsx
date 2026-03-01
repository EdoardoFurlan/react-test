import {create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
    username: string
    setUsername: (name:string) => void
}

export const userAuthState = create<AuthState>()(
    persist(
        (set)=>({
            username:'',
            setUsername:(name) => set({username:name}),
    }),
    {
        name :'auth-storage'
    }
)
)
