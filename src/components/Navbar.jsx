import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/a2key.png";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme(); // use theme context

  // close the mobile menu whenever route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "How it Works", to: "/how-it-works" },
    { name: "Features", to: "/features" },
    { name: "Product", to: "/product" },
    { name: "Integrations", to: "/integrations" },
    { name: "Pricing", to: "/pricing" },
    { name: "Demo", to: "/demo" },
    { name: "Contact", to: "/contact" },
  ];

  // Dynamic styles for navbar background & text based on theme
  const navStyle = {
    backgroundColor: theme === "light" ? "var(--nav-bg)" : "#071A2B", // dark navy for dark theme
    color: theme === "light" ? "var(--nav-text)" : "#E6F0FA", // light text on navy
  };

  const linkBaseStyle =
    "transition-colors duration-200 font-medium text-sm lg:text-base";

  const linkActiveStyle = "text-violet-600";
  const linkInactiveStyle =
    theme === "light"
      ? "text-gray-700 hover:text-violet-600"
      : "text-gray-300 hover:text-violet-400";

  const mobileLinkStyle =
    theme === "light"
      ? "text-gray-700 hover:text-violet-600"
      : "text-gray-300 hover:text-violet-400";

  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur-sm border-b w-full"
      style={navStyle}
    >
      <div className="w-full flex justify-between items-center h-16 px-4 md:px-8 lg:px-12">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link
            to="/"
            className="flex items-center gap-3"
            onClick={() => setIsOpen(false)}
            aria-label="Go to homepage"
          >
            <img
              src={Logo}
              alt="A2Key logo"
              className="h-8 w-auto sm:h-10"
              loading="eager"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={`${linkBaseStyle} ${
                location.pathname === link.to
                  ? linkActiveStyle
                  : linkInactiveStyle
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/login"
            className={`${linkBaseStyle} ${
              theme === "light"
                ? "text-gray-700 hover:text-violet-600"
                : "text-gray-300 hover:text-violet-400"
            }`}
          >
            Login
          </Link>

          <Link
            to="/start-free-trial"
            className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 lg:px-6 lg:py-2 rounded-lg text-sm lg:text-base font-medium transition"
          >
            Start Free Trial
          </Link>

          {/* Theme toggle button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 ml-2"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={() => setIsOpen((s) => !s)}
            className={`p-2 rounded-lg ${
              theme === "light"
                ? "text-gray-600 hover:bg-gray-100"
                : "text-gray-300 hover:bg-[#0b2130]"
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-t ${
              theme === "light"
                ? "bg-white border-gray-200"
                : "bg-[#071A2B] border-[#123042]"
            }`}
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`block w-full text-left font-medium py-2 text-base ${mobileLinkStyle}`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4 space-y-3">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className={`block w-full text-left font-medium py-2 text-base ${mobileLinkStyle}`}
                >
                  Login
                </Link>
                <Link
                  to="/start-free-trial"
                  onClick={() => setIsOpen(false)}
                  className="w-full inline-block text-center bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-medium transition text-base"
                >
                  Start Free Trial
                </Link>

                {/* Mobile Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="w-full inline-flex items-center justify-center px-6 py-3 border rounded-lg border-gray-300 dark:border-gray-600 text-base"
                >
                  {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}