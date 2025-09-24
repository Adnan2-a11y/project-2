import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Check, User, Mail, Lock } from "lucide-react";

// StartFreeTrial.jsx
// Single-file React component (Tailwind CSS required in host project)
// Usage: import StartFreeTrial from "./StartFreeTrial"; then render <StartFreeTrial />

export default function StartFreeTrial() {
  const [form, setForm] = useState({ name: "", email: "", company: "", password: "" });
  const [agree, setAgree] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // client-side validation (kept Bengali messages as original)
  const validate = useCallback(() => {
    const e = {};
    if (!form.name.trim()) e.name = "Nam dite hobe";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email prosesh korun";
    if (!form.company.trim()) e.company = "Company/Store name lagbe";
    // password optional but if present must be 8+
    if (form.password && form.password.length < 8) e.password = "Password minimum 8 character";
    if (!agree) e.agree = "Terms accept korun";
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [form, agree]);

  // small optimization: only update state if value changed (avoids extra re-renders)
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(prev => {
      if (prev[name] === value) return prev;
      return { ...prev, [name]: value };
    });
  }, []);

  // helper: simulate API call via Promise (non-blocking)
  const fakeApiCall = (delay = 900) =>
    new Promise(resolve => {
      const t = setTimeout(() => {
        clearTimeout(t);
        resolve();
      }, delay);
    });

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Guard: if already submitting, ignore extra clicks
      if (submitting) return;

      // run validation
      if (!validate()) return;

      setSubmitting(true);
      setErrors({});

      try {
        // await a non-blocking fake API call (replace with real API)
        await fakeApiCall(900);
        setSuccess(true);
      } catch (err) {
        // in real world setErrors({ form: "Something went wrong" }) or show toast
        setErrors({ form: "Server error. Try again." });
      } finally {
        setSubmitting(false);
      }
    },
    [validate, submitting]
  );

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-4">
            <div className="bg-green-50 dark:bg-green-900 p-3 rounded-full">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Trial started — welcome aboard!</h2>
              <p className="mt-1 text-gray-600 dark:text-gray-300">Amra apnar account setup kore dichi. Ekti confirmation email pathano hoyeche. Apni dashboard e giye store customize korte parben.</p>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            {/* keep anchors as-is; replace with client-side navigation in your router if desired */}
            <a href="/dashboard" className="inline-block px-5 py-2 rounded-xl bg-indigo-600 text-white font-medium">Go to Dashboard</a>
            <a href="/docs/getting-started" className="inline-block px-5 py-2 rounded-xl border border-gray-200 dark:border-gray-700">Getting Started Guide</a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, scale: 0.995 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.28 }} className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Hero / benefits */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm flex flex-col justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-50">Start your free 14-day trial</h1>
            <p className="mt-3 text-gray-600 dark:text-gray-300">Full-featured ecommerce platform built for fast-growing brands. No credit card required. Set up your store, add products, and start selling — today.</p>

            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3">
                <span className="p-2 bg-indigo-50 dark:bg-indigo-900 rounded-lg"><Check className="w-5 h-5 text-indigo-600" /></span>
                <div>
                  <div className="font-semibold text-gray-800 dark:text-gray-100">Unlimited products & orders</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Sell physical or digital goods with no listing limits.</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="p-2 bg-indigo-50 dark:bg-indigo-900 rounded-lg"><Check className="w-5 h-5 text-indigo-600" /></span>
                <div>
                  <div className="font-semibold text-gray-800 dark:text-gray-100">Payments & shipping</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Built-in gateways, taxes, and flexible shipping rules.</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="p-2 bg-indigo-50 dark:bg-indigo-900 rounded-lg"><Check className="w-5 h-5 text-indigo-600" /></span>
                <div>
                  <div className="font-semibold text-gray-800 dark:text-gray-100">Design-ready themes</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Beautiful responsive storefronts with easy customization.</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            <strong>14-day free trial</strong> • Cancel anytime • No credit card required
          </div>
        </section>

        {/* Right: Form */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">Create your account</h3>
              <p className="text-sm text-gray-500 dark:text-gray-300">Get immediate access to your admin dashboard.</p>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Trusted by <strong>10,000+</strong> stores</div>
          </div>

          {/* noValidate prevents browser's native validation UI which can conflict / delay */}
          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
            <label className="block">
              <span className="text-sm text-gray-700 dark:text-gray-200">Full name</span>
              <div className="mt-1 relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={`pl-10 pr-3 py-3 w-full rounded-xl border ${errors.name ? "border-red-300" : "border-gray-200 dark:border-gray-700"} bg-transparent`}
                  placeholder="e.g. Rahim Ahmed"
                  type="text"
                  autoComplete="name"
                />
              </div>
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </label>

            <label className="block">
              <span className="text-sm text-gray-700 dark:text-gray-200">Email address</span>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`pl-10 pr-3 py-3 w-full rounded-xl border ${errors.email ? "border-red-300" : "border-gray-200 dark:border-gray-700"} bg-transparent`}
                  placeholder="you@company.com"
                  type="email"
                  autoComplete="email"
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </label>

            <label className="block">
              <span className="text-sm text-gray-700 dark:text-gray-200">Company / Store name</span>
              <div className="mt-1 relative">
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className={`pl-3 pr-3 py-3 w-full rounded-xl border ${errors.company ? "border-red-300" : "border-gray-200 dark:border-gray-700"} bg-transparent`}
                  placeholder="e.g. Rahim's Apparel"
                  type="text"
                  autoComplete="organization"
                />
              </div>
              {errors.company && <p className="mt-1 text-xs text-red-500">{errors.company}</p>}
            </label>

            <label className="block">
              <span className="text-sm text-gray-700 dark:text-gray-200">Password (optional)</span>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  className={`pl-10 pr-3 py-3 w-full rounded-xl border ${errors.password ? "border-red-300" : "border-gray-200 dark:border-gray-700"} bg-transparent`}
                  placeholder="Create a password (or leave blank)"
                  autoComplete="new-password"
                />
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
            </label>

            <div className="flex items-center gap-3">
              <input id="agree" type="checkbox" checked={agree} onChange={() => setAgree(v => !v)} className="w-4 h-4 rounded" />
              <label htmlFor="agree" className="text-sm text-gray-600 dark:text-gray-300">I agree to the <a href="/terms" className="underline">Terms</a> and <a href="/privacy" className="underline">Privacy Policy</a>.</label>
            </div>
            {errors.agree && <p className="mt-1 text-xs text-red-500">{errors.agree}</p>}

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                aria-busy={submitting}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-600 text-white font-medium disabled:opacity-60"
              >
                {submitting ? 'Starting trial...' : 'Start free trial — 14 days'}
              </button>

              <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">After trial ends, you can choose a plan. No charge unless you upgrade.</div>
            </div>
          </form>

          <div className="mt-6 border-t border-gray-100 dark:border-gray-700 pt-6">
            <div className="text-sm text-gray-600 dark:text-gray-300">Need help? <a href="/support" className="underline">Contact support</a> or explore our <a href="/docs" className="underline">docs</a>.</div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-gray-500">
              <div>
                <div className="font-semibold text-gray-900 dark:text-gray-100">99.9%</div>
                <div>Uptime</div>
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-gray-100">24/7</div>
                <div>Support</div>
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-gray-100">PCI</div>
                <div>Compliant</div>
              </div>
            </div>
          </div>
        </section>
      </motion.div>

      {/* Small footer */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400">
        By starting a trial you agree to our Terms. © {new Date().getFullYear()} YourCompany
      </div>
    </div>
  );
}