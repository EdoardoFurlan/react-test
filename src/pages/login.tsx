import {createRoute, useNavigate } from '@tanstack/react-router'
import {rootRoute} from '../routing/route'
import type React from 'react';

export const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path:'/login',
    component:()=>{
        const navigate = useNavigate();

        const handleSubmit = (e:React.SubmitEvent) =>{
            e.preventDefault();
            navigate({to:'/home'});
        }

        return (
        <div style={{ padding: '20px' }}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username: </label>
            <input type="text" placeholder="admin" />
          </div>
          <br />
          <div>
            <label>Password: </label>
            <input type="password" placeholder="password" />
          </div>
          <br />
          <button type="submit">Entra</button>
        </form>
      </div>
        );

    }
})