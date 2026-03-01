import {createRoute } from '@tanstack/react-router'
import {rootRoute} from '../routing/route'
import { userAuthState } from '../storing/store'

export const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path:'/home',
    component:()=>{

        const username = userAuthState((state)=> state.username);


        return (
        <div style={{ padding: '20px' }}>
        <h1>Home</h1>
        <h2>Hello {username}!</h2>

      </div>
        );

    }
})