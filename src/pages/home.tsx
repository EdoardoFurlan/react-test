import {createRoute } from '@tanstack/react-router'
import {authLayoutRoute} from '../routing/_auth'
import { userAuthState } from '../storing/store'

export const homeRoute = createRoute({
    getParentRoute: () => authLayoutRoute,
    path:'/home',
    component:()=>{
        const username = userAuthState((state)=> state.getUserData()?.username) || 'Guest';

        return (
        <div style={{ padding: '20px' }}>
        <h1>Home</h1>
        <h2>Hello {username}!</h2>

      </div>
        );

    }
})