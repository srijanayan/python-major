// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  BASE_URL: API_BASE_URL,
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/v1/auth/login`,
    REGISTER: `${API_BASE_URL}/api/v1/auth/register`,
    ME: `${API_BASE_URL}/api/v1/auth/me`,
  },
  PRODUCTS: {
    LIST: `${API_BASE_URL}/api/v1/products/`,
    DETAIL: (id) => `${API_BASE_URL}/api/v1/products/${id}`,
    CATEGORIES: `${API_BASE_URL}/api/v1/products/categories`,
  },
  CART: {
    LIST: `${API_BASE_URL}/api/v1/cart/`,
    ADD: `${API_BASE_URL}/api/v1/cart/`,
    UPDATE: (id) => `${API_BASE_URL}/api/v1/cart/${id}`,
    DELETE: (id) => `${API_BASE_URL}/api/v1/cart/${id}`,
    CLEAR: `${API_BASE_URL}/api/v1/cart/`,
  },
  WISHLIST: {
    LIST: `${API_BASE_URL}/api/v1/wishlist/`,
    ADD: `${API_BASE_URL}/api/v1/wishlist/`,
    DELETE: (id) => `${API_BASE_URL}/api/v1/wishlist/${id}`,
    CLEAR: `${API_BASE_URL}/api/v1/wishlist/`,
  },
  ORDERS: {
    LIST: `${API_BASE_URL}/api/v1/orders/`,
    CREATE: `${API_BASE_URL}/api/v1/orders/`,
    DETAIL: (id) => `${API_BASE_URL}/api/v1/orders/${id}`,
    CANCEL: (id) => `${API_BASE_URL}/api/v1/orders/${id}/cancel`,
  },
  ADMIN: {
    USERS: `${API_BASE_URL}/api/v1/admin/users`,
    PRODUCTS: `${API_BASE_URL}/api/v1/admin/products`,
    CATEGORIES: `${API_BASE_URL}/api/v1/admin/categories`,
    ORDERS: `${API_BASE_URL}/api/v1/admin/orders`,
  },
};

export default API_ENDPOINTS;
