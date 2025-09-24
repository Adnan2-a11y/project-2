import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [balance, setBalance] = useState(10.0);
  const [cost, setCost] = useState(4.5);
  const [status, setStatus] = useState("Waiting...");
  const [newBalance, setNewBalance] = useState(balance);
  const [form, setForm] = useState({ name: "", email: "", platform: "WooCommerce", volume: "", priority: "Normal", message: "" });
  const [formMsg, setFormMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleSimulate() {
    const b = Number(balance);
    const c = Number(cost);
    setStatus("Processing...");
    setTimeout(() => {
      if (b >= c) {
        const nb = +(b - c).toFixed(2);
        setBalance(nb);
        setNewBalance(nb);
        setStatus("Delivered — license sent to customer.");
      } else {
        setStatus("Insufficient balance — order paused.");
      }
    }, 450);
  }

  function handleFormChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormMsg("");
    if (!form.name.trim() || !form.email.trim()) {
      setFormMsg("Please provide name and a valid email.");
      return;
    }
    setSubmitting(true);
    setFormMsg("Sending request...");
    setTimeout(() => {
      setSubmitting(false);
      setFormMsg("Thanks — we'll contact you within 24 hours.");
      setForm({ name: "", email: "", platform: "WooCommerce", volume: "", priority: "Normal", message: "" });
    }, 900);
  }

  const card = {
    hidden: { opacity: 0, y: 8 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.45 } },
    hover: { scale: 1.02 }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <div className="w-full">
        <motion.header initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-4 sm:px-6 lg:px-12 py-12">
          <div>
            <span className="inline-block text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/10 px-3 py-1 rounded-full">New • Auto license delivery</span>
            <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold leading-tight">Keep wallet funded. We <span className="text-indigo-600 dark:text-indigo-400">auto‑deliver&nbsp;keys</span> to customers.</h1>
            <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-xl">Plug into WooCommerce or Shopify. When an order arrives we check your wallet, reserve a key and deliver it instantly — no manual work, full audit logs and fraud protections.</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#pricing" className="inline-flex items-center gap-2 bg-indigo-600 text-white rounded-2xl px-4 py-2 shadow-sm focus:outline-none">View Pricing</a>
              <a href="#how" className="inline-flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-2">See How it Works</a>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
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

          <motion.aside initial="hidden" animate="enter" whileHover="hover" variants={card} className="relative bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-300 dark:via-indigo-500 to-transparent"></div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">💡 Live Simulation</h3>
              <span className="text-sm text-slate-500 dark:text-slate-400">Try wallet logic</span>
            </div>

            <div className="mt-4 space-y-3">
              <label className="block text-sm">Wallet balance</label>
              <input type="number" className="w-full rounded-md p-2 border border-slate-200 dark:border-slate-700 bg-transparent" value={balance} onChange={(e) => setBalance(Number(e.target.value))} />

              <label className="block text-sm">Order cost</label>
              <input type="number" className="w-full rounded-md p-2 border border-slate-200 dark:border-slate-700 bg-transparent" value={cost} onChange={(e) => setCost(Number(e.target.value))} />

              <button onClick={handleSimulate} className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 bg-indigo-600 text-white shadow hover:opacity-95">Place order</button>

              <div className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                <div>Status: <span className="font-medium">{status}</span></div>
                <div className="mt-1">New Balance: <span className="font-semibold">${newBalance.toFixed(2)}</span></div>
              </div>
            </div>
          </motion.aside>
        </motion.header>

        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12 px-4 sm:px-6 lg:px-12" id="pricing">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Simple Pricing</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Wallet top-up is separate. Choose a monthly plan to unlock advanced features.</p>
          </div>

          <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <motion.div variants={card} className="relative rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-lg bg-white dark:bg-slate-800 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-500 to-transparent"></div>
              <h3 className="text-lg font-semibold">Starter</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">For small stores testing auto delivery</p>
              <p className="mt-4 text-2xl font-bold"><span className="line-through text-slate-400">$19</span> <span className="ml-2 text-indigo-600 dark:text-indigo-400">$15</span>/mo</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>✅ 500 deliveries</li>
                <li>✅ Email delivery</li>
                <li>❌ API/webhooks</li>
              </ul>
              <a className="mt-4 inline-block bg-indigo-600 text-white rounded-xl px-4 py-2" href="#contact">Start Free</a>
            </motion.div>

            <motion.div variants={card} className="relative rounded-2xl p-6 bg-indigo-600 text-white shadow-xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Growth</h3>
                <span className="text-sm opacity-90">Most popular</span>
              </div>
              <p className="mt-2 text-sm opacity-90">For scaling resellers & dropshippers</p>
              <p className="mt-4 text-2xl font-bold">$39/mo</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>✅ 5k deliveries</li>
                <li>✅ Email & on-page delivery</li>
                <li>✅ API access + logs</li>
              </ul>
              <a className="mt-4 inline-block bg-white text-indigo-600 rounded-xl px-4 py-2 font-semibold" href="#contact">Choose Growth</a>
            </motion.div>

            <motion.div variants={card} className="relative rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-lg bg-white dark:bg-slate-800 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-500 to-transparent"></div>
              <h3 className="text-lg font-semibold">Enterprise</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">For enterprises & aggregator platforms</p>
              <p className="mt-4 text-2xl font-bold">Custom</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>✅ Unlimited keys</li>
                <li>✅ Multi-store/marketplace routing</li>
                <li>✅ Dedicated account team</li>
              </ul>
              <a className="mt-4 inline-block border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2" href="#contact">Contact Sales</a>
            </motion.div>
          </div>
        </motion.section>

        <section id="how" className="mt-12 px-4 sm:px-6 lg:px-12">
          <h2 className="text-2xl font-bold">How it works</h2>
          <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: 1, title: "Create account", text: "Set your store domain and contact emails." },
              { n: 2, title: "Top‑up wallet", text: "Add funds; costs debit per fulfilled order." },
              { n: 3, title: "Connect store", text: "Install connector app/plugin or use API." },
              { n: 4, title: "Go live", text: "Orders trigger instant key delivery." }
            ].map((s) => (
              <motion.div key={s.n} whileHover={{ y: -6 }} className="relative p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-md overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-300 dark:via-indigo-500 to-transparent"></div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">{s.n}</div>
                  <div>
                    <div className="font-semibold">{s.title}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{s.text}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="contact" className="mt-12 px-4 sm:px-6 lg:px-12">
          <h2 className="text-2xl font-bold">Contact & Demo</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Need integration help or reseller pricing? Fill the form or ping us directly.</p>

          <div className="mt-6 grid gap-6 grid-cols-1 lg:grid-cols-2">
            <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="relative p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-lg overflow-hidden" noValidate>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-300 dark:via-indigo-500 to-transparent"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm">Name</label>
                  <input name="name" value={form.name} onChange={handleFormChange} required className="w-full rounded-md p-2 border border-slate-200 dark:border-slate-700 bg-transparent" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm">Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleFormChange} required className="w-full rounded-md p-2 border border-slate-200 dark:border-slate-700 bg-transparent" placeholder="you@example.com" />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm">Platform</label>
                  <select name="platform" value={form.platform} onChange={handleFormChange} className="w-full rounded-md p-2 border border-slate-200 dark:border-slate-700 bg-transparent">
                    <option>WooCommerce</option>
                    <option>Shopify</option>
                    <option>Both</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm">Monthly orders</label>
                  <input name="volume" value={form.volume} onChange={handleFormChange} className="w-full rounded-md p-2 border border-slate-200 dark:border-slate-700 bg-transparent" placeholder="e.g., 1,000" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm">Message</label>
                <textarea name="message" value={form.message} onChange={handleFormChange} rows={4} className="w-full rounded-md p-2 border border-slate-200 dark:border-slate-700 bg-transparent" placeholder="Tell us your goals..."></textarea>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
                <div className="text-sm text-slate-500 dark:text-slate-400">or Telegram: <strong className="font-medium">@a2keyadmin</strong> · WhatsApp: <strong className="font-medium">+44 7577 321476</strong></div>
                <div className="flex items-center gap-3">
                  <button disabled={submitting} className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-indigo-600 text-white">{submitting ? 'Sending...' : 'Request Demo'}</button>
                  <a className="inline-flex items-center gap-2 rounded-xl px-4 py-2 border border-slate-200 dark:border-slate-700" href="https://t.me/a2keyadmin" target="_blank" rel="noreferrer">Chat</a>
                </div>
              </div>

              {formMsg && <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{formMsg}</p>}
            </motion.form>

            <motion.aside initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="relative p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-lg overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-300 dark:via-indigo-500 to-transparent"></div>
              <h3 className="text-lg font-semibold">Direct contacts</h3>
              <p className="mt-2 text-sm">
                Telegram: <a className="text-indigo-600 dark:text-indigo-400 font-medium" href="https://t.me/a2keyadmin">@a2keyadmin</a><br />
                WhatsApp: <a className="text-indigo-600 dark:text-indigo-400 font-medium" href="https://wa.me/447577321476">+44 7577 321476</a><br />
                Email: <a className="text-indigo-600 dark:text-indigo-400 font-medium" href="mailto:sales@a2key.com">sales@a2key.com</a><br />
                Web: <a className="text-indigo-600 dark:text-indigo-400 font-medium" href="https://a2key.com">a2key.com</a>
              </p>

              <h4 className="mt-4 font-semibold">Security & Compliance</h4>
              <ul className="mt-2 list-disc pl-5 text-sm text-slate-600 dark:text-slate-300">
                <li>Unique key reservation & reuse protection</li>
                <li>Audit logs & export</li>
                <li>Access roles for team members</li>
              </ul>

              <div className="mt-4">
                <h4 className="font-semibold">Need something like Keysender?</h4>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">We can provide automated delivery, inventory tracking and integrations tailored for WooCommerce & Shopify.</p>
              </div>
            </motion.aside>
          </div>
        </section>

        <section className="mt-12 px-4 sm:px-6 lg:px-12">
          <div className="relative rounded-2xl p-6 bg-indigo-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
            <div>
              <h3 className="text-xl font-semibold">Ready to automate deliveries?</h3>
              <p className="mt-1 text-sm opacity-90">Create account, install plugin/app, top up your wallet — and let orders ship themselves.</p>
            </div>
            <div className="flex gap-3">
              <a className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-white text-indigo-600 font-semibold" href="#contact">Request Demo</a>
              <a className="inline-flex items-center gap-2 rounded-xl px-4 py-2 border border-white/20" href="#pricing">See Plans</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}