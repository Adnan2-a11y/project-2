import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, ShoppingCart, Users, DollarSign, Package, Settings, Bell, Search, ChevronDown } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'Total Revenue',
      value: '$24,567',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Orders',
      value: '1,234',
      change: '+8.2%',
      icon: ShoppingCart,
      color: 'text-blue-600'
    },
    {
      title: 'Customers',
      value: '5,678',
      change: '+15.3%',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Products',
      value: '456',
      change: '+3.1%',
      icon: Package,
      color: 'text-orange-600'
    }
  ];

  const recentOrders = [
    { id: '#1234', customer: 'John Doe', amount: '$129.99', status: 'Delivered', date: '2 hours ago' },
    { id: '#1235', customer: 'Jane Smith', amount: '$89.50', status: 'Processing', date: '4 hours ago' },
    { id: '#1236', customer: 'Bob Johnson', amount: '$256.00', status: 'Shipped', date: '1 day ago' },
    { id: '#1237', customer: 'Alice Brown', amount: '$45.99', status: 'Delivered', date: '2 days ago' },
    { id: '#1238', customer: 'Charlie Wilson', amount: '$199.99', status: 'Processing', date: '3 days ago' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-300">Welcome back! Here's what's happening today.</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>
              <button className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600">
                <Bell className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                  JD
                </div>
                <span className="text-gray-700 dark:text-gray-300">John Doe</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-900/20 dark:to-indigo-900/20 rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <span className={`text-sm font-semibold ${stat.color}`}>{stat.change}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{stat.title}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Orders</h2>
                <button className="text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-slate-700">
                      <th className="text-left py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Order ID</th>
                      <th className="text-left py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Customer</th>
                      <th className="text-left py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Amount</th>
                      <th className="text-left py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
                      <th className="text-left py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, index) => (
                      <tr key={index} className="border-b border-gray-100 dark:border-slate-700 last:border-b-0">
                        <td className="py-4 text-sm font-medium text-gray-900 dark:text-white">{order.id}</td>
                        <td className="py-4 text-sm text-gray-600 dark:text-gray-300">{order.customer}</td>
                        <td className="py-4 text-sm font-medium text-gray-900 dark:text-white">{order.amount}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === 'Delivered' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                              : order.status === 'Shipped'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 text-sm text-gray-600 dark:text-gray-300">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors duration-200">
                  <ShoppingCart className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                  <span className="text-gray-700 dark:text-gray-300">Add New Product</span>
                </button>
                <button className="w-full flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors duration-200">
                  <BarChart3 className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                  <span className="text-gray-700 dark:text-gray-300">View Analytics</span>
                </button>
                <button className="w-full flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors duration-200">
                  <Settings className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                  <span className="text-gray-700 dark:text-gray-300">Store Settings</span>
                </button>
              </div>
            </div>

            {/* Performance Chart */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Performance</h2>
              <div className="h-48 bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-violet-400 mx-auto mb-2" />
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Sales chart will appear here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;