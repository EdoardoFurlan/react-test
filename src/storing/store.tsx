import {create } from 'zustand'

interface AuthState {
    username: string
    setUsername: (name:string) => void
}

export const userAuthState = create<AuthState>((set)=>({
    username:'',
    setUsername:(name) => set({username:name})
}))