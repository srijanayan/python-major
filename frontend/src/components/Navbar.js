import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { FaShoppingCart, FaHeart, FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary-600">🛍️ E-Store</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
              Products
            </Link>
            
            {user ? (
              <>
                <Link to="/cart" className="relative text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                  <FaShoppingCart className="inline-block mr-1" />
                  Cart
                  {getCartCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getCartCount()}
                    </span>
                  )}
                </Link>
                <Link to="/wishlist" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                  <FaHeart className="inline-block mr-1" />
                  Wishlist
                </Link>
                <Link to="/orders" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                  Orders
                </Link>
                {isAdmin() && (
                  <Link to="/admin" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                    <FaCog className="inline-block mr-1" />
                    Admin
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link to="/register" className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* User Menu */}
          {user && (
            <div className="hidden md:flex items-center">
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                  <FaUser className="inline-block mr-2" />
                  {user.username}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    {user.email}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaSignOutAlt className="inline-block mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600 p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-primary-600 rounded-md text-base font-medium">
              Home
            </Link>
            <Link to="/products" className="block px-3 py-2 text-gray-700 hover:text-primary-600 rounded-md text-base font-medium">
              Products
            </Link>
            
            {user ? (
              <>
                <Link to="/cart" className="block px-3 py-2 text-gray-700 hover:text-primary-600 rounded-md text-base font-medium">
                  Cart ({getCartCount()})
                </Link>
                <Link to="/wishlist" className="block px-3 py-2 text-gray-700 hover:text-primary-600 rounded-md text-base font-medium">
                  Wishlist
                </Link>
                <Link to="/orders" className="block px-3 py-2 text-gray-700 hover:text-primary-600 rounded-md text-base font-medium">
                  Orders
                </Link>
                {isAdmin() && (
                  <Link to="/admin" className="block px-3 py-2 text-gray-700 hover:text-primary-600 rounded-md text-base font-medium">
                    Admin
                  </Link>
                )}
                <div className="border-t pt-2">
                  <div className="px-3 py-2 text-sm text-gray-500">
                    {user.email}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-600 rounded-md text-base font-medium"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 text-gray-700 hover:text-primary-600 rounded-md text-base font-medium">
                  Login
                </Link>
                <Link to="/register" className="block px-3 py-2 bg-primary-600 text-white rounded-md text-base font-medium">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
