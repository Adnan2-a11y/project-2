// src/components/Features.jsx
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

  // Motion variants for consistent animation
  const container = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.06, delayChildren: 0.04 * i },
    }),
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  return (
    <section
      id="features"
      className="py-16 sm:py-20 section transition-colors duration-300 dark:bg-slate-900"
      aria-label="A2Key features section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={container}
          custom={0}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2
            variants={cardVariant}
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-gray-100"
          >
            Why choose{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-300 dark:to-cyan-300">
              A2Key?
            </span>
          </motion.h2>

          <motion.p
            variants={cardVariant}
            className="mx-auto text-base sm:text-lg max-w-3xl text-gray-700 dark:text-gray-300"
            style={{ opacity: 0.78 }}
          >
            Powerful, secure, and reliable delivery tools built for marketplaces,
            resellers, and SaaS sellers — designed to reduce friction and increase
            conversions.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={container}
          custom={1}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {features.map((feature, index) => (
            <motion.article
              key={index}
              role="article"
              aria-labelledby={`feature-${index}-title`}
              tabIndex={0}
              variants={cardVariant}
              whileHover={{ y: -6, boxShadow: '0 10px 30px rgba(59, 53, 95, 0.08)' }}
              className="group card bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-slate-800 p-6 sm:p-8 rounded-2xl border border-gray-100 dark:border-gray-800 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/40"
            >
              <div className="flex items-start gap-4">
                <div className="flex-none h-12 w-12 rounded-lg bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-700 dark:to-indigo-700 flex items-center justify-center text-2xl">
                  <span aria-hidden="true" className="text-violet-700 dark:text-white">
                    {feature.title.split(' ')[0]}
                  </span>
                </div>

                <div className="min-w-0">
                  <h3
                    id={`feature-${index}-title`}
                    className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1"
                  >
                    {feature.title.replace(/^[^\s]+/, '').trim() || feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed" style={{ opacity: 0.9 }}>
                    {feature.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-gray-400 dark:text-gray-400">
                <span className="dark:text-gray-300">Reliable · Scalable · Secure</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Trusted by top resellers
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Optional CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 text-center"
        >
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm shadow hover:shadow-lg transition-shadow duration-200 bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-500 dark:to-indigo-400 text-white"
            aria-label="See pricing"
          >
            See pricing & plans
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;