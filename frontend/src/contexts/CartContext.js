import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchCart = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const response = await axios.get('/api/v1/cart/');
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return false;
    }

    try {
      const response = await axios.post('/api/v1/cart/', {
        product_id: productId,
        quantity: quantity
      });
      
      await fetchCart();
      toast.success('Added to cart successfully!');
      return true;
    } catch (error) {
      const message = error.response?.data?.detail || 'Failed to add to cart';
      toast.error(message);
      return false;
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    try {
      await axios.put(`/api/v1/cart/${itemId}`, { quantity });
      await fetchCart();
      toast.success('Cart updated successfully!');
    } catch (error) {
      const message = error.response?.data?.detail || 'Failed to update cart';
      toast.error(message);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`/api/v1/cart/${itemId}`);
      await fetchCart();
      toast.success('Item removed from cart!');
    } catch (error) {
      const message = error.response?.data?.detail || 'Failed to remove item';
      toast.error(message);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete('/api/v1/cart/');
      setCartItems([]);
      toast.success('Cart cleared successfully!');
    } catch (error) {
      const message = error.response?.data?.detail || 'Failed to clear cart';
      toast.error(message);
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cartItems,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
    fetchCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
