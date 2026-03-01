import type React from 'react';
import {createRoute, useNavigate, redirect } from '@tanstack/react-router'
import { useState } from 'react';
import { userAuthState } from '../storing/store';
import {mockLoginApi} from '../dummy/authApiMocker'
import { Loader2 } from "lucide-react";



import {rootRoute} from '../routing/route'


export const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    beforeLoad: () => {
      const userData = userAuthState.getState().getUserData();
      if (userData?.username) {
        throw redirect({ to: '/home' })
      }
    },
    path:'/login',
    component:()=>{
        const [isLoading, setIsLoading] = useState(false);
        const { login } = userAuthState();
        const navigate = useNavigate();
        const [inputValue, setInputValue] = useState('')
        const [pswd, setPswd] = useState('')


        const handleSubmit = async (e:React.SubmitEvent) =>{
            e.preventDefault();
            setIsLoading(true);
            try {
                // 2. Simuliamo la chiamata al server
                const response = await mockLoginApi(inputValue);
                
                // 3. Salviamo il token nello store
                login(response.token);
                
                // 4. Andiamo in Home
                navigate({ to: '/home' });
            } catch (error) {
                console.error("Login fallito", error);
                // Qui potresti aggiungere uno stato per gestire l'errore ❌
            } finally {
                setIsLoading(false); // Finito il caricamento
            }
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
            <input 
              type="password" 
              placeholder="password" 
              value={pswd} 
              onChange={(e)=>setPswd(e.target.value)}
            />
          </div>
          <br />
          <button type="submit"
          disabled={isLoading}>
            {isLoading ? (
            <>
              <Loader2 className="animate-spin" /> {/* 2. L'icona che ruota */}
              Attendi...
            </>
          ) : (
            "Entra"
          )}</button>
        </form>
      </div>
        );

    }
})