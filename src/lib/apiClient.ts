import axios from 'axios';
import { userAuthState } from '../storing/store';

// 1. Creiamo l'istanza con la URL base del tuo server
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Cambiala con la tua URL reale
});

// 2. Aggiungiamo l'interceptor per le richieste
apiClient.interceptors.request.use(
  (config) => {
    // Recuperiamo il token aggiornato dallo store
    const token = userAuthState.getState().token;

    if (token) {
      // Lo iniettiamo nell'header Authorization
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Sessione scaduta o non autorizzata. Logout in corso...");
      
      // 1. Svuotiamo lo store di Zustand
      userAuthState.getState().logout();

      // 2. Reindirizziamo l'utente al login
      // Nota: poiché siamo fuori dai componenti React, 
      // il modo più semplice è ricaricare la pagina o usare l'istanza del router
      window.location.href = '/login'; 
    }

    return Promise.reject(error);
}
);

export default apiClient;