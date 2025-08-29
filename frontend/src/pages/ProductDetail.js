import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaShoppingCart, FaHeart, FaStar, FaArrowLeft } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();

  useEffect(() => {
    fetchProduct();
    fetchRelatedProducts();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/v1/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      const response = await axios.get(`/api/v1/products/?limit=4`);
      setRelatedProducts(response.data.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      // Show login prompt
      return;
    }
    await addToCart(id, quantity);
  };

  const handleAddToWishlist = async () => {
    if (!user) {
      // Show login prompt
      return;
    }
    await addToWishlist(id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">😔</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Product not found</h3>
        <Link to="/products" className="text-primary-600 hover:text-primary-700">
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/products"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back to Products
        </Link>

        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="h-96 bg-gray-200 flex items-center justify-center rounded-lg">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-gray-400 text-6xl">🖼️</div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center text-yellow-400 mr-4">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <span className="text-gray-600">(4.8/5)</span>
              </div>

              <div className="text-4xl font-bold text-primary-600 mb-6">
                ${product.price}
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {product.description}
              </p>

              <div className="mb-6">
                <span className="text-sm font-medium text-gray-700">Stock:</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                  product.stock_quantity > 10 
                    ? 'bg-green-100 text-green-800' 
                    : product.stock_quantity > 0 
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock_quantity > 0 ? `${product.stock_quantity} available` : 'Out of stock'}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                    disabled={quantity <= 1}
                    className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="w-16 text-center text-lg font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(prev => prev + 1)}
                    disabled={quantity >= product.stock_quantity}
                    className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock_quantity === 0}
                  className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <FaShoppingCart className="mr-2" />
                  Add to Cart
                </button>
                <button
                  onClick={handleAddToWishlist}
                  className={`p-3 rounded-lg border transition-colors ${
                    isInWishlist(id)
                      ? 'border-red-500 text-red-500 bg-red-50'
                      : 'border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500'
                  }`}
                >
                  <FaHeart />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <Link to={`/products/${relatedProduct.id}`}>
                    <div className="h-32 bg-gray-200 flex items-center justify-center">
                      {relatedProduct.image_url ? (
                        <img
                          src={relatedProduct.image_url}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-gray-400 text-2xl">🖼️</div>
                      )}
                    </div>
                  </Link>
                  
                  <div className="p-4">
                    <Link to={`/products/${relatedProduct.id}`}>
                      <h3 className="font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
                        {relatedProduct.name}
                      </h3>
                    </Link>
                    <div className="text-lg font-bold text-primary-600">
                      ${relatedProduct.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
