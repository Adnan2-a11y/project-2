import React, { useState, useCallback, memo } from "react";
import { CheckCircle, Zap, Shield, Clock, Cpu, Mail } from "lucide-react";
import { motion } from "framer-motion";

// Move variants and static data outside component so they are not recreated on every render
const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  enter: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" } }),
  hover: { scale: 1.02 }
};

const STEPS = [
  {
    key: 'connect',
    Icon: Mail,
    title: '1️⃣ Connect your store',
    desc: 'Install the WooCommerce plugin, Shopify app, or integrate through our REST API.'
  },
  {
    key: 'fund',
    Icon: Zap,
    title: '2️⃣ Fund your wallet',
    desc: 'Top up via card, bank transfer or crypto. Wallet shows balance and activity in real time.'
  },
  {
    key: 'enable',
    Icon: Cpu,
    title: '3️⃣ Enable key delivery',
    desc: 'Map SKUs to key pools and enable routing rules — keys are reserved and delivered automatically.'
  },
  {
    key: 'deliver',
    Icon: Shield,
    title: '4️⃣ Orders deliver instantly',
    desc: 'On payment and balance check, a unique key is sent via email, on-page, and webhook (if enabled).'
  }
];

// Small memoized subcomponents to reduce re-render surface
const StepCard = memo(function StepCard({ step, index }) {
  const Icon = step.Icon;
  return (
    <motion.div
      initial="hidden"
      whileInView="enter"
      variants={cardVariants}
      custom={index}
      whileHover="hover"
      className={
        // card visual: subtle shadow, top border highlight, ring for crisp edge, rounded, and padding
        "p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 " +
        "shadow-sm dark:shadow-black/20 ring-1 ring-slate-100 dark:ring-slate-800 border-t-4 " +
        "border-t-indigo-100 dark:border-t-indigo-700/30"
      }
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-600 text-white rounded-xl"><Icon size={18} /></div>
        <div>
          <h3 className="font-semibold">{step.title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{step.desc}</p>
        </div>
      </div>
    </motion.div>
  );
});

const SimulationCard = memo(function SimulationCard({ demoBalance, demoCost, demoStatus, onBalanceChange, onCostChange, onSimulate }) {
  return (
    <motion.aside
      initial="hidden"
      animate="enter"
      variants={cardVariants}
      custom={0.02}
      whileHover="hover"
      className={
        // elevated aside card with stronger shadow and top accent
        "bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 " +
        "ring-1 ring-slate-100 dark:ring-slate-800 border-t-4 border-t-indigo-100 dark:border-t-indigo-700/30"
      }
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">💡 Live Simulation</h3>
        <span className="text-sm text-slate-500 dark:text-slate-400">Wallet logic</span>
      </div>

      <div className="mt-4 space-y-3">
        <label className="block text-sm">Wallet balance</label>
        <input
          type="number"
          value={demoBalance}
          onChange={onBalanceChange}
          className="w-full rounded-md p-2 border border-slate-200 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800"
        />

        <label className="block text-sm">Order cost</label>
        <input
          type="number"
          value={demoCost}
          onChange={onCostChange}
          className="w-full rounded-md p-2 border border-slate-200 dark:border-slate-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800"
        />

        <button
          onClick={onSimulate}
          className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 bg-indigo-600 text-white shadow-md hover:shadow-lg"
        >
          Place order
        </button>

        <div className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          <div>Status: <span className="font-medium">{demoStatus}</span></div>
          <div className="mt-1">New Balance: <span className="font-semibold">${Number(demoBalance).toFixed(2)}</span></div>
        </div>
      </div>
    </motion.aside>
  );
});

function HowItWorksPageInner() {
  // keep numeric state as numbers to avoid string <-> number conversions in many places
  const [demoBalance, setDemoBalance] = useState(10.0);
  const [demoCost, setDemoCost] = useState(4.5);
  const [demoStatus, setDemoStatus] = useState('Waiting...');

  // stable callbacks avoid recreating functions passed down to memoized children
  const handleBalanceChange = useCallback((e) => {
    // Use parseFloat but guard against empty string
    const v = e.target.value === '' ? 0 : parseFloat(e.target.value);
    setDemoBalance(Number.isFinite(v) ? v : 0);
  }, []);

  const handleCostChange = useCallback((e) => {
    const v = e.target.value === '' ? 0 : parseFloat(e.target.value);
    setDemoCost(Number.isFinite(v) ? v : 0);
  }, []);

  const simulate = useCallback(() => {
    setDemoStatus('Processing...');
    // small delay to simulate async work; use the up-to-date values via functional update
    setTimeout(() => {
      setDemoBalance((currentBalance) => {
        const b = Number(currentBalance);
        const c = Number(demoCost);
        if (b >= c) {
          const nb = +(b - c).toFixed(2);
          setDemoStatus('Delivered — key sent to customer.');
          return nb;
        } else {
          setDemoStatus('Insufficient balance — order paused.');
          return b;
        }
      });
    }, 420);
  }, [demoCost]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 py-12 px-0">
      <div className="w-full px-4 sm:px-6 lg:px-12 mx-auto">
        {/* HERO */}
        <motion.header
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
        >
          <div>
            <span className="inline-block text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/10 px-3 py-1 rounded-full">New • Auto license delivery</span>
            <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold leading-tight">Auto License Delivery for <span className="text-indigo-600 dark:text-indigo-400">WooCommerce & Shopify</span></h1>
            <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-xl">Keep your wallet topped up and we'll instantly deliver software license keys to customers after purchase — 24/7, fully automated, and auditable.</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-indigo-600 text-white shadow-sm">Start Free</a>
              <a href="#how" className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 border border-slate-200 dark:border-slate-700">See How it Works →</a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-semibold">99.9%</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Delivery success</div>
              </div>
              <div>
                <div className="text-2xl font-semibold">24/7</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Autopilot ops</div>
              </div>
              <div>
                <div className="text-2xl font-semibold">&lt;2s</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Avg dispatch</div>
              </div>
            </div>
          </div>

          {/* Simulation card */}
          <SimulationCard
            demoBalance={demoBalance}
            demoCost={demoCost}
            demoStatus={demoStatus}
            onBalanceChange={handleBalanceChange}
            onCostChange={handleCostChange}
            onSimulate={simulate}
          />
        </motion.header>

        {/* HOW IT WORKS: cards */}
        <section id="how" className="mt-12">
          <h2 className="text-2xl font-bold">How it works</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Four simple steps to automate license delivery for your store.</p>

          <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => <StepCard key={s.key} step={s} index={i} />)}
          </div>
        </section>

        {/* DETAILED FLOW / KPI */}
        <section className="mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
              className={
                "rounded-2xl p-6 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 " +
                "shadow-sm ring-1 ring-slate-100 dark:ring-slate-800 border-t-4 border-t-indigo-100 dark:border-t-indigo-700/30"
              }
            >
              <h3 className="text-lg font-semibold">Webhook & flow (pseudo)</h3>
              <pre className="mt-3 bg-transparent text-sm overflow-auto rounded-md p-3 border border-slate-50 dark:border-slate-800">
                <code>{`POST /order-created
→ checkWallet()
→ if (balance >= cost) {
    reserveKey();
    sendToCustomer();
    debitWallet(cost);
  } else {
    pauseOrder();
    notifyLowBalance();
  }`}</code>
              </pre>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-white/60 dark:bg-white/5 border border-slate-100 dark:border-slate-700 shadow-sm ring-1 ring-slate-100 dark:ring-slate-800 border-t-4 border-t-indigo-100 dark:border-t-indigo-700/30">
                  <div className="text-2xl font-semibold">Auto</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Invoice & usage logs</div>
                </div>
                <div className="p-3 rounded-lg bg-white/60 dark:bg-white/5 border border-slate-100 dark:border-slate-700 shadow-sm ring-1 ring-slate-100 dark:ring-slate-800 border-t-4 border-t-indigo-100 dark:border-t-indigo-700/30">
                  <div className="text-2xl font-semibold">Shield</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Duplicate key guard</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
              className={
                "rounded-2xl p-6 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 " +
                "shadow-sm ring-1 ring-slate-100 dark:ring-slate-800 border-t-4 border-t-indigo-100 dark:border-t-indigo-700/30"
              }
            >
              <h3 className="text-lg font-semibold">Track & reconcile</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Export audit logs, resend keys, set replacement rules, and reconcile wallet spending with per-order detail.</p>

              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-2xl font-semibold">99.9%</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Success</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold">24/7</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Ops</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold">&lt;2s</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Dispatch</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12">
          <div className="rounded-2xl p-6 bg-indigo-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl ring-1 ring-indigo-400/10 border-t-4 border-t-indigo-300/40">
            <div>
              <h3 className="text-xl font-semibold">Ready to automate deliveries?</h3>
              <p className="mt-1 text-sm opacity-90">Create account, install plugin/app, top up wallet — and let orders ship themselves.</p>
            </div>
            <div className="flex gap-3">
              <a className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-white text-indigo-600 font-semibold shadow-sm" href="#contact">Request Demo</a>
              <a className="inline-flex items-center gap-2 rounded-xl px-4 py-2 border border-white/30" href="#pricing">See Plans</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
const HowItWorksPage = memo(HowItWorksPageInner);
export default HowItWorksPage;