import axios from 'axios';
import type { AxiosInstance } from 'axios';

// Environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7299';
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000');
const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT || 'development';

// API Configuration
export const API_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  environment: ENVIRONMENT,
};

// Create axios instance with default configuration
export const createApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_CONFIG.baseURL,
    timeout: API_CONFIG.timeout,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor for logging and debugging
  instance.interceptors.request.use(
    (config) => {
      // Always log in production for debugging
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
      console.log('Environment:', ENVIRONMENT);
      console.log('Base URL:', API_CONFIG.baseURL);
      console.log('Request Config:', config);
      return config;
    },
    (error) => {
      console.error('❌ Request Error:', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor for logging and error handling
  instance.interceptors.response.use(
    (response) => {
      if (ENVIRONMENT === 'development') {
        console.log(`✅ API Response: ${response.status} ${response.config.url}`);
        console.log('Response Data:', response.data);
      }
      return response;
    },
    (error) => {
      console.error('❌ Response Error:', error);
      
      // Enhanced error logging
      if (error.response) {
        console.error('Response Error Details:', {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
          url: error.config?.url,
        });
      } else if (error.request) {
        console.error('Network Error:', {
          message: error.message,
          url: error.config?.url,
        });
      }
      
      return Promise.reject(error);
    }
  );

  return instance;
};

// Default API instance
export const api = createApiInstance();

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.baseURL}${endpoint}`;
};

// Helper function to check if we're in development
export const isDevelopment = (): boolean => {
  return ENVIRONMENT === 'development';
};

// Helper function to get current API configuration
export const getApiConfig = () => {
  return {
    baseURL: API_CONFIG.baseURL,
    timeout: API_CONFIG.timeout,
    environment: API_CONFIG.environment,
  };
}; 