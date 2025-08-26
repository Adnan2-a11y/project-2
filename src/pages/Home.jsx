import React from 'react';
    import Navbar from '../components/Navbar';
    import Hero from '../components/Hero';
    import Features from '../components/Features';
    import HowItWorks from '../components/HowItWorks';
    import Pricing from '../components/Pricing';
    import Demo from '../components/Demo';
    import Contact from '../components/Contact';
    import Footer from '../components/Footer';

    export default function Home() {
      return (
        <div className="min-h-screen bg-white dark:bg-slate-900">
          <Navbar />
          <main>
            <Hero />
            <Features />
            <HowItWorks />
            <Pricing />
            <Demo />
            <Contact />
          </main>
          <Footer />
        </div>
      );
    }