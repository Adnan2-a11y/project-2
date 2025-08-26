import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Star } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$19',
      period: '/month',
      description: 'For small stores testing auto delivery',
      features: [
        { text: '500 deliveries', available: true },
        { text: 'Email delivery', available: true },
        { text: 'API/webhooks', available: false },
      ],
      buttonText: 'Start Free Trial',
      popular: false,
    },
    {
      name: 'Professional',
      price: '$49',
      period: '/month',
      description: 'For scaling resellers & dropshippers',
      features: [
        { text: '5k deliveries', available: true },
        { text: 'Email & on-page delivery', available: true },
        { text: 'API access + logs', available: true },
      ],
      buttonText: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '/month',
      description: 'For enterprises & aggregator platforms',
      features: [
        { text: 'Unlimited keys', available: true },
        { text: 'Multi-store/marketplace routing', available: true },
        { text: 'Dedicated account team', available: true },
      ],
      buttonText: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-16 sm:py-20 bg-white dark:bg-slate-900">
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
            Simple, Transparent
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
              {' '}Pricing
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Wallet top-up is separate. Choose a monthly plan to unlock advanced features.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular
                  ? 'border-violet-500 dark:border-violet-400 lg:scale-105'
                  : 'border-gray-200 dark:border-slate-700 hover:border-violet-300 dark:hover:border-violet-600'
              }`}
            >
              {/* Most Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1 shadow-lg">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Card Content */}
              <div className="p-6 sm:p-8">
                {/* Plan Header */}
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white">
                      {plan.price}
                    </span>
                    <span className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 ml-1">
                      {plan.period}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div
                        className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center mt-0.5 ${
                          feature.available
                            ? 'bg-green-100 dark:bg-green-900'
                            : 'bg-red-100 dark:bg-red-900'
                        }`}
                      >
                        {feature.available ? (
                          <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 dark:text-green-400" />
                        ) : (
                          <X className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 dark:text-red-400" />
                        )}
                      </div>
                      <span
                        className={`text-sm sm:text-base ${
                          feature.available
                            ? 'text-gray-700 dark:text-gray-300'
                            : 'text-gray-400 dark:text-gray-500 line-through'
                        }`}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button
                  className={`w-full py-3 px-4 sm:py-4 sm:px-6 rounded-lg font-semibold text-base sm:text-lg transition-all duration-200 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                      : 'bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-900 dark:text-white'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-12"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm sm:text-base">
            All plans include 14-day free trial • No setup fees • Cancel anytime
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              99.9% Uptime
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              24/7 Support
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Money-back Guarantee
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;