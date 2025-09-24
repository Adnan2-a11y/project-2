// File: src/pages/Pricing.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sun, Moon } from "lucide-react";

const highlightedPlans = [
  {
    name: "Basic",
    price: "$19/mo",
    description: "Essential tools for getting started.",
    features: ["1 Project", "Basic Analytics", "Email Support", "Community Access"],
  },
  {
    name: "Standard",
    price: "$49/mo",
    description: "For growing teams & businesses.",
    features: ["5 Projects", "Advanced Analytics", "Priority Support", "Team Collaboration"],
    popular: true,
  },
  {
    name: "Premium",
    price: "$99/mo",
    description: "Best for scaling businesses.",
    features: ["Unlimited Projects", "Full Analytics Suite", "Dedicated Manager", "Premium Integrations"],
  },
];

export default function Pricing() {
  const [billingYearly, setBillingYearly] = useState(false); // false = monthly
  const [contactMsg, setContactMsg] = useState("");
  const [contactSending, setContactSending] = useState(false);
  const [demoMsg, setDemoMsg] = useState("");
  const [demoSending, setDemoSending] = useState(false);

  const appPlans = [
    {
      id: "starter",
      name: "Starter",
      monthly: 19,
      yearly: 15,
      subtitle: "For small stores testing auto delivery",
      features: ["500 deliveries", "Email delivery", "No API/webhooks"],
      cta: "Start Free",
    },
    {
      id: "growth",
      name: "Growth",
      monthly: 49,
      yearly: 39,
      subtitle: "For scaling resellers & dropshippers",
      features: ["5k deliveries", "Email & on-page delivery", "API access + logs"],
      cta: "Choose Growth",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      monthly: null,
      yearly: null,
      subtitle: "For enterprises & aggregator platforms",
      features: ["Unlimited keys", "Multi-store routing", "Dedicated account team"],
      cta: "Contact Sales",
    },
  ];

  function displayPrice(plan) {
    if (plan.monthly == null) return <span className="text-base">Custom</span>;
    if (billingYearly) {
      return (
        <div className="flex items-baseline gap-3">
          <span className="text-sm line-through text-muted">${plan.monthly}</span>
          <span className="text-2xl font-bold">${plan.yearly}</span>
          <span className="text-sm text-muted">/mo billed yearly</span>
        </div>
      );
    }
    return (
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold">${plan.monthly}</span>
        <span className="text-sm text-muted">/mo</span>
      </div>
    );
  }

  function handleContactSubmit(ev) {
    ev.preventDefault();
    setContactSending(true);
    setContactMsg("");
    setTimeout(() => {
      setContactMsg("Thanks — we received your request. We will contact you shortly.");
      setContactSending(false);
    }, 900);
  }

  function handleDemoSubmit(ev) {
    ev.preventDefault();
    setDemoSending(true);
    setDemoMsg("");
    setTimeout(() => {
      setDemoMsg("Thanks — lead submitted.");
      setDemoSending(false);
    }, 900);
  }

  // motion helpers
  const fade = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45 } };

  return (
    <div
      className="page-root w-full transition-colors duration-300"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
        minHeight: "100vh",
      }}
    >
      {/* Component-scoped CSS: light defaults + dark overrides + utility mappings */}
      <style>{`
        :root {
          /* local light-mode defaults (these are fallbacks; ThemeContext controls --bg-color/--text-color) */
          --surface: #ffffff;
          --muted: #6b7280;
          --muted-weak: #94a3b8;
          --card-border: rgba(15,23,42,0.06);
          --brand-from: #4f46e5;
          --brand-to: #06b6d4;
          --hero-grad: linear-gradient(90deg, rgba(239,246,255,1), rgba(255,255,255,1));
        }

        /* Dark-mode overrides (applies when <html> has .dark) */
        .dark .page-root {
          --surface: rgba(17,24,39,0.6);
          --muted: #9fb0c6;
          --muted-weak: #7f98b0;
          --card-border: rgba(255,255,255,0.04);
          --brand-from: #7c3aed;
          --brand-to: #06b6d4;
          --hero-grad: linear-gradient(90deg, rgba(6,10,15,0.6), rgba(8,20,30,0.4));
        }

        /* Map common utility classes used in markup to variables inside the page-root */
        .page-root .bg-white { background: var(--surface) !important; color: inherit !important; }
        .page-root .bg-slate-50 { background: var(--hero-grad) !important; }
        .page-root .text-slate-900 { color: var(--text-color) !important; }
        .page-root .text-slate-600, .page-root .text-slate-500 { color: var(--muted) !important; }
        .page-root .border-slate-100, .page-root .border-slate-200 { border-color: var(--card-border) !important; }
        .page-root .shadow-md, .page-root .shadow-lg, .page-root .shadow-xl, .page-root .shadow-2xl { box-shadow: 0 12px 36px rgba(2,6,23,0.06) !important; }

        /* small helper classes used below */
        .section-card {
          background: var(--surface);
          border: 1px solid var(--card-border);
          border-radius: 12px;
          padding: 1rem;
          color: var(--text-color);
        }

        .muted { color: var(--muted); }
        .muted-weak { color: var(--muted-weak); }

        .plan-popular {
          border: 1.5px solid rgba(99,102,241,0.16);
          background: linear-gradient(180deg, rgba(99,102,241,0.06), var(--surface));
        }

        .btn-primary {
          background: linear-gradient(90deg, var(--brand-from), var(--brand-to));
          color: #fff;
        }

        .tag-inline {
          display:inline-flex; align-items:center; gap:.5rem; padding:.25rem .6rem; border-radius:999px; font-weight:600;
          background: rgba(99,102,241,0.08); color: var(--text-color);
        }

        /* Small responsive tweaks */
        @media (max-width: 768px) {
          .grid-md-3 { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* HERO */}
      <header className="w-full py-12 bg-slate-50">
        <div className="w-full px-4 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 tag-inline">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m4 0h-1v4h-1" />
                </svg>
                New • Auto license delivery
              </span>

              <h1 className="mt-4 text-3xl lg:text-4xl font-extrabold leading-tight" style={{ color: "var(--text-color)" }}>
                Simple, predictable pricing for automated license delivery
              </h1>

              <p className="mt-3 text-slate-600 text-base muted">
                Plug into WooCommerce or Shopify. When an order arrives, we check your wallet balance and instantly deliver a valid license key — no stock hassle, no manual work.
              </p>

              <div className="mt-6 flex gap-3 flex-wrap">
                <a href="#pricing-cards" className="inline-block px-4 py-2 rounded-lg btn-primary shadow">See Plans</a>
                <a href="#contact" className="inline-block px-4 py-2 rounded-lg section-card border">Request Demo</a>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="p-3 section-card flex flex-col">
                  <div className="text-2xl font-semibold">99.9%</div>
                  <div className="text-sm muted">Delivery success</div>
                </div>
                <div className="p-3 section-card flex flex-col">
                  <div className="text-2xl font-semibold">24/7</div>
                  <div className="text-sm muted">Autopilot operations</div>
                </div>
                <div className="p-3 section-card flex flex-col">
                  <div className="text-2xl font-semibold">&lt;2s</div>
                  <div className="text-sm muted">Avg. dispatch time</div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-96">
              <div className="rounded-xl section-card shadow-lg p-5">
                <div className="inline-flex items-center gap-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Live Demo</div>

                <pre className="mt-3 text-sm overflow-x-auto bg-slate-50 p-3 rounded text-xs muted-weak">{`// webhook flow (pseudo)
POST /order-created
→ checkWallet()
→ if (balance >= cost) { reserveKey(); sendToCustomer(); debitWallet(cost); }`}</pre>

                <div className="mt-3 flex gap-2">
                  <a className="px-3 py-2 rounded-lg btn-primary" href="#contact">Request Sandbox</a>
                  <a className="px-3 py-2 rounded-lg section-card" href="#faq">Read FAQ</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Pricing cards */}
      <section id="pricing-cards" className="w-full py-16">
        <div className="w-full px-4 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold" style={{ color: "var(--text-color)" }}>Straightforward plans</h2>

            <div className="inline-flex items-center gap-4 bg-slate-50 rounded-full p-2">
              <span className="text-sm font-medium muted">Billing</span>

              <div className="relative inline-flex items-center p-1 bg-white rounded-full shadow-sm border border-slate-200">
                <button
                  aria-pressed={!billingYearly}
                  onClick={() => setBillingYearly(false)}
                  className={`relative z-10 px-3 py-1 rounded-full text-sm font-medium ${!billingYearly ? 'text-white bg-indigo-600' : 'text-slate-700'}`}
                  aria-label="Monthly billing"
                >
                  <span className="inline-flex items-center gap-2">💸 Monthly</span>
                </button>

                <button
                  aria-pressed={billingYearly}
                  onClick={() => setBillingYearly(true)}
                  className={`relative z-10 px-3 py-1 rounded-full text-sm font-medium ${billingYearly ? 'text-white bg-indigo-600' : 'text-slate-700'}`}
                  aria-label="Yearly billing"
                >
                  <span className="inline-flex items-center gap-2">📆 Yearly</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlightedPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className={`relative rounded-2xl p-8 shadow-lg ${plan.popular ? 'plan-popular' : 'section-card'}`}
                role="region"
                aria-label={`${plan.name} plan`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 right-4 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full shadow">Most popular</div>
                )}

                <h3 className="text-2xl font-semibold" style={{ color: "var(--text-color)" }}>{plan.name}</h3>
                <p className="mt-2 text-4xl font-extrabold tracking-tight" style={{ color: "var(--text-color)" }}>{plan.price}</p>
                <p className="mt-2 text-sm muted">{plan.description}</p>

                <ul className="mt-6 space-y-3 text-sm" style={{ color: "var(--text-color)" }}>
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-1"><Check className="w-5 h-5 text-green-500" /></span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <button
                    className={`w-full py-3 rounded-lg font-semibold transition ${plan.popular ? 'btn-primary' : 'btn-primary'}`}
                    aria-label={`Get started with ${plan.name}`}
                  >
                    Get Started
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* App-style pricing */}
          <div className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-6 section-card">
                <h3 className="text-lg font-semibold">Pay-as-you-go</h3>
                <p className="mt-1 text-sm muted">No monthly subscription — wallet based.</p>

                <div className="mt-4">
                  <div className="text-xl font-semibold">$0</div>
                  <div className="text-sm muted-weak">+ per-delivery fees (from $0.02, volume based)</div>
                </div>

                <ul className="mt-4 text-sm space-y-1" style={{ color: "var(--text-color)" }}>
                  <li>Per-delivery fee: From $0.02 (volume based)</li>
                  <li>No monthly subscription</li>
                  <li>Wallet required</li>
                </ul>

                <div className="mt-4">
                  <a href="#get-started" className="px-4 py-2 rounded-lg btn-primary">Use PAYG</a>
                </div>
              </div>

              {appPlans.map((plan, idx) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * idx }}
                  className={`p-6 rounded-lg ${plan.id === 'growth' ? 'plan-popular' : 'section-card'}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{plan.name}</h3>
                      <div className="text-sm muted-weak">{plan.subtitle}</div>
                    </div>
                    <div className="text-right">
                      {displayPrice(plan)}
                    </div>
                  </div>

                  <ul className="mt-4 list-disc pl-5 text-sm" style={{ color: "var(--text-color)" }}>
                    {plan.features.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>

                  <div className="mt-4">
                    {plan.id === "enterprise" ? (
                      <a href="#contact" className="px-4 py-2 rounded-lg section-card border">{plan.cta}</a>
                    ) : (
                      <a href="#contact" className="px-4 py-2 rounded-lg btn-primary">{plan.cta}</a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="mt-4 text-sm muted-weak">Note: Wallet balance is used to pay per-delivery fees; orders pause if balance is insufficient.</p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="w-full py-10 border-t border-slate-100">
        <div className="w-full px-4 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-xl font-semibold" style={{ color: "var(--text-color)" }}>Top reseller offers</h2>
          <p className="text-sm muted mt-1">Selected deals available via our shop — link to full catalog.</p>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 section-card flex items-start justify-between">
              <div>
                <div className="font-semibold">Office 365 — 1 Year</div>
                <div className="text-sm muted">Wholesale / Reseller</div>
                <div className="mt-2 text-sm muted">Qty: 1000+ keys available</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold">$0.70 <span className="line-through muted-weak text-sm">$19</span></div>
                <a className="mt-3 inline-block px-3 py-2 rounded-lg section-card border" href="https://a2key.com/shop" target="_blank" rel="noopener noreferrer">Buy</a>
              </div>
            </div>

            <div className="p-4 section-card flex items-start justify-between">
              <div>
                <div className="font-semibold">Win 10/11 Pro</div>
                <div className="text-sm muted">Retail — 30 days</div>
                <div className="mt-2 text-sm muted">Fast delivery</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold">$0.60 <span className="line-through muted-weak text-sm">$129</span></div>
                <a className="mt-3 inline-block px-3 py-2 rounded-lg section-card border" href="https://a2key.com/shop" target="_blank" rel="noopener noreferrer">View</a>
              </div>
            </div>

            <div className="p-4 section-card flex items-start justify-between">
              <div>
                <div className="font-semibold">Adobe CC — Family</div>
                <div className="text-sm muted">1 Year — Reseller deals</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold">$75 <span className="line-through muted-weak text-sm">$599</span></div>
                <a className="mt-3 inline-block px-3 py-2 rounded-lg btn-primary" href="https://a2key.com/shop" target="_blank" rel="noopener noreferrer">Buy</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Demo */}
      <section id="contact" className="w-full py-12">
        <div className="w-full px-4 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <form className="lg:col-span-2 p-6 section-card" onSubmit={handleContactSubmit}>
              <h2 className="text-xl font-semibold">Contact & Request Demo</h2>
              <p className="mt-2 text-sm muted">Tell us about your integration, volume, and priorities — we'll follow up with pricing and a sandbox if requested.</p>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="flex flex-col">
                  <span className="sr-only">Your name</span>
                  <input required name="name" placeholder="Your name" className="w-full px-3 py-2 rounded border bg-transparent border-slate-200" />
                </label>
                <label className="flex flex-col">
                  <span className="sr-only">Email</span>
                  <input required type="email" name="email" placeholder="you@example.com" className="w-full px-3 py-2 rounded border bg-transparent border-slate-200" />
                </label>
              </div>

              <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                <input name="platform" placeholder="Platform (Woo, Shopify...)" className="w-full px-3 py-2 rounded border bg-transparent border-slate-200" />
                <input name="volume" placeholder="e.g., 1,000 orders / mo" className="w-full px-3 py-2 rounded border bg-transparent border-slate-200" />
                <select name="priority" className="w-full px-3 py-2 rounded border bg-transparent border-slate-200">
                  <option>Normal</option>
                  <option>Urgent</option>
                </select>
              </div>

              <div className="mt-3">
                <textarea name="msg" rows={4} placeholder="Message — tell us your goals or request a sandbox" className="w-full px-3 py-2 rounded border bg-transparent border-slate-200" />
              </div>

              <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
                <div className="text-sm muted">or Telegram: <strong>@a2keyadmin</strong> · WhatsApp: <strong>+44 7577 321476</strong></div>
                <div className="flex gap-2">
                  <button disabled={contactSending} type="submit" className="px-4 py-2 rounded-lg btn-primary">{contactSending ? 'Sending...' : 'Submit'}</button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDemoSubmit(e);
                    }}
                    className="px-4 py-2 rounded-lg section-card border"
                  >
                    {demoSending ? 'Requesting...' : 'Request Price List'}
                  </button>
                </div>
              </div>

              <div aria-live="polite" className="mt-3 min-h-[24px]">
                {(contactMsg || demoMsg) && <p className="text-sm" style={{ color: "var(--brand-from)" }}>{contactMsg || demoMsg}</p>}
              </div>
            </form>

            <aside className="p-6 section-card">
              <h3 className="text-lg font-semibold">Direct contacts</h3>
              <p className="mt-2 text-sm muted">
                Telegram: <a className="text-indigo-600" href="https://t.me/a2keyadmin" target="_blank" rel="noopener noreferrer">@a2keyadmin</a><br />
                WhatsApp: <a className="text-indigo-600" href="https://wa.me/447577321476" target="_blank" rel="noopener noreferrer">+44 7577 321476</a><br />
                Email: <a className="text-indigo-600" href="mailto:sales@a2key.com">sales@a2key.com</a><br />
                Web: <a className="text-indigo-600" href="https://a2key.com" target="_blank" rel="noopener noreferrer">a2key.com</a>
              </p>

              <h4 className="mt-4 font-semibold">Security & Compliance</h4>
              <ul className="list-disc pl-5 mt-2 text-sm muted">
                <li>Unique key reservation & reuse protection</li>
                <li>Audit logs & export</li>
                <li>Access roles for team members</li>
              </ul>

              <div className="mt-4">
                <h4 className="font-semibold">Need something like Keysender?</h4>
                <p className="text-sm muted">We offer automated delivery, inventory tracking, and integrations for WooCommerce & Shopify.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Get started CTA */}
      <section id="get-started" className="w-full py-8 bg-slate-50 border-t border-slate-100">
        <div className="w-full px-4 lg:px-8 max-w-7xl mx-auto">
          <div className="p-6 rounded-lg section-card flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Ready to automate deliveries?</h3>
              <p className="text-sm muted">Create account, install plugin/app, top up your wallet — and let orders ship themselves.</p>
            </div>
            <div className="flex gap-2">
              <a className="px-4 py-2 rounded-lg btn-primary" href="#contact">Request Demo</a>
              <a className="px-4 py-2 rounded-lg section-card" href="#pricing-cards">See Plans</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full py-6 section-card mt-10">
        <div className="w-full px-4 lg:px-8 text-sm muted">© {new Date().getFullYear()} system.a2key.com — All rights reserved.</div>
      </footer>
    </div>
  );
}