// src/utils/auth.js

export const refreshToken = async () => {
     const response = await fetch('https://crud-backend-drf-production.up.railway.app/api/token/refresh/', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         refresh: localStorage.getItem('refresh'), // Use refresh token
       }),
     });
   
     if (response.ok) {
       const data = await response.json();
       if (data.access) {
         localStorage.setItem('access', data.access);
         return data.access;
       } else {
         throw new Error('Failed to refresh token');
       }
     } else {
       throw new Error('Token refresh request failed');
     }
   };
   