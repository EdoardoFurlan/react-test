import {createRoute } from '@tanstack/react-router'
import {rootRoute} from './route'

export const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path:'/home',
    component:()=>{
        return (
        <div style={{ padding: '20px' }}>
        <h2>Home</h2>
      </div>
        );

    }
})