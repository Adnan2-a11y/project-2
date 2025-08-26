import React from 'react';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      title: '⚡ 24/7 License Delivery',
      description:
        'Orders trigger delivery via email and order page instantly after successful payment and wallet check.',
    },
    {
      title: '🔒 Key Vault + API',
      description:
        'Upload & encrypt keys (AES-256), set auto-rotate rules, validate inventory, and use REST API or webhooks.',
    },
    {
      title: '📩 Order Notifications',
      description:
        'Send Smart Telegram/Email alerts on delivery, low balance, failed attempts & more. Multi-admin supported.',
    },
    {
      title: '🛒 Abandon Cart Recovery',
      description:
        'Recover lost sales with timed discount offers and follow-up automations across platforms.',
    },
    {
      title: '📊 Live Delivery Logs',
      description:
        'Track, filter, or export delivery status by SKU, platform, geography — and automate key replacements.',
    },
    {
      title: '📦 Upload Your Own Stock',
      description:
        'Import CSV files of bulk keys, or add dynamically via API. Great for resellers and vendors.',
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-20 bg-white dark:bg-slate-900">
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
            Why choose
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
              {' '}A2Key?
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Powerful features designed to help you build, manage, and grow your online store with confidence.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group bg-gray-50 dark:bg-slate-800 p-6 sm:p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700 hover:border-violet-200 dark:hover:border-violet-700"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;