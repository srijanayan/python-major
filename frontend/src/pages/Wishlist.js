import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist, loading } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = async (productId) => {
    await addToCart(productId, 1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-4">💝</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your wishlist is empty</h1>
          <p className="text-gray-600 mb-8">Start adding products you love to your wishlist!</p>
          <Link
            to="/products"
            className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <button
            onClick={clearWishlist}
            className="text-red-600 hover:text-red-800 flex items-center text-sm"
          >
            <FaTrash className="mr-2" />
            Clear Wishlist
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <Link to={`/products/${item.product.id}`}>
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  {item.product.image_url ? (
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400 text-4xl">🖼️</div>
                  )}
                </div>
              </Link>
              
              <div className="p-4">
                <Link to={`/products/${item.product.id}`}>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 hover:text-primary-600 transition-colors">
                    {item.product.name}
                  </h3>
                </Link>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {item.product.description}
                </p>
                
                <div className="text-2xl font-bold text-primary-600 mb-4">
                  ${item.product.price}
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(item.product.id)}
                    className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center"
                  >
                    <FaShoppingCart className="mr-2" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="p-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
