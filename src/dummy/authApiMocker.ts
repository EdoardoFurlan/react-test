// Una funzione che "finge" di essere il backend
export const mockLoginApi = async (username: string) => {
  return new Promise<{ token: string }>((resolve) => {
    setTimeout(() => {
      // Creiamo un finto payload Base64 per simulare un JWT
      // Nota: Questo non è un vero JWT criptato, ma serve per testare jwt-decode
      const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
      const payload = btoa(JSON.stringify({ username, exp: Math.floor(Date.now() / 1000) + 3600 }));
      const signature = "dummy-signature";
      
      resolve({ token: `${header}.${payload}.${signature}` });
    }, 1000);
  });
};