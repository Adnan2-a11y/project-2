import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, ShoppingCart, CreditCard, Truck, Shield, BarChart3, Users } from 'lucide-react';

const Services = () => {
  const [selectedServices, setSelectedServices] = useState([]);

  const services = [
    {
      id: 'payment',
      title: 'Payment Processing',
      description: 'Accept credit cards, digital wallets, and other payment methods',
      icon: CreditCard,
      price: '$29/month'
    },
    {
      id: 'shipping',
      title: 'Shipping Integration',
      description: 'Connect with major carriers and automate shipping calculations',
      icon: Truck,
      price: '$19/month'
    },
    {
      id: 'security',
      title: 'Advanced Security',
      description: 'Enhanced security features and fraud protection',
      icon: Shield,
      price: '$39/month'
    },
    {
      id: 'analytics',
      title: 'Premium Analytics',
      description: 'Advanced reporting and business insights',
      icon: BarChart3,
      price: '$49/month'
    },
    {
      id: 'support',
      title: 'Priority Support',
      description: '24/7 dedicated support and faster response times',
      icon: Users,
      price: '$79/month'
    },
    {
      id: 'inventory',
      title: 'Inventory Management',
      description: 'Advanced inventory tracking and stock management',
      icon: ShoppingCart,
      price: '$35/month'
    }
  ];

  const toggleService = (serviceId) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculateTotal = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      const price = parseInt(service?.price.replace('$', '').split('/')[0]) || 0;
      return total + price;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Select the services that best fit your business needs. You can always add more later.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Services List */}
          <div className="space-y-6">
            {services.map((service) => {
              const Icon = service.icon;
              const isSelected = selectedServices.includes(service.id);
              
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  className={`p-6 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20'
                      : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-violet-300 dark:hover:border-violet-600'
                  }`}
                  onClick={() => toggleService(service.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                        isSelected
                          ? 'bg-violet-600 text-white'
                          : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                      isSelected
                        ? 'bg-violet-600 border-violet-600'
                        : 'border-gray-300 dark:border-slate-600'
                    }`}>
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </div>
                  </div>
                  <div className="mt-4 text-right">
                    <span className="text-violet-600 dark:text-violet-400 font-semibold">
                      {service.price}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Summary Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 h-fit sticky top-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Order Summary
            </h2>

            {selectedServices.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No services selected yet
              </p>
            ) : (
              <div className="space-y-4 mb-6">
                {selectedServices.map(serviceId => {
                  const service = services.find(s => s.id === serviceId);
                  return (
                    <div key={serviceId} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-700">
                      <span className="text-gray-700 dark:text-gray-300">{service.title}</span>
                      <span className="text-violet-600 dark:text-violet-400 font-semibold">
                        {service.price}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="border-t border-gray-200 dark:border-slate-700 pt-4 mb-6">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span className="text-gray-900 dark:text-white">Total</span>
                <span className="text-violet-600 dark:text-violet-400">
                  ${calculateTotal()}/month
                </span>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
              Complete Setup
              <ArrowRight className="w-5 h-5" />
            </button>

            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
              You can modify these services anytime from your dashboard
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Services;