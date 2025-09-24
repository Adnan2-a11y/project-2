import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 py-12 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Auto License Delivery for WooCommerce & 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
                {' '}Shopify
              </span>
            </h1>
            <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Keep your balance topped up, and we’ll instantly deliver software license keys to customers after purchase — 24/7 with zero manual work.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <motion.button
                type="button"
                aria-label="Start Free Trial"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-base sm:text-lg flex items-center justify-center gap-2 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
              <motion.button
                type="button"
                aria-label="Learn More"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('how-it-works')}
                className="bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-900 dark:text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-base sm:text-lg flex items-center justify-center gap-2 border border-gray-200 dark:border-slate-600 transition-colors duration-200"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                Learn More
              </motion.button>
            </div>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-8 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                No setup fees
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                14-day free trial
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Cancel anytime
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mt-8 lg:mt-0"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&crop=center"
                alt="Modern e-commerce dashboard showing store management interface and analytics"
                className="w-full h-auto rounded-2xl shadow-2xl"
                width="800"
                height="600"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/20 to-transparent rounded-2xl"></div>
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-white dark:bg-slate-800 p-2 sm:p-4 rounded-xl shadow-lg border border-gray-200 dark:border-slate-600"
            >
              <div className="text-lg sm:text-2xl font-bold text-violet-600 dark:text-violet-400">99.9%</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Uptime</div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 bg-white dark:bg-slate-800 p-2 sm:p-4 rounded-xl shadow-lg border border-gray-200 dark:border-slate-600"
            >
              <div className="text-lg sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">5min</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Setup Time</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;