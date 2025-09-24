// src/components/Features.jsx
import React, { useEffect, useState } from "react";

export default function Features() {
  const [openFaq, setOpenFaq] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Inject component-scoped CSS once
    const id = "a2key-features-styles";
    if (document.getElementById(id)) return;

    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = `
      /* -------------------------
         Theme variables (light)
         ------------------------- */
      :root {
        --page-bg: #f8fafc;
        --bg-grad: linear-gradient(135deg, #e6f7ff 0%, #cfefff 50%, #dff6ff 100%);
        --card-bg: rgba(255, 255, 255, 0.98);
        --text-primary: #0c0c2a;
        --muted: #6b7280;
        --accent: #0a2563;
        --accent-light: #3b69e9;
        --accent-dark: #0e245a;
        --glass: rgba(255, 255, 255, 0.85);
        --radius: 16px;
        --radius-lg: 20px;
        --shadow: 0 8px 30px rgba(33, 43, 77, 0.08);
        --shadow-hover: 0 20px 40px rgba(11, 22, 50, 0.12);
        --transition: all 0.28s cubic-bezier(.2,.9,.2,1);
      }

      /* -------------------------
         Dark mode overrides
         (applies when <html> has .dark)
         ------------------------- */
      .dark .a2-wrap {
        --page-bg: #071a2b;
        --bg-grad: linear-gradient(135deg, #072033 0%, #0b3248 50%, #071a2b 100%);
        --card-bg: rgba(20, 30, 40, 0.48);
        --text-primary: #e6eef8;
        --muted: #9fb0c6;
        --accent: #5a7de8;
        --accent-light: #78a0ff;
        --accent-dark: #1f3a6b;
        --shadow: 0 12px 40px rgba(2,6,23,0.45);
        --shadow-hover: 0 26px 60px rgba(2,6,23,0.55);
      }

      /* -------------------------
         Base layout
         ------------------------- */
      .a2-wrap {
        font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        color: var(--text-primary);
        background: var(--page-bg);
        min-height: 100vh;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        width: 100%;
        opacity: 0;
        transform: translateY(20px);
        transition: background 0.32s ease, color 0.32s ease, opacity 0.6s ease, transform 0.6s ease;
      }

      .a2-wrap.visible {
        opacity: 1;
        transform: translateY(0);
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 24px;
        width: 100%;
        box-sizing: border-box;
      }

      .full-width-container {
        width: 100%;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }

      /* -------------------------
         Hero / Intro
         ------------------------- */
      .a2-hero {
        background: var(--bg-grad);
        color: var(--text-primary);
        padding: 80px 0 60px;
        box-shadow: var(--shadow);
        margin-bottom: 60px;
        position: relative;
        overflow: hidden;
        width: 100%;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        transition: box-shadow 0.3s ease, background 0.3s ease;
      }

      .a2-hero h2 {
        margin: 0 0 20px;
        font-size: 42px;
        letter-spacing: -0.02em;
        font-weight: 800;
        line-height: 1.15;
      }

      .a2-hero p.lead {
        margin: 0;
        opacity: 0.95;
        max-width: 780px;
        font-size: 20px;
        line-height: 1.6;
        font-weight: 400;
        color: var(--muted);
      }

      /* -------------------------
         Grid & cards
         ------------------------- */
      .grid { display: grid; gap: 28px; }

      .feature-grid { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); margin-top: 48px; position: relative; }

      .card, .faq-item, .plan-card {
        position: relative;
        overflow: hidden;
        background: var(--card-bg);
        border-radius: var(--radius-lg);
        padding: 32px;
        box-shadow: 0 10px 30px rgba(10,37,99,0.06);
        transition: var(--transition);
        border: 1px solid rgba(15, 23, 42, 0.06);
        backdrop-filter: blur(6px);
        opacity: 0;
        transform: translateY(20px);
      }

      /* subtle inner rim */
      .card::after, .faq-item::after, .plan-card::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
        mix-blend-mode: overlay;
      }

      /* top accent stripe (keeps vibrancy in dark as well) */
      .card::before, .faq-item::before, .plan-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 6px;
        background: linear-gradient(90deg, var(--accent-light), var(--accent-dark));
        box-shadow: 0 6px 18px rgba(59,105,230,0.12);
        transform-origin: center;
        transition: var(--transition);
      }

      .card.animate, .faq-item.animate, .plan-card.animate {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease;
      }

      .card:hover, .faq-item:hover, .plan-card:hover {
        transform: translateY(-8px);
        box-shadow: var(--shadow-hover);
      }

      .card h3 {
        margin: 0 0 12px;
        font-size: 20px;
        font-weight: 700;
        color: var(--text-primary);
        line-height: 1.3;
      }

      .muted, .tiny, .subtle {
        color: var(--muted);
        font-size: 15px;
        line-height: 1.6;
      }

      .faq-item {
        background: linear-gradient(180deg, var(--card-bg), rgba(250,250,252,0.98));
        border-radius: var(--radius-lg);
        padding: 24px;
        border: 1px solid rgba(11,22,50,0.06);
        transition: var(--transition);
      }

      .dark .a2-wrap .faq-item {
        background: linear-gradient(180deg, var(--card-bg), rgba(20,30,40,0.78));
      }

      .faq-q {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        font-weight: 600;
        gap: 16px;
        font-size: 18px;
        color: var(--text-primary);
      }

      .faq-q:focus {
        outline: none;
        box-shadow: 0 0 0 4px rgba(59,105,230,0.08);
        border-radius: 8px;
      }

      .faq-a {
        margin-top: 16px;
        color: var(--muted);
        font-size: 16px;
        line-height: 1.6;
        animation: fadeIn 0.3s ease;
      }

      @keyframes fadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }

      .analytics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-top: 24px; }

      section { margin-bottom: 80px; opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; width: 100%; }
      section.visible { opacity: 1; transform: translateY(0); }

      h2 { font-size: 36px; font-weight: 800; margin-bottom: 20px; color: var(--text-primary); letter-spacing: -0.02em; line-height: 1.2; }

      .popular-badge { position: absolute; right: 20px; top: -12px; background: var(--accent); color: white; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: 700; box-shadow: 0 4px 10px rgba(91,140,255,0.3); }

      .plan-card { position: relative; transition: var(--transition); }
      .plan-card.popular { border: 2px solid var(--accent-light); transform: scale(1.02); }

      .feature-list { list-style: none; padding: 0; margin: 20px 0; }
      .feature-list li { margin-bottom: 12px; padding-left: 32px; position: relative; font-size: 16px; color: var(--text-primary); }
      .feature-list li::before { content: '✓'; position: absolute; left: 0; color: var(--accent-light); font-weight: bold; font-size: 18px; }

      .section-header { text-align: center; max-width: 800px; margin: 0 auto 48px; }
      .section-subtitle { font-size: 18px; line-height: 1.6; color: var(--muted); }

      .gradient-text { background: linear-gradient(90deg, var(--accent-light), var(--accent-dark)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

      .faq-grid { display: grid; gap: 16px; max-width: 800px; margin: 0 auto; }

      /* Responsive tweaks */
      @media (max-width: 1024px) {
        .a2-hero h2 { font-size: 36px; }
        .a2-hero p.lead { font-size: 18px; }
      }
      @media (max-width: 768px) {
        .a2-wrap { padding: 0; }
        .container { padding: 0 20px; }
        .a2-hero { padding: 60px 0 40px; margin-bottom: 40px; }
        .a2-hero h2 { font-size: 32px; }
        .a2-hero p.lead { font-size: 17px; }
        .feature-grid, .pricing-row, .analytics-grid { grid-template-columns: 1fr; }
        h2 { font-size: 28px; }
        .card { padding: 24px; }
        .section-header { margin-bottom: 32px; }
        .faq-grid { gap: 12px; }
      }
      @media (max-width: 480px) {
        .a2-hero { padding: 48px 0 32px; }
        .a2-hero h2 { font-size: 28px; }
        .container { padding: 0 16px; }
        .card { padding: 20px; }
        h2 { font-size: 24px; }
        .faq-grid { gap: 8px; }
      }
    `;
    document.head.appendChild(style);

    // Entrance/animation
    setTimeout(() => {
      setIsVisible(true);

      const sections = document.querySelectorAll("section");
      sections.forEach((section, index) => {
        setTimeout(() => {
          section.classList.add("visible");
        }, 150 * (index + 1));
      });

      const cards = document.querySelectorAll(".card, .faq-item, .plan-card");
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add("animate");
        }, 100 * (index + 1));
      });
    }, 100);
  }, []);

  // DATA
  const features = [
    {
      title: "⚡ 24/7 License Delivery",
      text: "Orders trigger delivery via email and order page instantly after successful payment and wallet check.",
    },
    {
      title: "🔒 Key Vault + API",
      text: "Upload & encrypt keys (AES-256), set auto-rotate rules, validate inventory, and use REST API or webhooks.",
    },
    {
      title: "📩 Order Notifications",
      text: "Send Smart Telegram/Email alerts on delivery, low balance, failed attempts & more. Multi-admin supported.",
    },
    {
      title: "🛒 Abandon Cart Recovery",
      text: "Recover lost sales with timed discount offers and follow-up automations across platforms.",
    },
    {
      title: "📊 Live Delivery Logs",
      text: "Track, filter, or export delivery status by SKU, platform, geography — and automate key replacements.",
    },
    {
      title: "📦 Upload Your Own Stock",
      text: "Import CSV files of bulk keys, or add dynamically via API. Great for resellers and vendors.",
    },
  ];

  const faq = [
    {
      q: "What if I run out of wallet funds?",
      a: "We send multiple alerts. Orders can be put on hold or routed for manual review while you top up.",
    },
    {
      q: "Can I sell products on the subdomain?",
      a: "Yes—keep a small catalog here for convenience. For SEO & full catalog features, use your main shop at a2key.com/shop and link to it.",
    },
    {
      q: "How are keys stored?",
      a: "Encrypted at rest (AES-256). Access controls and audit logs available for Enterprise plans.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit cards, PayPal, and cryptocurrency payments for wallet top-ups.",
    },
    {
      q: "How do I integrate with my store?",
      a: "We provide plugins for WooCommerce and Shopify, plus a comprehensive API for custom integrations.",
    },
  ];

  return (
    <div className={`a2-wrap ${isVisible ? "visible" : ""}`}>
      {/* Hero / Intro */}
      <section className="a2-hero">
        <div className="full-width-container">
          <div className="container">
            <h2>Why choose A2Key?</h2>
            <p className="lead">
              Simple, scalable auto-delivery software for digital merchants running
              WooCommerce, Shopify, or custom eCommerce platforms.
            </p>
          </div>

          <div className="container">
            <div className="feature-grid grid" aria-hidden={false}>
              {features.map((f, i) => (
                <div className="card" key={i}>
                  <h3>{f.title}</h3>
                  <p className="muted">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* system.a2key.com features */}
      <section>
        <div className="container">
          <div className="section-header">
            <h2>
              Why choose <span className="gradient-text">system.a2key.com</span>
            </h2>
            <p className="section-subtitle muted">
              Designed for resellers, drop-shippers, and digital merchants who want
              no-fuss automated fulfillment.
            </p>
          </div>

          <div className="grid analytics-grid" role="list">
            <div className="card" role="listitem">
              <h3>Wallet-first billing</h3>
              <p className="muted">
                Prepay and let orders draw from your wallet. Low-balance alerts,
                auto top-up options, and per-order logs.
              </p>
            </div>
            <div className="card" role="listitem">
              <h3>Instant key delivery</h3>
              <p className="muted">
                If wallet has funds, we push the key to customer email and order
                page instantly. Otherwise order holds with notifications.
              </p>
            </div>
            <div className="card" role="listitem">
              <h3>Store integrations</h3>
              <p className="muted">
                Official WooCommerce plugin and Shopify app, plus REST API and
                webhooks for custom platforms.
              </p>
            </div>
            <div className="card" role="listitem">
              <h3>Key management</h3>
              <p className="muted">
                Upload pools, map SKUs, auto-rotate keys, and configure
                replacement/refund rules.
              </p>
            </div>
            <div className="card" role="listitem">
              <h3>Fraud & safety</h3>
              <p className="muted">
                Country/IP checks, order velocity rules, and manual review flows
                to reduce chargebacks.
              </p>
            </div>
            <div className="card" role="listitem">
              <h3>Reporting</h3>
              <p className="muted">
                Delivery logs, wallet statements, CSV exports, and reconciliation
                tools for accounting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="container">
          <div className="section-header">
            <h2>
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="section-subtitle muted">Everything you need to know about our service.</p>
          </div>

          <div className="faq-grid">
            {faq.map((f, i) => (
              <div className="faq-item" key={i}>
                <div
                  className="faq-q"
                  role="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setOpenFaq(openFaq === i ? null : i);
                  }}
                  tabIndex={0}
                  aria-expanded={openFaq === i}
                >
                  <span>{f.q}</span>
                  <span>{openFaq === i ? "−" : "+"}</span>
                </div>
                {openFaq === i && (
                  <div className="faq-a">
                    <p style={{ margin: 0 }}>{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics & Dashboards */}
      <section>
        <div className="container">
          <div className="section-header">
            <h2>Analytics & <span className="gradient-text">Dashboards</span></h2>
            <p className="section-subtitle muted">Stay in control with real-time insights.</p>
          </div>

          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "24px" }}>
            <div className="card">
              <h3>Delivery Rate</h3>
              <p className="muted">Monitor successful dispatches, holds, and retries. Export CSV/JSON.</p>
            </div>
            <div className="card">
              <h3>Top SKUs</h3>
              <p className="muted">Spot high performers and set auto-replenish thresholds.</p>
            </div>
            <div className="card">
              <h3>Cohorts</h3>
              <p className="muted">Measure revenue by segment, geography, and campaign.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}