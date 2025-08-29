import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { FaUsers, FaBox, FaTags, FaShoppingCart, FaChartBar, FaCog } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    // In a real app, you'd fetch these from the API
    setStats({
      totalUsers: 25,
      totalProducts: 150,
      totalOrders: 89,
      totalRevenue: 15420.50
    });
  };

  const navigation = [
    { name: 'Overview', href: '/admin', icon: FaChartBar },
    { name: 'Users', href: '/admin/users', icon: FaUsers },
    { name: 'Products', href: '/admin/products', icon: FaBox },
    { name: 'Categories', href: '/admin/categories', icon: FaTags },
    { name: 'Orders', href: '/admin/orders', icon: FaShoppingCart },
    { name: 'Settings', href: '/admin/settings', icon: FaCog },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.full_name}!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-primary-100 text-primary-700 border border-primary-200'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Routes>
              <Route path="/" element={<AdminOverview stats={stats} />} />
              <Route path="/users" element={<AdminUsers />} />
              <Route path="/products" element={<AdminProducts />} />
              <Route path="/categories" element={<AdminCategories />} />
              <Route path="/orders" element={<AdminOrders />} />
              <Route path="/settings" element={<AdminSettings />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

// Admin Overview Component
const AdminOverview = ({ stats }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FaUsers className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <FaBox className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FaShoppingCart className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <FaChartBar className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <p className="text-sm text-gray-600">New user registration: john.doe@example.com</p>
            <span className="text-xs text-gray-400">2 hours ago</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <p className="text-sm text-gray-600">New order placed: Order #12345</p>
            <span className="text-xs text-gray-400">4 hours ago</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <p className="text-sm text-gray-600">Product updated: Smartphone X</p>
            <span className="text-xs text-gray-400">6 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Placeholder components for other admin sections
const AdminUsers = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">User Management</h2>
    <p className="text-gray-600">User management interface coming soon...</p>
  </div>
);

const AdminProducts = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Management</h2>
    <p className="text-gray-600">Product management interface coming soon...</p>
  </div>
);

const AdminCategories = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Category Management</h2>
    <p className="text-gray-600">Category management interface coming soon...</p>
  </div>
);

const AdminOrders = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Management</h2>
    <p className="text-gray-600">Order management interface coming soon...</p>
  </div>
);

const AdminSettings = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Settings</h2>
    <p className="text-gray-600">Admin settings interface coming soon...</p>
  </div>
);

export default AdminDashboard;
