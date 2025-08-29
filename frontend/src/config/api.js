// API Configuration for different environments
const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:8000',
  },
  production: {
    baseURL: 'https://python-major-production.up.railway.app',
  },
};

// Get current environment - check for environment variable first
const getEnvironment = () => {
  if (process.env.REACT_APP_ENV) {
    return process.env.REACT_APP_ENV;
  }
  return process.env.NODE_ENV === 'development' ? 'development' : 'production';
};

const currentEnv = getEnvironment();
const currentConfig = API_CONFIG[currentEnv] || API_CONFIG.production;

export const API_BASE_URL = currentConfig.baseURL;

// For axios configuration
export const axiosConfig = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};
