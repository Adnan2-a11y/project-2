// File: src/pages/Integrations.jsx
import React, { useState, useEffect } from "react";
import { ShoppingCart, Zap, Link2, Database } from "lucide-react";
import { motion } from "framer-motion";

export default function Integrations() {
  // form state (keeps original fields but makes them controlled for reliability)
  const [topForm, setTopForm] = useState({ name: "", email: "", platform: "", volume: "", priority: "Normal", message: "" });
  const [demoForm, setDemoForm] = useState({ name: "", email: "", platform: "WooCommerce", volume: "", message: "" });
  const [getStartedForm, setGetStartedForm] = useState({ name: "", email: "", platform: "WooCommerce", volumeRange: "0–100", priority: "Normal", message: "" });

  const [topMsg, setTopMsg] = useState("");
  const [demoMsg, setDemoMsg] = useState("");
  const [startedMsg, setStartedMsg] = useState("");

  useEffect(() => {
    // ensure mounted scroll restore or small effect if needed
  }, []);

  function handleTopSubmit(e) {
    e.preventDefault();
    if (!topForm.name || !topForm.email) {
      setTopMsg("Please fill name & email.");
      return;
    }
    setTopMsg("Thanks — we'll reply on Telegram/WhatsApp or by email.");
  }

  function handleDemoSubmit(e) {
    e.preventDefault();
    if (!demoForm.name || !demoForm.email) {
      setDemoMsg("Please fill name & email.");
      return;
    }
    setDemoMsg("Demo request received — expect a reply within 24 hours.");
  }

  function handleGetStartedSubmit(e) {
    e.preventDefault();
    if (!getStartedForm.name || !getStartedForm.email) {
      setStartedMsg("Please provide name & email.");
      return;
    }
    setStartedMsg("Request received — our sales team will contact you.");
  }

  // Motion variants
  const easing = [0.2, 0.8, 0.2, 1];
  const fadeInUp = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easing } } };
  const staggerParent = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

  // small shadow style (kept inline for fine control)
  const cardTopShadow = {
    boxShadow: "0 10px 30px rgba(2,6,23,0.06), 0 -6px 12px rgba(14,165,233,0.03) inset",
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerParent}
      className="page-root w-full min-h-screen font-sans"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
        transition: "background-color .32s ease, color .32s ease",
      }}
    >
      {/* Component-scoped CSS (light defaults + dark overrides) */}
      <style>{`
        /* default values — these will be overridden by ThemeContext's --bg-color / --text-color */
        :root {
          --page-surface: #ffffff;
          --muted: #6b7280;
          --card-border: rgba(15,23,42,0.06);
          --btn-from: #3b82f6;
          --btn-to: #8b5cf6;
          --accent-soft: rgba(59,130,246,0.08);
        }

        /* Dark mode overrides when <html> has .dark */
        .dark .page-root {
          --page-surface: rgba(17,24,39,0.5);
          --muted: #9fb0c6;
          --card-border: rgba(255,255,255,0.04);
          --btn-from: #4f46e5;
          --btn-to: #06b6d4;
          --accent-soft: rgba(99,102,241,0.06);
        }

        /* Map frequently used utility classes to theme variables inside page-root so we don't edit all usages */
        .page-root .bg-white { background: var(--page-surface) !important; color: inherit !important; }
        .page-root .bg-slate-100 { background: rgba(255,255,255,0.03) !important; } /* subtle surface */
        .page-root .text-slate-900 { color: var(--text-color) !important; }
        .page-root .text-slate-600 { color: var(--muted) !important; }
        .page-root .border-slate-200 { border-color: var(--card-border) !important; }
        .page-root .shadow-2xl, .page-root .shadow-xl { box-shadow: 0 14px 40px rgba(2,6,23,0.06) !important; }
        .page-root .rounded-2xl, .page-root .rounded-3xl { background-clip: padding-box; }

        /* Small helper classes */
        .section-card {
          background: var(--page-surface);
          border: 1px solid var(--card-border);
          color: var(--text-color);
        }

        .muted-text { color: var(--muted); }

        .tag-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(99,102,241,0.06);
          color: var(--text-color);
          font-weight: 600;
          font-size: 0.85rem;
        }

        .btn-accent {
          background: linear-gradient(90deg, var(--btn-from), var(--btn-to));
          color: #fff;
        }

        /* Responsive container */
        .integrations-container { max-width: 1200px; margin: 0 auto; padding: 0 16px; }

        @media (min-width: 768px) {
          .integrations-container { padding: 0 32px; }
        }
      `}</style>

      <div className="w-full max-w-full">
        {/* TOP BAR */}
        <motion.div variants={fadeInUp} className="w-full flex items-center justify-between px-6 md:px-12 py-5">
          <div className="flex items-center gap-4">
            <div className="text-lg font-bold tracking-tight text-slate-900">system.a2key.com</div>
            <div className="hidden md:inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-xs muted-text">Integrations & Platform</div>
          </div>
          <div className="flex items-center gap-3">
            <motion.a href="https://t.me/a2keyadmin" target="_blank" rel="noreferrer" className="inline-flex items-center px-3 py-2 rounded-lg border section-card hover:scale-105 transform transition" whileHover={{ y: -2 }}>
              Contact
            </motion.a>
          </div>
        </motion.div>

        {/* HERO — full width, large padding */}
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="w-full px-6 md:px-12 pb-12">
          <motion.div variants={fadeInUp} className="w-full rounded-3xl p-10 md:p-16 shadow-xl section-card relative overflow-hidden" style={cardTopShadow}>
            {/* decorative gradient blob (keeps same visual in dark) */}
            <motion.div aria-hidden className="pointer-events-none absolute -right-24 -top-24 opacity-30" animate={{ rotate: [0, 45, 0] }} transition={{ duration: 12, repeat: Infinity }}>
              <div className="w-72 h-72 rounded-full" style={{ background: "radial-gradient(circle at 20% 20%, rgba(99,102,241,0.18), transparent 30%), radial-gradient(circle at 80% 80%, rgba(56,189,248,0.12), transparent 40%)", filter: "blur(48px)" }} />
            </motion.div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="max-w-3xl">
                <motion.h1 variants={fadeInUp} className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">Integrations & Platform</motion.h1>
                <motion.p variants={fadeInUp} className="mt-3 text-lg muted-text">Get started with official plugins, or build custom pipelines using a well-documented REST API + webhooks. Professional-grade, secure, and built for scale.</motion.p>

                <motion.div variants={fadeInUp} className="mt-6 flex flex-wrap gap-3">
                  <motion.span whileHover={{ scale: 1.03 }} className="tag-pill">🧩 WooCommerce Plugin</motion.span>
                  <motion.span whileHover={{ scale: 1.03 }} className="tag-pill">🛍️ Shopify App</motion.span>
                  <motion.span whileHover={{ scale: 1.03 }} className="tag-pill">🔗 REST API</motion.span>
                </motion.div>

                <motion.div variants={fadeInUp} className="mt-8 flex gap-4 items-center">
                  <motion.a whileHover={{ scale: 1.02 }} className="inline-flex items-center gap-2 px-4 py-3 rounded-lg btn-accent font-semibold shadow-lg" href="#get-started">Get started</motion.a>
                  <motion.a whileHover={{ scale: 1.02 }} className="inline-flex items-center gap-2 px-4 py-3 rounded-lg section-card border transition text-slate-900" href="#integrations-list">See integrations</motion.a>
                </motion.div>
              </div>

              <motion.div variants={fadeInUp} className="w-full lg:w-1/3">
                <motion.div whileHover={{ translateY: -6 }} transition={{ type: 'spring', stiffness: 160 }} className="rounded-2xl p-6 md:p-8 section-card" style={cardTopShadow}>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg p-3 section-card" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                      <ShoppingCart size={22} className="text-sky-600" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Quick contact</div>
                      <div className="text-xs mt-1 muted-text">Telegram: <a className="text-sky-600" href="https://t.me/a2keyadmin">@a2keyadmin</a></div>
                      <div className="text-xs mt-1 muted-text">WhatsApp: <a className="text-sky-600" href="https://wa.me/447577321476">+44 7577 321476</a></div>
                    </div>
                    <motion.span aria-hidden animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="ml-auto hidden md:inline-flex items-center px-3 py-1 rounded-full bg-sky-50 text-xs text-sky-600">Live</motion.span>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-3">
                    <motion.div whileHover={{ scale: 1.02 }} className="p-4 rounded-xl section-card border transition" style={{ background: "linear-gradient(90deg, rgba(248,250,252,0.8), rgba(238,242,255,0.8))", ...cardTopShadow }}>
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-md section-card"><Zap size={22} className="text-sky-600" /></div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900">Instant delivery</div>
                          <div className="text-xs muted-text">Auto-send keys after payment</div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} className="p-4 rounded-xl section-card border transition" style={{ background: "linear-gradient(90deg, rgba(248,250,252,0.8), rgba(238,242,255,0.8))", ...cardTopShadow }}>
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-md section-card"><Link2 size={22} className="text-sky-600" /></div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900">REST API</div>
                          <div className="text-xs muted-text">JSON endpoints, OAuth-friendly</div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} className="p-4 rounded-xl section-card border transition" style={{ background: "linear-gradient(90deg, rgba(248,250,252,0.8), rgba(238,242,255,0.8))", ...cardTopShadow }}>
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-md section-card"><Database size={22} className="text-sky-600" /></div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900">CSV / Bulk</div>
                          <div className="text-xs muted-text">Large inventory imports</div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        <div className="px-6 md:px-12 integrations-container">
          {/* CONTACT + DEMO — LARGER CARDS */}
          <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.form onSubmit={handleTopSubmit} variants={fadeInUp} className="rounded-2xl p-8 section-card ring-0 hover:ring-1 hover:ring-sky-200 transition" style={cardTopShadow}>
              <h3 className="text-2xl font-semibold text-slate-900">Contact & Demo</h3>
              <p className="mt-2 muted-text">Need integration help or reseller pricing? Fill the form or ping us directly.</p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col">
                  <span className="text-sm font-medium text-slate-900">Name</span>
                  <input value={topForm.name} onChange={(e) => setTopForm(prev => ({ ...prev, name: e.target.value }))} required placeholder="Your name" className="mt-2 p-4 rounded-xl border section-card border-slate-200 bg-white text-slate-900 outline-none focus:ring-2 focus:ring-sky-500 transition-shadow" />
                </label>
                <label className="flex flex-col">
                  <span className="text-sm font-medium text-slate-900">Email</span>
                  <input value={topForm.email} onChange={(e) => setTopForm(prev => ({ ...prev, email: e.target.value }))} type="email" required placeholder="you@example.com" className="mt-2 p-4 rounded-xl border section-card border-slate-200 bg-white text-slate-900 outline-none focus:ring-2 focus:ring-sky-500 transition-shadow" />
                </label>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="flex flex-col">
                  <span className="text-sm font-medium text-slate-900">Platform</span>
                  <input value={topForm.platform} onChange={(e) => setTopForm(prev => ({ ...prev, platform: e.target.value }))} placeholder="WooCommerce, Shopify, etc" className="mt-2 p-4 rounded-xl border section-card border-slate-200 bg-white text-slate-900" />
                </label>
                <label className="flex flex-col">
                  <span className="text-sm font-medium text-slate-900">Monthly Orders</span>
                  <input value={topForm.volume} onChange={(e) => setTopForm(prev => ({ ...prev, volume: e.target.value }))} placeholder="e.g., 1,000" className="mt-2 p-4 rounded-xl border section-card border-slate-200 bg-white text-slate-900" />
                </label>
                <label className="flex flex-col">
                  <span className="text-sm font-medium text-slate-900">Priority</span>
                  <select value={topForm.priority} onChange={(e) => setTopForm(prev => ({ ...prev, priority: e.target.value }))} className="mt-2 p-4 rounded-xl border section-card border-slate-200 bg-white text-slate-900">
                    <option>Normal</option>
                    <option>Urgent</option>
                  </select>
                </label>
              </div>

              <label className="mt-6 flex flex-col">
                <span className="text-sm font-medium text-slate-900">Message</span>
                <textarea value={topForm.message} onChange={(e) => setTopForm(prev => ({ ...prev, message: e.target.value }))} rows={5} placeholder="Tell us your goals..." className="mt-2 p-4 rounded-xl border section-card border-slate-200 bg-white text-slate-900" />
              </label>

              <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
                <div className="text-sm muted-text">or Telegram: <strong className="text-slate-800">@a2keyadmin</strong> · WhatsApp: <strong className="text-slate-800">+44 7577 321476</strong></div>
                <div className="flex items-center gap-3">
                  <motion.button type="submit" whileTap={{ scale: 0.98 }} className="px-6 py-3 rounded-xl btn-accent font-semibold shadow-lg">Submit</motion.button>
                </div>
              </div>

              <div className="mt-4 text-sm muted-text">{topMsg}</div>
            </motion.form>

            <motion.div variants={fadeInUp} className="rounded-2xl p-8 section-card" style={cardTopShadow}>
              <h3 className="text-2xl font-semibold text-slate-900">Why choose system.a2key.com</h3>
              <p className="mt-2 muted-text">Designed for resellers, drop-shippers, and digital merchants who want no-fuss automated fulfillment.</p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border section-card hover:shadow-md transition" style={{ background: "linear-gradient(90deg, rgba(248,250,252,0.8), rgba(238,242,255,0.8))", ...cardTopShadow }}>
                  <h4 className="font-semibold text-slate-900">Wallet-first billing</h4>
                  <p className="mt-2 text-sm muted-text">Prepay and let orders draw from your wallet. Low-balance alerts, auto top-up, per-order logs.</p>
                </div>
                <div className="p-4 rounded-xl border section-card hover:shadow-md transition" style={{ background: "linear-gradient(90deg, rgba(248,250,252,0.8), rgba(238,242,255,0.8))", ...cardTopShadow }}>
                  <h4 className="font-semibold text-slate-900">Instant key delivery</h4>
                  <p className="mt-2 text-sm muted-text">Push keys to customer email & order page instantly when wallet funds are available.</p>
                </div>

                <div className="p-4 rounded-xl border section-card hover:shadow-md transition" style={{ background: "linear-gradient(90deg, rgba(248,250,252,0.8), rgba(238,242,255,0.8))", ...cardTopShadow }}>
                  <h4 className="font-semibold text-slate-900">Key management</h4>
                  <p className="mt-2 text-sm muted-text">Upload pools, map SKUs, auto-rotate keys, and set replacement/refund rules.</p>
                </div>
                <div className="p-4 rounded-xl border section-card hover:shadow-md transition" style={{ background: "linear-gradient(90deg, rgba(248,250,252,0.8), rgba(238,242,255,0.8))", ...cardTopShadow }}>
                  <h4 className="font-semibold text-slate-900">Fraud & safety</h4>
                  <p className="mt-2 text-sm muted-text">Country/IP checks, order velocity rules, manual review flows to reduce chargebacks.</p>
                </div>
              </div>
            </motion.div>
          </section>

          {/* INTEGRATIONS TAGS + DEMO FORM LARGE */}
          <section id="integrations-list" className="mt-10">
            <motion.div variants={fadeInUp} className="rounded-3xl p-8 section-card" style={cardTopShadow}>
              <h3 className="text-2xl font-semibold text-slate-900">Integrations & API</h3>
              <p className="mt-2 muted-text">Out-of-the-box plugins, a robust REST API and event webhooks for custom platforms.</p>

              <motion.div className="mt-6 flex flex-wrap gap-3">
                {["WooCommerce plugin", "Shopify app", "REST API", "Webhooks", "CSV import", "PGP/AES key vault"].map((t) => (
                  <motion.span key={t} whileHover={{ scale: 1.03 }} className="px-4 py-2 rounded-full section-card text-sm font-medium shadow-sm muted-text">{t}</motion.span>
                ))}
              </motion.div>

              <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.form onSubmit={handleDemoSubmit} variants={fadeInUp} className="p-6 rounded-2xl section-card border" style={cardTopShadow}>
                  <h4 className="text-lg font-semibold text-slate-900">Request a Demo</h4>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input value={demoForm.name} onChange={(e) => setDemoForm(prev => ({ ...prev, name: e.target.value }))} required placeholder="Your full name" className="p-3 rounded-lg border section-card border-slate-200 bg-white text-slate-900 outline-none focus:ring-2 focus:ring-sky-500 transition-shadow" />
                    <input value={demoForm.email} onChange={(e) => setDemoForm(prev => ({ ...prev, email: e.target.value }))} type="email" required placeholder="you@example.com" className="p-3 rounded-lg border section-card border-slate-200 bg-white text-slate-900 outline-none focus:ring-2 focus:ring-sky-500 transition-shadow" />
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <select value={demoForm.platform} onChange={(e) => setDemoForm(prev => ({ ...prev, platform: e.target.value }))} className="p-3 rounded-lg border section-card border-slate-200 bg-white text-slate-900">
                      <option>WooCommerce</option>
                      <option>Shopify</option>
                      <option>Both</option>
                    </select>
                    <input value={demoForm.volume} onChange={(e) => setDemoForm(prev => ({ ...prev, volume: e.target.value }))} placeholder="e.g., 1000" className="p-3 rounded-lg border section-card border-slate-200 bg-white text-slate-900" />
                  </div>

                  <textarea value={demoForm.message} onChange={(e) => setDemoForm(prev => ({ ...prev, message: e.target.value }))} rows={4} className="mt-4 p-3 rounded-lg border section-card border-slate-200 bg-white text-slate-900" placeholder="Tell us your needs..." />

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm muted-text">Or ping: Telegram <strong className="text-slate-800">@a2keyadmin</strong> · WhatsApp <strong className="text-slate-800">+44 7577 321476</strong></div>
                    <motion.button type="submit" whileTap={{ scale: 0.98 }} className="px-4 py-2 rounded-xl" style={{ background: "linear-gradient(90deg,#f59e0b,#f97316)", color: "#000", fontWeight: 700 }}>Request Demo</motion.button>
                  </div>
                  <div className="mt-3 muted-text">{demoMsg}</div>
                </motion.form>

                <motion.div variants={fadeInUp} className="p-6 rounded-2xl section-card" style={cardTopShadow}>
                  <h4 className="text-lg font-semibold text-slate-900">Direct contacts</h4>
                  <p className="mt-3 muted-text">Telegram: <a className="text-sky-600" href="https://t.me/a2keyadmin">@a2keyadmin</a><br />WhatsApp: <a className="text-sky-600" href="https://wa.me/447577321476">+44 7577 321476</a><br />Email: <a className="text-sky-600" href="mailto:sales@a2key.com">sales@a2key.com</a></p>

                  <h5 className="mt-6 font-semibold text-slate-900">Security & Compliance</h5>
                  <ul className="list-disc list-inside mt-2 text-sm muted-text">
                    <li>Unique key reservation & reuse protection</li>
                    <li>Audit logs & export</li>
                    <li>Access roles for team members</li>
                  </ul>

                  <h5 className="mt-6 font-semibold text-slate-900">Need something like Keysender?</h5>
                  <p className="mt-2 muted-text">We offer similar outcomes—automated delivery, inventory tracking, and integrations—tailored for WooCommerce & Shopify.</p>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* LOGOS / FOOTER-LIKE AREA */}
          <motion.section variants={fadeInUp} className="mt-10 mb-20">
            <div className="rounded-3xl p-8 section-card" style={cardTopShadow}>
              <h3 className="text-2xl font-semibold text-slate-900">Plug-and-play Integrations</h3>
              <p className="mt-2 muted-text">Plug-and-play with leading ecommerce stacks.</p>
              <motion.div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 items-center">
                {['WooCommerce','Shopify','WordPress','REST API','Webhooks','CSV/Batch'].map(item => (
                  <motion.div key={item} whileHover={{ scale: 1.03 }} className="p-4 rounded-xl section-card text-center text-sm font-medium transition" style={cardTopShadow}>{item}</motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>
        </div>
      </div>
    </motion.div>
  );
}