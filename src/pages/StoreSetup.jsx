import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, SkipForward } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StoreSetup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [storeData, setStoreData] = useState({
    platform: "",
    storeName: "",
    site: "",
    storeUrl: "",
    ckey: "",
    csecret: "",
    currency: "USD",
    preferences: "",
  });
  const [progress, setProgress] = useState(0);
  const [theme, setTheme] = useState("dark");
  const [syncing, setSyncing] = useState(false);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setStoreData((prev) => ({ ...prev, [field]: value }));
  };

  // Step navigation
  const nextStep = () => {
    if (currentStep === 1 && !storeData.platform) return alert("Select a platform");
    if (currentStep === 2 && (!storeData.storeName || !storeData.site)) return alert("Fill all fields");

    if (currentStep < 4) setCurrentStep(currentStep + 1);

    // Start syncing automatically on step 3
    if (currentStep === 3) startSync();
  };

  const prevStep = () => {
    if (currentStep > 1 && !syncing) setCurrentStep(currentStep - 1);
  };

  const skipSetup = () => navigate("/dashboard");

  // Simulate syncing
  const startSync = () => {
    setSyncing(true);
    setProgress(0);
    setCurrentStep(4);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setSyncing(false);
          setCurrentStep(5);
          setTimeout(() => navigate("/dashboard"), 2000);
          return 100;
        }
        return p + 10;
      });
    }, 500);
  };

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <label className="block font-medium text-gray-700 dark:text-gray-300">Select Platform</label>
            <select
              value={storeData.platform}
              onChange={(e) => handleInputChange("platform", e.target.value)}
              className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
            >
              <option value="">Select...</option>
              <option value="woocommerce">WooCommerce ✅</option>
              <option value="shopify">Shopify ✅</option>
            </select>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300">Store Name</label>
              <input
                value={storeData.storeName}
                onChange={(e) => handleInputChange("storeName", e.target.value)}
                className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                placeholder="Store Name"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300">Website URL</label>
              <input
                type="url"
                value={storeData.site}
                onChange={(e) => handleInputChange("site", e.target.value)}
                className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                placeholder="https://"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <p className="text-gray-500 dark:text-gray-300">Provide API credentials or use redirect</p>
            <details className="bg-gray-100 dark:bg-slate-700 p-4 rounded-lg">
              <summary className="cursor-pointer font-medium">Advanced Option ⚙️</summary>
              <div className="mt-4 space-y-4">
                <input
                  placeholder="Store URL"
                  value={storeData.storeUrl}
                  onChange={(e) => handleInputChange("storeUrl", e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                />
                <input
                  placeholder="Consumer Key"
                  value={storeData.ckey}
                  onChange={(e) => handleInputChange("ckey", e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                />
                <input
                  placeholder="Consumer Secret"
                  value={storeData.csecret}
                  onChange={(e) => handleInputChange("csecret", e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                />
              </div>
            </details>
            <button
              onClick={nextStep}
              className="px-6 py-3 bg-violet-600 text-white rounded-lg"
            >
              Connect Store
            </button>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-center text-gray-900 dark:text-white text-xl font-semibold">Syncing Your Store Data ⏳</h2>
            <p className="text-center text-gray-500 dark:text-gray-300 text-sm">
              Sit back, grab a coffee ☕ — we’re fetching your products, orders & users.
            </p>
            <div className="w-full h-4 bg-gray-300 dark:bg-slate-600 rounded-full overflow-hidden">
              <div className="h-full bg-violet-600 transition-all" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-center text-gray-500 dark:text-gray-300 text-sm">{progress}% completed</p>
          </div>
        );
      case 5:
        return (
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto text-white text-3xl">✔</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Success 🎉</h2>
            <p className="text-gray-500 dark:text-gray-300">Your store is connected and synced ✅</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 px-4 py-12 relative">
      <button
        onClick={toggleTheme}
        className="absolute top-5 right-5 px-3 py-1 border rounded-lg text-gray-500 dark:text-gray-300"
      >
        🌓
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg max-w-xl w-full relative"
      >
        {/* Progress Dots */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4, 5].map((step) => (
            <div key={step} className="flex-1 text-center relative">
              <div
                className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center font-semibold ${
                  currentStep >= step ? "bg-violet-600 text-white" : "bg-gray-200 dark:bg-slate-600 text-gray-500 dark:text-gray-300"
                }`}
              >
                {step}
              </div>
              {step < 5 && (
                <div
                  className={`h-0.5 w-full absolute top-4 left-1/2 transform -translate-x-1/2 ${
                    currentStep > step ? "bg-violet-600" : "bg-gray-200 dark:bg-slate-600"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        {renderStepContent()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 1 || syncing || currentStep === 5}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="flex gap-4">
            {currentStep < 4 && (
              <button
                onClick={skipSetup}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300"
              >
                Skip <SkipForward className="w-4 h-4" />
              </button>
            )}
            {currentStep < 5 && currentStep !== 3 && (
              <button
                onClick={nextStep}
                disabled={syncing}
                className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg disabled:opacity-50"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StoreSetup;