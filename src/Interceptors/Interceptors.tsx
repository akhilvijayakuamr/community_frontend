import axios from 'axios';
import { store } from '../redux/Store/store';
import { getAccessToken } from '../redux/Actions/authActions';
export const BASE_URL= import.meta.env.VITE_BASE_URL




// Client Interceptors

const apiClient = axios.create({
  baseURL: BASE_URL,
});


apiClient.interceptors.request.use(function (config) {
  const token = store.getState().auth.user_token;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  } else {
    console.log('No token found in Redux store.');
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});


apiClient.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const refreshToken = store.getState().auth.user_refresh_token;

      if (refreshToken) {
        try {
          const newToken = await getAccessToken(refreshToken, store.dispatch, null);

          if (newToken && error.config) {
            error.config.headers['Authorization'] = `Bearer ${newToken}`;
            return apiClient.request(error.config);
          }
        } catch (tokenError) {
          if (axios.isAxiosError(error) && error.response?.status === 401) {
            window.location.href = '/userLoginAgain';
          }
        }
      }
    }
    else if (axios.isAxiosError(error) && error.response?.status === 404) {
      window.location.href = '/404_user';
    }
    else{
      window.location.href = '/404_user';
    }

    console.log("Error occurred", error);

    return Promise.reject(error);
  }
);




// Admin Interceptor

const apiAdmin = axios.create({
  baseURL: BASE_URL,
});


apiAdmin.interceptors.request.use(function (config) {
  const token = store.getState().auth.admin_token;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  } else {
    console.log('No token found in Redux store.');
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});


apiAdmin.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const refreshToken = store.getState().auth.admin_refresh_token;

      if (refreshToken) {
        try {
          const newToken = await getAccessToken(refreshToken, store.dispatch, null);

          if (newToken && error.config) {
            error.config.headers['Authorization'] = `Bearer ${newToken}`;
            return apiClient.request(error.config);
          }
        } catch (tokenError) {
          if (axios.isAxiosError(error) && error.response?.status === 401) {
            window.location.href = '/adminLoginAgain';
          }
          console.error("Token refresh failed", tokenError);
        }
      }
    }
    else if (axios.isAxiosError(error) && error.response?.status === 404) {
      window.location.href = '/404_admin';
    }

    else{
      window.location.href = '/404_admin';
    }

    console.log("Error occurred", error);

    return Promise.reject(error);
  }
);


export  {apiClient, apiAdmin}

