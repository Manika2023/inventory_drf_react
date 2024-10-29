// src/utils/api.js

// src/utils/api.js

import { refreshToken } from './auth';

export const fetchWithToken = async (url, options = {}) => {
  let accessToken = localStorage.getItem('access');

  const fetchData = async (url, options) => {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  let response = await fetchData(url, options);

  if (response.status === 401) { // Unauthorized (token expired)
    try {
      accessToken = await refreshToken();
      localStorage.setItem('access', accessToken); // Store new access token
      // Retry the original request with the new token
      response = await fetchData(url, options);
    } catch (error) {
      console.error('Token refresh failed:', error);
      // Redirect to login page or handle failure
      window.location.href = '/login'; // Redirect to login page
    }
  }

  return response;
};
