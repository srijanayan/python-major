import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchWishlist = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const response = await axios.get('/api/v1/wishlist/');
      setWishlistItems(response.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setWishlistItems([]);
    }
  }, [user]);

  const addToWishlist = async (productId) => {
    if (!user) {
      toast.error('Please login to add items to wishlist');
      return false;
    }

    try {
      await axios.post('/api/v1/wishlist/', {
        product_id: productId
      });
      
      await fetchWishlist();
      toast.success('Added to wishlist successfully!');
      return true;
    } catch (error) {
      const message = error.response?.data?.detail || 'Failed to add to wishlist';
      toast.error(message);
      return false;
    }
  };

  const removeFromWishlist = async (itemId) => {
    try {
      await axios.delete(`/api/v1/wishlist/${itemId}`);
      await fetchWishlist();
      toast.success('Item removed from wishlist!');
    } catch (error) {
      const message = error.response?.data?.detail || 'Failed to remove item';
      toast.error(message);
    }
  };

  const clearWishlist = async () => {
    try {
      await axios.delete('/api/v1/wishlist/');
      setWishlistItems([]);
      toast.success('Wishlist cleared successfully!');
    } catch (error) {
      const message = error.response?.data?.detail || 'Failed to clear wishlist';
      toast.error(message);
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.product_id === productId);
  };

  const value = {
    wishlistItems,
    loading,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    fetchWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
