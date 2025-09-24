// src/components/SubscribePanel.jsx
import React, { useState } from "react";

export default function SubscribePanel() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // ekhane API call korte paro subscription er jonno
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div className="bg-blue-400 dark:bg-gray-800 text-white py-8 px-4 md:px-20 w-full relative z-10">
      <h2 className="text-xl md:text-2xl font-bold mb-2 text-center text-white">
        Subscribe to Our Newsletter
      </h2>
      <p className="text-center mb-4 text-sm">
        Get the latest updates, offers, and news straight to your inbox.
      </p>
      {submitted ? (
        <p className="text-center font-semibold text-green-400">
          Thank you for subscribing!
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row items-center justify-center gap-2"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full md:w-1/2 px-4 py-2 rounded-md border-2 border-transparent focus:outline-none focus:border-white text-black text-sm"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-white text-blue-400 font-semibold rounded-md hover:bg-gray-200 transition text-sm"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}