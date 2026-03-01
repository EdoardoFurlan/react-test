import type React from 'react';
import {createRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react';
import { userAuthState } from '../storing/store';


import {rootRoute} from '../routing/route'


export const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path:'/login',
    component:()=>{
        const navigate = useNavigate();
        const [inputValue, setInputValue] = useState('')

        const setUsernameGlobal = userAuthState((state) => state.setUsername)

        const handleSubmit = (e:React.SubmitEvent) =>{
            e.preventDefault();
            setUsernameGlobal(inputValue);
            navigate({to:'/home'});
        }


        return (
        <div style={{ padding: '20px' }}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username: </label>
            <input type="text" 
              placeholder="admin" 
              value={inputValue} 
              onChange={(e)=>setInputValue(e.target.value)}
            />
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