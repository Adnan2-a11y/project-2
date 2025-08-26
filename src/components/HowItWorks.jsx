import React from 'react';
import { motion } from 'framer-motion';
import { Store, Settings, Rocket } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      title: 'Connect your store',
      description: 'Install our WooCommerce plugin, Shopify app, or connect via our REST API.',
      color: 'from-violet-600 to-purple-600',
      icon: Store,
    },
    {
      title: 'Fund your wallet',
      description: 'Top up via card, crypto or bank transfer. View billing and usage logs in Dashboard.',
      color: 'from-indigo-600 to-blue-600',
      icon: Settings,
    },
    {
      title: 'Enable key delivery',
      description: 'Assign SKUs or collections to key pools. Auto routing rules handle delivery paths.',
      color: 'from-blue-600 to-cyan-600',
      icon: Rocket,
    },
    {
      title: 'Orders deliver instantly',
      description: 'Once paid + balance checked, key is pushed to order notes, email, and webhook if enabled.',
      color: 'from-pink-600 to-red-600',
      icon: Rocket,
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white dark:from-slate-800 dark:to-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How It
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
              {' '}Works
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Four simple steps to transform your business idea into a thriving online store.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection lines for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-200 via-indigo-200 to-blue-200 dark:from-violet-800 dark:via-indigo-800 dark:to-blue-800 transform -translate-y-1/2"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative text-center"
                >
                  <div className="relative z-10 bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300">
                    <div className="mb-4 sm:mb-6 flex justify-center">
                      <div
                        className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-lg">
                      {index + 1}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-12"
        >
          <button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
            Get Started Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;