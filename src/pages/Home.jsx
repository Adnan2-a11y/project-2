// src/pages/Home.jsx
import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Pricing from '../components/Pricing';
import Demo from '../components/Demo';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <div
      className="home-root relative w-full min-h-screen overflow-x-hidden overflow-y-auto transition-colors duration-300"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)"
      }}
    >
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover pointer-events-none -z-20"
        src="/videos/hero-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        poster="/images/hero-poster.jpg"
        aria-hidden="true"
      />

      {/* Overlay */}
      <div
        className="hero-overlay absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-black/30 to-black/60"
        aria-hidden="true"
      />

      <main className="relative z-10 w-full">
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <Demo />
        <Contact />
      </main>

      
    </div>
  );
}
