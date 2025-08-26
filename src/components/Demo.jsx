import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Demo = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const demoImages = [
    {
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&crop=center",
      alt: "Dashboard overview showing sales analytics and key metrics",
      title: "Powerful Dashboard",
      description: "Monitor your store performance with real-time analytics"
    },
    {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&crop=center",
      alt: "Product management interface with inventory tracking",
      title: "Product Management",
      description: "Easily manage your inventory and product catalog"
    },
    {
      src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop&crop=center",
      alt: "Mobile-responsive storefront design on various devices",
      title: "Mobile Responsive",
      description: "Your store looks perfect on every device"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % demoImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + demoImages.length) % demoImages.length);
  };

  const handleWatchDemo = () => {
    navigate('/dashboard');
  };

  return (
    <section id="demo" className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            See It in
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
              {' '}Action
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore our intuitive interface and discover how easy it is to manage your online store.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden">
              <div className="relative h-80 sm:h-96">
                <img
                  src={demoImages[currentSlide].src}
                  alt={demoImages[currentSlide].alt}
                  className="w-full h-full object-cover"
                  width="800"
                  height="500"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-semibold mb-2">
                    {demoImages[currentSlide].title}
                  </h3>
                  <p className="text-gray-200">
                    {demoImages[currentSlide].description}
                  </p>
                </div>
              </div>

              {/* Navigation buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-colors duration-200"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-colors duration-200"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Slide indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {demoImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      index === currentSlide ? 'bg-white' : 'bg-white/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Experience the Difference
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Our platform combines powerful functionality with an intuitive interface, 
                making it easy for anyone to create and manage a professional online store.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-violet-600 dark:bg-violet-400 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Intuitive Design
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Clean, modern interface that's easy to navigate
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Real-time Updates
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    See changes instantly as you build your store
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Mobile Optimized
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Perfect experience on all devices and screen sizes
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button 
                onClick={handleWatchDemo}
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Play className="w-5 h-5" />
                Watch Full Demo
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Demo;