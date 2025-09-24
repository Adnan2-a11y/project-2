// File: src/pages/Demo.jsx
import React, { useEffect, useState, useMemo } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Demo() {
  const { theme, toggleTheme } = useTheme(); // use app-wide theme
  const [isVisible, setIsVisible] = useState(false);
  const [sending, setSending] = useState(false);
  const [sentMsg, setSentMsg] = useState("");

  // Entrance animation
  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Build color tokens based on theme string controlled by ThemeContext
  const colors = useMemo(() => {
    if (theme === "dark") {
      return {
        wrapperBg: "#0f1724",
        sectionBg: "#0f1724", // subtle same as wrapper to avoid hard edges
        cardBg: "rgba(255,255,255,0.04)",
        text: "#e6eef8",
        muted: "#9fb0c6",
        inputBg: "#111827",
        inputBorder: "rgba(255,255,255,0.08)",
        inputText: "#e6eef8",
        btnFrom: "#2563eb",
        btnTo: "#1e40af",
        shadow: "rgba(0,0,0,0.6)",
        highlight: "#3b82f6",
      };
    } else {
      return {
        wrapperBg: "#f7fbff",
        sectionBg: "linear-gradient(145deg,#ffffff 0%, #f3f7fb 100%)",
        cardBg: "#ffffff",
        text: "#0f1724",
        muted: "#475569",
        inputBg: "#ffffff",
        inputBorder: "rgba(15,23,42,0.08)",
        inputText: "#0f1724",
        btnFrom: "#1e40af",
        btnTo: "#2563eb",
        shadow: "rgba(16,24,40,0.06)",
        highlight: "#2563eb",
      };
    }
  }, [theme]);

  // Styles (JS-driven for precise theme control)
  const wrapperStyle = useMemo(
    () => ({
      background: colors.wrapperBg,
      color: colors.text,
      minHeight: "100vh",
      padding: "28px",
      transition: "background .32s ease, color .32s ease",
      fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      boxSizing: "border-box",
    }),
    [colors]
  );

  const sectionStyle = {
    background: colors.sectionBg,
    borderRadius: 12,
    padding: 24,
    boxShadow: `0 10px 30px ${colors.shadow}`,
    border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(16,24,40,0.04)"}`,
    transition: "background .3s ease, border .3s ease, box-shadow .3s ease",
  };

  const cardStyle = {
    background: colors.cardBg,
    borderRadius: 12,
    padding: 18,
    border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(16,24,40,0.06)"}`,
    boxShadow: `0 6px 18px ${theme === "dark" ? "rgba(0,0,0,0.45)" : "rgba(16,24,40,0.04)"}`,
    color: colors.text,
    transition: "background .3s ease, border .3s ease, box-shadow .3s ease, color .3s ease",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 10,
    border: `1px solid ${colors.inputBorder}`,
    background: colors.inputBg,
    color: colors.inputText,
    fontSize: 15,
    boxSizing: "border-box",
    transition: "box-shadow .15s ease, border-color .15s ease, background .2s ease",
  };

  const labelStyle = {
    display: "block",
    marginBottom: 8,
    fontWeight: 700,
    fontSize: 14,
    color: colors.text,
  };

  const buttonStyle = {
    background: `linear-gradient(90deg, ${colors.btnFrom}, ${colors.btnTo})`,
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: 10,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: `0 8px 24px ${theme === "dark" ? "rgba(0,0,0,0.6)" : "rgba(37,99,235,0.14)"}`,
    transition: "transform .12s ease, box-shadow .12s ease, opacity .12s ease",
  };

  // Faux submit handler
  function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setSentMsg("");
    setTimeout(() => {
      setSending(false);
      setSentMsg("Thanks — we received your request. We'll get back shortly.");
    }, 900);
  }

  return (
    <div style={wrapperStyle} className={`demo-root ${isVisible ? "visible" : ""}`}>
      {/* top bar with theme toggle */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <div style={{ fontWeight: 700, fontSize: 16, color: colors.text }}>system.a2key.com · Demo</div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={theme === "dark" ? "Switch to light" : "Switch to dark"}
            style={{
              display: "inline-flex",
              gap: 8,
              alignItems: "center",
              padding: "8px 12px",
              borderRadius: 10,
              border: "1px solid transparent",
              background: theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(15,23,42,0.04)",
              color: colors.text,
              cursor: "pointer",
            }}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}{" "}
            <span style={{ fontSize: 13 }}>{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
        </div>
      </div>

      <section style={{ ...sectionStyle, opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(10px)", transition: "opacity .45s ease, transform .45s ease" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: colors.text }}>Demo</h2>
            <div style={{ marginTop: 8, color: colors.muted }}>
              Need integration help or resale pricing? Fill the form or ping us directly.
            </div>
          </div>

          <form onSubmit={handleSubmit} style={cardStyle} aria-label="Demo request form">
            {/* row 1 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <div>
                <label style={labelStyle} htmlFor="name">Name</label>
                <input id="name" name="name" placeholder="Your name" required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle} htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="you@example.com" required style={inputStyle} />
              </div>
            </div>

            {/* row 2 */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 14, marginBottom: 14 }}>
              <div>
                <label style={labelStyle} htmlFor="platform">Platform</label>
                <input id="platform" name="platform" placeholder="WooCommerce, Shopify, etc" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle} htmlFor="volume">Monthly orders</label>
                <input id="volume" name="volume" placeholder="e.g., 1,000" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle} htmlFor="priority">Priority</label>
                <select id="priority" name="priority" style={inputStyle} aria-label="Priority">
                  <option>Normal</option>
                  <option>Urgent</option>
                </select>
              </div>
            </div>

            {/* message */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle} htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={5} placeholder="Tell us your goals..." style={{ ...inputStyle, minHeight: 110, resize: "vertical" }} />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <div style={{ color: colors.muted, fontSize: 14 }}>
                or Telegram: <strong style={{ color: colors.highlight }}>@a2keyadmin</strong> · WhatsApp: <strong style={{ color: colors.highlight }}>+44 7577 321476</strong>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button type="submit" style={{ ...buttonStyle, opacity: sending ? 0.75 : 1 }} disabled={sending}>
                  {sending ? "Sending..." : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSending(true);
                    setTimeout(() => {
                      setSending(false);
                      setSentMsg("Sandbox requested — we'll send details shortly.");
                    }, 700);
                  }}
                  style={{
                    padding: "10px 16px",
                    borderRadius: 10,
                    border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(16,24,40,0.06)"}`,
                    background: "transparent",
                    color: colors.text,
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  Request sandbox
                </button>
              </div>
            </div>

            {sentMsg && <div role="status" aria-live="polite" style={{ marginTop: 12, color: colors.highlight }}>{sentMsg}</div>}
          </form>
        </div>
      </section>

      {/* small responsive styles */}
      <style>{`
        @media (max-width: 880px) {
          form > div[style*="grid-template-columns: 2fr 1fr 1fr"] { grid-template-columns: 1fr !important; }
          form > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }

        input:focus, textarea:focus, select:focus {
          outline: none;
          box-shadow: 0 0 0 6px ${theme === "dark" ? "rgba(59,130,246,0.08)" : "rgba(37,99,235,0.08)"};
          border-color: ${colors.highlight};
        }

        /* reduce motion preference */
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
      `}</style>
    </div>
  );
}