import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./src/context/ThemeContext.jsx";

import Navbar from "./src/components/Navbar.jsx";
import SubscribePanel from "./src/components/SubscribePanel.jsx";
import Footer from "./src/components/Footer.jsx";

import Home from "./src/pages/Home.jsx";
import HowItWorks from "./src/pages/howitworks.jsx";
import Features from "./src/pages/features.jsx";
import Product from "./src/pages/product.jsx";
import Pricing from "./src/pages/Pricing.jsx";
import Demo from "./src/pages/demo.jsx";
import Contact from "./src/pages/contact.jsx";
import Integrations from "./src/pages/Integrations.jsx";
import Login from "./src/pages/Login.jsx";
import StartFreeTrial from "./src/pages/StartFreeTrial.jsx";
import ProductToCartPage from "./src/pages/ProductToCartPage.jsx";
import CheckoutPage from "./src/pages/CheckoutPage.jsx";

function AppWrapper() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

function App() {
  return (
    <Router>
      <div
        className="flex flex-col min-h-screen w-screen transition-colors duration-300"
        style={{
          background: "var(--bg, #f8fafc)",
          color: "var(--text, #0b1220)",
        }}
      >
        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        <main className="flex-grow w-full">
          <Routes>
            {/* Home page full-width, no padding */}
            <Route path="/" element={<Home />} />

            {/* Other pages with optional padding */}
            <Route
              path="/how-it-works"
              element={
                <div className="px-4 sm:px-6 lg:px-8 py-10">
                  <HowItWorks />
                </div>
              }
            />
            <Route
              path="/features"
              element={
                <div className="px-4 sm:px-6 lg:px-8 py-10">
                  <Features />
                </div>
              }
            />
            <Route
              path="/product"
              element={
                <div className="px-4 sm:px-6 lg:px-8 py-10">
                  <Product />
                </div>
              }
            />
            <Route
              path="/integrations"
              element={
                <div className="px-4 sm:px-6 lg:px-8 py-10">
                  <Integrations />
                </div>
              }
            />
            <Route
              path="/pricing"
              element={
                <div className="px-4 sm:px-6 lg:px-8 py-10">
                  <Pricing />
                </div>
              }
            />
            <Route
              path="/demo"
              element={
                <div className="px-4 sm:px-6 lg:px-8 py-10">
                  <Demo />
                </div>
              }
            />
            <Route
              path="/contact"
              element={
                <div className="px-4 sm:px-6 lg:px-8 py-10">
                  <Contact />
                </div>
              }
            />
            <Route
              path="/login"
              element={
                <div className="px-4 sm:px-6 lg:px-8 py-10">
                  <Login />
                </div>
              }
            />
            <Route
              path="/start-free-trial"
              element={
                <div className="px-4 sm:px-6 lg:px-8 py-10">
                  <StartFreeTrial />
                </div>
              }
            />
            <Route
              path="/cart-demo"
              element={
                <div className="px-4 sm:px-6 lg:px-8 py-10">
                  <ProductToCartPage />
                </div>
              }
            />
            <Route
              path="/checkout"
              element={
                <div className="px-4 sm:px-6 lg:px-8 py-10">
                  <CheckoutPage />
                </div>
              }
            />
            {/* 404 */}
            <Route
              path="*"
              element={
                <div className="text-center py-20">
                  <h2 className="text-2xl font-semibold">404 — Page not found</h2>
                </div>
              }
            />
          </Routes>
        </main>

        {/* Subscribe panel */}
        <SubscribePanel />

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default AppWrapper;