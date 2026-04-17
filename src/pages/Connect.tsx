import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  FormEvent,
  CSSProperties,
  Suspense,
} from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "motion/react";
import { ArrowUpRight, Send, CheckCircle2, Loader2, Mail, Github, Linkedin } from "lucide-react";
import Spline from '@splinetool/react-spline';
// ─── Design Tokens ────────────────────────────────────────────────────────────
const VOID   = "#F2EDE3"; // Background cream
const COSMOS = "#F2EDE3"; // Form card gradient start
const NEBULA = "#EDE7DB"; // Form card gradient end
const AMBER  = "#B69269";
const FROST  = "rgba(28,21,18,0.03)";
const GLOW   = "rgba(182,146,105,0.18)";
const INK    = "#1C1512"; // Dark text
const MUTED  = "rgba(28,21,18,0.55)";

// ─── Responsive CSS injected once ─────────────────────────────────────────────
const GLOBAL_CSS = `
  @keyframes orbit {
    from { transform: rotate(0deg) translateX(var(--r)) rotate(0deg); }
    to   { transform: rotate(360deg) translateX(var(--r)) rotate(-360deg); }
  }
  @keyframes pulse-glow {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50%       { opacity: 0.9; transform: scale(1.06); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-14px); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes scan {
    0%   { top: 0%; }
    100% { top: 100%; }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .ag-field:focus { outline: none; }
  .ag-field::placeholder { color: rgba(28,21,18,0.25); }
  .ag-btn:hover  { box-shadow: 0 0 40px rgba(182,146,105,0.35); }
  .ag-btn:disabled { opacity: 0.45; cursor: not-allowed; }

  /* ── Responsive grid overrides ── */
  .ag-stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
  .ag-contact-grid {
    display: grid;
    grid-template-columns: 1fr 1.45fr;
    gap: 5rem;
    align-items: flex-start;
  }
  .ag-process-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }
  .ag-name-email-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  @media (max-width: 900px) {
    .ag-contact-grid {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
    .ag-stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .ag-process-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .ag-stat-border-right {
      border-right: none !important;
    }
    .ag-stat-2 { border-right: 1px solid rgba(182,146,105,0.08) !important; }
  }

  @media (max-width: 560px) {
    .ag-stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .ag-process-grid {
      grid-template-columns: 1fr;
    }
    .ag-name-email-grid {
      grid-template-columns: 1fr;
    }
    .ag-hero-padding {
      padding: 6rem 1.25rem 3.5rem !important;
    }
    .ag-section-padding {
      padding: 5rem 1.25rem !important;
    }
    .ag-footer-padding {
      padding: 2.5rem 1.25rem !important;
    }
    .ag-form-padding {
      padding: 1.75rem 1.25rem !important;
    }
    .ag-orbit-cluster {
      display: none !important;
    }
    .ag-eyebrow-left {
      left: 1.25rem !important;
    }
  }
`;

// ─── Stable starfield (memoised so positions never shift on re-render) ────────
type Star = { left: string; top: string; size: number; dur: number; delay: number };

function useStars(count: number): Star[] {
  return useMemo(() => {
    // Use a seeded pseudo-random so server & client always agree
    let seed = 1337;
    const rand = () => {
      seed = (seed * 16807 + 0) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    return Array.from({ length: count }, () => ({
      left:  `${rand() * 100}%`,
      top:   `${rand() * 100}%`,
      size:  rand() * 1.8 + 0.4,
      dur:   2 + rand() * 4,
      delay: rand() * 4,
    }));
  }, [count]);
}

// ─── Floating Orb ─────────────────────────────────────────────────────────────
interface OrbProps { x: string; y: string; size: number; delay: number; opacity: number }
function Orb({ x, y, size, delay, opacity }: OrbProps) {
  return (
    <div style={{
      position: "absolute", left: x, top: y,
      width: size, height: size, borderRadius: "50%",
      background: `radial-gradient(circle at 35% 35%, rgba(182,146,105,${opacity * 1.6}), rgba(182,146,105,${opacity * 0.25}) 55%, transparent 72%)`,
      animation: `float 7s ease-in-out ${delay}s infinite`,
      filter: `blur(${size * 0.28}px)`,
      pointerEvents: "none",
    }} />
  );
}

// ─── Orbit Ring ───────────────────────────────────────────────────────────────
interface OrbitRingProps { size: number; duration: number; dotSize?: number }
function OrbitRing({ size, duration, dotSize = 4 }: OrbitRingProps) {
  return (
    <div style={{
      position: "absolute", width: size, height: size, borderRadius: "50%",
      border: "1px solid rgba(182,146,105,0.1)", left: "50%", top: "50%",
      transform: "translate(-50%,-50%)", pointerEvents: "none",
    }}>
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: dotSize, height: dotSize,
        marginTop: -dotSize / 2, marginLeft: -dotSize / 2,
        borderRadius: "50%", backgroundColor: AMBER,
        boxShadow: `0 0 8px ${AMBER}`,
        "--r": `${size / 2}px`,
        animation: `orbit ${duration}s linear infinite`,
      } as CSSProperties} />
    </div>
  );
}

// ─── Form Field ───────────────────────────────────────────────────────────────
interface FieldProps {
  label: string; type?: string; name: string; value: string;
  onChange: (v: string) => void; error?: string;
  textarea?: boolean; placeholder: string;
}
function Field({ label, type = "text", name, value, onChange, error, textarea = false, placeholder }: FieldProps) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  const sharedStyle: CSSProperties = {
    width: "100%", background: "transparent", border: "none",
    color: INK, fontSize: "1rem", fontFamily: "Outfit, sans-serif",
    fontWeight: 300, lineHeight: 1.7, resize: "none" as const,
    padding: textarea ? "2rem 1.25rem 0.75rem" : "1.75rem 1.25rem 0.75rem",
    minHeight: textarea ? 140 : undefined,
  };

  return (
    <div style={{ position: "relative" }}>
      <div style={{
        position: "relative", borderRadius: 12, overflow: "hidden",
        border: `1px solid ${error ? "rgba(255,100,100,0.5)" : active ? "rgba(182,146,105,0.45)" : "rgba(28,21,18,0.1)"}`,
        background: focused ? "rgba(182,146,105,0.04)" : FROST,
        transition: "border-color 0.25s, background 0.25s",
        boxShadow: focused ? `0 0 0 3px rgba(182,146,105,0.07)` : "none",
      }}>
        {/* Scan line on focus */}
        {focused && (
          <div style={{
            position: "absolute", left: 0, right: 0, height: 1,
            background: "linear-gradient(90deg, transparent, rgba(182,146,105,0.45), transparent)",
            animation: "scan 1.8s linear infinite",
            pointerEvents: "none", zIndex: 10,
          }} />
        )}

        {/* Floating label */}
        <label style={{
          position: "absolute", left: "1.25rem",
          top: active ? "0.55rem" : textarea ? "1.35rem" : "1.25rem",
          fontSize: active ? "0.58rem" : "0.875rem",
          fontFamily: active ? "JetBrains Mono, monospace" : "Outfit, sans-serif",
          textTransform: active ? "uppercase" : "none",
          letterSpacing: active ? "0.22em" : "0",
          color: error ? "rgba(255,100,100,0.75)" : active ? AMBER : MUTED,
          transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
          pointerEvents: "none", zIndex: 1,
        }}>
          {label}
        </label>

        {textarea ? (
          <textarea
            name={name} value={value}
            onChange={e => onChange(e.target.value)}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            placeholder={focused ? placeholder : ""}
            className="ag-field" style={sharedStyle} rows={5}
          />
        ) : (
          <input
            type={type} name={name} value={value}
            onChange={e => onChange(e.target.value)}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            placeholder={focused ? placeholder : ""}
            className="ag-field" style={sharedStyle}
          />
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{
              marginTop: "0.35rem", fontSize: "0.65rem",
              color: "rgba(255,100,100,0.75)",
              fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.1em",
            }}>
            ↳ {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Contact Info Link ────────────────────────────────────────────────────────
const CONTACT_LINKS = [
  { label: "Email",    value: "noname_dev@zohomail.in", href: "mailto:noname_dev@zohomail.in", Icon: Mail },
  { label: "Careers",  value: "noname_dev@zohomail.in", href: "mailto:noname_dev@zohomail.in", Icon: Mail },
  { label: "LinkedIn", value: "/in/nonamedev-studio",   href: "#",                           Icon: Linkedin },
  { label: "GitHub",   value: "github.com/nonamedev",   href: "#",                           Icon: Github },
];

// ─── Process Steps ────────────────────────────────────────────────────────────
const PROCESS_STEPS = [
  { step: "01", title: "Drop a message", body: "Fill the form or email directly. No intake forms, no scheduling links." },
  { step: "02", title: "We respond fast", body: "Within 48 hours. Focused questions — no vague discovery calls." },
  { step: "03", title: "Scope it together", body: "Align on brief, stack, and timeline. Quick and clear." },
  { step: "04", title: "We build it", body: "Frontend, backend, AI — shipped end to end by our three-person unit." },
];

// ─── Project type tags ────────────────────────────────────────────────────────
const PROJECT_TAGS = ["Web App", "Backend", "AI Integration", "Full-Stack", "Other"];

// ─────────────────────────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────────────────────────
export default function ConnectPage() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const orbX   = useTransform(mouseX, [0, 1], [-28, 28]);
  const orbY   = useTransform(mouseY, [0, 1], [-28, 28]);

  const [form, setForm]     = useState({ name: "", email: "", budget: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const stars = useStars(90);

  // Mouse parallax
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  const set = (k: string) => (v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => { const n = { ...e }; delete n[k]; return n; });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message cannot be empty";
    return e;
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus("sending");
    await new Promise(r => setTimeout(r, 1800));
    setStatus("sent");
  };

  // ── Tag active state
  const toggleTag = (tag: string) => {
    const already = form.message.includes(`[${tag}]`);
    if (already) {
      set("message")(form.message.replace(` [${tag}]`, "").replace(`[${tag}]`, ""));
    } else {
      set("message")(form.message ? `${form.message} [${tag}]` : `[${tag}]`);
    }
  };
  const isTagActive = (tag: string) => form.message.includes(`[${tag}]`);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
      style={{
        backgroundColor: VOID, color: INK,
        minHeight: "100vh", fontFamily: "Outfit, sans-serif", overflowX: "hidden",
      }}
    >
      {/* ── Injected global CSS ── */}
      <style>{GLOBAL_CSS}</style>

      {/* ── Fixed starfield ── */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {stars.map((s, i) => (
          <div key={i} style={{
            position: "absolute",
            left: s.left, top: s.top,
            width: s.size, height: s.size,
            borderRadius: "50%",
            backgroundColor: "rgba(28,21,18,0.15)",
            animation: `pulse-glow ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }} />
        ))}
        {/* Ambient nebula gradients */}
        <div style={{ position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(182,146,105,0.07), transparent)" }} />
        <div style={{ position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 50% 40% at 80% 80%, rgba(100,120,255,0.04), transparent)" }} />
        <div style={{ position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 40% 30% at 15% 60%, rgba(182,146,105,0.03), transparent)" }} />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{
        position: "relative", minHeight: "100vh",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: "7rem 2.5rem 5rem", overflow: "hidden", zIndex: 1,
      }} className="ag-hero-padding">

        {/* Mouse-reactive orb layer */}
        <motion.div style={{ position: "absolute", inset: 0, pointerEvents: "none", x: orbX, y: orbY }}>
          <Orb x="62%"  y="8%"  size={380} delay={0}   opacity={0.05} />
          <Orb x="12%"  y="52%" size={210} delay={1.5} opacity={0.04} />
          <Orb x="78%"  y="58%" size={150} delay={3}   opacity={0.055} />
        </motion.div>

        {/* Spline 3D Robot */}
        <div
          className="ag-orbit-cluster"
          style={{ position: "absolute", right: "2%", top: "4%", width: 600, height: 600 }}
        >
          <Suspense fallback={<div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}><Loader2 className="animate-spin" color={AMBER} /></div>}>
            <Spline scene="https://prod.spline.design/HELfZo4iQ8zHmY1f/scene.splinecode" />
          </Suspense>
        </div>

        {/* Eyebrow */}
        <div
          style={{ position: "absolute", top: "7rem", left: "2.5rem",
            display: "flex", alignItems: "center", gap: "0.75rem" }}
          className="ag-eyebrow-left"
        >
          <span style={{ height: 1, width: 28, backgroundColor: "rgba(182,146,105,0.3)" }} />
          <span style={{
            fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem",
            textTransform: "uppercase", letterSpacing: "0.34em", color: MUTED,
          }}>
            NOname dev Studio · Open for projects
          </span>
        </div>

        {/* Hero headline */}
        <div style={{ position: "relative", zIndex: 10, maxWidth: "87rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 style={{
              fontFamily: '"Social Gothic","League Gothic",sans-serif',
              fontSize: "clamp(4rem,14vw,165px)", fontWeight: 700,
              textTransform: "uppercase", lineHeight: 0.88,
              letterSpacing: "-0.03em", margin: 0, color: INK,
            }}>
              Let's Build
            </h1>
            <h1 style={{
              fontFamily: '"Social Gothic","League Gothic",sans-serif',
              fontSize: "clamp(4rem,14vw,165px)", fontWeight: 700,
              textTransform: "uppercase", lineHeight: 0.88,
              letterSpacing: "-0.03em", margin: 0,
              background: `linear-gradient(135deg, ${AMBER} 0%, #D4A96A 50%, ${AMBER} 100%)`,
              backgroundSize: "200% auto",
              backgroundClip: "text", WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer 4s linear infinite",
            }}>
              Something.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              marginTop: "2.5rem",
              display: "flex", flexWrap: "wrap",
              alignItems: "flex-end", justifyContent: "space-between", gap: "2rem",
            }}
          >
            <p style={{
              maxWidth: "26rem", fontSize: "1.05rem", fontWeight: 300,
              lineHeight: 1.78, color: MUTED,
            }}>
              We take on web apps, backend systems, AI-integrated products, and
              production-ready software builds — from brief to delivery.
            </p>
            <a
              href="#contact-form"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.75rem",
                border: `1px solid rgba(182,146,105,0.4)`, padding: "0.9rem 1.85rem",
                fontFamily: "JetBrains Mono, monospace", fontSize: "0.68rem",
                textTransform: "uppercase", letterSpacing: "0.2em",
                color: AMBER, textDecoration: "none",
                background: "rgba(182,146,105,0.06)",
                borderRadius: 8, transition: "all 0.3s",
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = AMBER; el.style.color = VOID; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(182,146,105,0.06)"; el.style.color = AMBER; }}
            >
              Send a message <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          style={{
            position: "absolute", bottom: "2.5rem", right: "2.5rem",
            fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem",
            textTransform: "uppercase", letterSpacing: "0.3em",
            color: "rgba(28,21,18,0.3)",
            display: "flex", alignItems: "center", gap: "0.5rem",
          }}
        >
          Scroll <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>↓</motion.span>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          STATS ROW
      ══════════════════════════════════════════════════════════════════════ */}
      <div style={{
        borderTop: "1px solid rgba(182,146,105,0.09)",
        borderBottom: "1px solid rgba(182,146,105,0.09)",
        position: "relative", zIndex: 1,
      }}>
        <div style={{ maxWidth: "87rem", margin: "0 auto", padding: "0 2.5rem" }}>
          <div className="ag-stats-grid">
            {[
              { value: "3",   label: "Engineers",       icon: "🛠" },
              { value: "10+", label: "Products shipped", icon: "🚀" },
              { value: "48h", label: "Response time",   icon: "⚡" },
              { value: "∞",   label: "Curiosity",       icon: "✦" },
            ].map((stat, i, arr) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, duration: 0.7 }}
                className={`ag-stat-border-right ${i === 1 ? "ag-stat-2" : ""}`}
                style={{
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  padding: "2.5rem 1rem", textAlign: "center",
                  borderRight: i < arr.length - 1 ? "1px solid rgba(182,146,105,0.08)" : "none",
                }}
              >
                <span style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>{stat.icon}</span>
                <span style={{
                  fontFamily: '"Social Gothic","League Gothic",sans-serif',
                  fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: 700,
                  lineHeight: 1, letterSpacing: "-0.04em", color: AMBER,
                }}>{stat.value}</span>
                <span style={{
                  marginTop: "0.5rem", fontFamily: "JetBrains Mono, monospace",
                  fontSize: "0.58rem", textTransform: "uppercase",
                  letterSpacing: "0.24em", color: MUTED,
                }}>{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          CONTACT FORM SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="contact-form"
        className="ag-section-padding"
        style={{ position: "relative", zIndex: 1, maxWidth: "87rem", margin: "0 auto", padding: "8rem 2.5rem" }}
      >
        <div className="ag-contact-grid">

          {/* ── LEFT: Info panel ── */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              style={{
                fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem",
                textTransform: "uppercase", letterSpacing: "0.32em",
                color: AMBER, marginBottom: "1.25rem",
              }}
            >
              Get in touch
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8 }}
              style={{
                fontFamily: '"Social Gothic","League Gothic",sans-serif',
                fontSize: "clamp(2.8rem,6vw,5.5rem)", fontWeight: 700,
                textTransform: "uppercase", lineHeight: 0.9,
                letterSpacing: "-0.04em", color: INK, marginBottom: "2rem",
              }}
            >
              Start the<br /><span style={{ color: AMBER }}>conversation.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
              style={{
                fontSize: "0.95rem", lineHeight: 1.82, fontWeight: 300,
                color: MUTED, marginBottom: "3rem",
              }}
            >
              Whether you have a concrete brief or just a half-baked idea,
              we're happy to talk through it. No pitch decks needed.
            </motion.p>

            {/* Direct contact links */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "3rem" }}>
              {CONTACT_LINKS.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  style={{
                    display: "flex", alignItems: "center",
                    justifyContent: "space-between",
                    textDecoration: "none", padding: "0.9rem 1.25rem",
                    border: "1px solid rgba(182,146,105,0.1)",
                    borderRadius: 10, background: FROST,
                    backdropFilter: "blur(8px)",
                    transition: "all 0.25s", color: INK,
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(182,146,105,0.38)";
                    el.style.background = "rgba(182,146,105,0.07)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(182,146,105,0.1)";
                    el.style.background = FROST;
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                    <item.Icon size={14} style={{ color: AMBER, flexShrink: 0 }} />
                    <div>
                      <div style={{
                        fontFamily: "JetBrains Mono, monospace", fontSize: "0.52rem",
                        textTransform: "uppercase", letterSpacing: "0.28em",
                        color: MUTED, marginBottom: "0.15rem",
                      }}>{item.label}</div>
                      <div style={{ fontSize: "0.875rem", fontWeight: 400, color: AMBER }}>{item.value}</div>
                    </div>
                  </div>
                  <ArrowUpRight size={13} style={{ color: MUTED, flexShrink: 0 }} />
                </motion.a>
              ))}
            </div>

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.625rem",
                border: "1px solid rgba(80,200,120,0.28)",
                borderRadius: 999, padding: "0.5rem 1.1rem",
                background: "rgba(80,200,120,0.05)",
              }}
            >
              <span style={{
                width: 7, height: 7, borderRadius: "50%",
                backgroundColor: "#4ade80",
                boxShadow: "0 0 8px #4ade80",
                animation: "pulse-glow 2s ease-in-out infinite",
                flexShrink: 0,
              }} />
              <span style={{
                fontFamily: "JetBrains Mono, monospace", fontSize: "0.58rem",
                textTransform: "uppercase", letterSpacing: "0.22em",
                color: "rgba(74,222,128,0.75)",
              }}>
                Available for new projects
              </span>
            </motion.div>
          </div>

          {/* ── RIGHT: Form card ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{
              position: "relative", borderRadius: 20, overflow: "hidden",
              border: "1px solid rgba(182,146,105,0.18)",
              background: `linear-gradient(135deg, ${COSMOS} 0%, ${NEBULA} 100%)`,
              boxShadow: "0 40px 80px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.4)",
            }}>
              {/* Corner ambient glows */}
              <div style={{
                position: "absolute", top: -70, right: -70, width: 220, height: 220,
                borderRadius: "50%", background: GLOW, filter: "blur(65px)", pointerEvents: "none",
              }} />
              <div style={{
                position: "absolute", bottom: -50, left: -50, width: 170, height: 170,
                borderRadius: "50%", background: "rgba(100,120,255,0.055)", filter: "blur(55px)", pointerEvents: "none",
              }} />

              <div
                className="ag-form-padding"
                style={{ position: "relative", zIndex: 1, padding: "2.5rem" }}
              >
                {/* Form header */}
                <div style={{
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between", marginBottom: "2rem",
                }}>
                  <div>
                    <p style={{
                      fontFamily: "JetBrains Mono, monospace", fontSize: "0.52rem",
                      textTransform: "uppercase", letterSpacing: "0.3em",
                      color: MUTED, marginBottom: "0.35rem",
                    }}>
                      New message
                    </p>
                    <h3 style={{
                      fontFamily: '"Social Gothic","League Gothic",sans-serif',
                      fontSize: "1.75rem", fontWeight: 700,
                      textTransform: "uppercase", letterSpacing: "-0.02em",
                      color: INK, lineHeight: 1,
                    }}>
                      Tell us about it.
                    </h3>
                  </div>
                  {/* Decorative mini orbit */}
                  <div style={{ position: "relative", width: 48, height: 48, flexShrink: 0 }}>
                    <OrbitRing size={48} duration={5} dotSize={3} />
                    <div style={{
                      position: "absolute", left: "50%", top: "50%",
                      transform: "translate(-50%,-50%)", width: 8, height: 8,
                      borderRadius: "50%", backgroundColor: AMBER,
                      boxShadow: `0 0 14px ${AMBER}`,
                    }} />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {status === "sent" ? (
                    /* ── Success state ── */
                    <motion.div
                      key="sent"
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      style={{ textAlign: "center", padding: "3rem 1rem" }}
                    >
                      <CheckCircle2
                        size={52} strokeWidth={1}
                        style={{
                          color: "#4ade80", margin: "0 auto 1.5rem", display: "block",
                          filter: "drop-shadow(0 0 14px #4ade80)",
                        }}
                      />
                      <h4 style={{
                        fontFamily: '"Social Gothic","League Gothic",sans-serif',
                        fontSize: "2rem", fontWeight: 700,
                        textTransform: "uppercase", color: INK, marginBottom: "0.75rem",
                      }}>
                        Message received.
                      </h4>
                      <p style={{ fontSize: "0.9rem", fontWeight: 300, color: MUTED, lineHeight: 1.75 }}>
                        We'll get back to you within 48 hours.<br />
                        Thanks for reaching out, {form.name.split(" ")[0] || "friend"}.
                      </p>
                    </motion.div>
                  ) : (
                    /* ── Form ── */
                    <motion.form
                      key="form"
                      onSubmit={submit}
                      noValidate
                      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
                    >
                      <div className="ag-name-email-grid">
                        <Field
                          label="Your name" name="name" value={form.name}
                          onChange={set("name")} error={errors.name}
                          placeholder="e.g. Rahul Sharma"
                        />
                        <Field
                          label="Email address" name="email" type="email" value={form.email}
                          onChange={set("email")} error={errors.email}
                          placeholder="noname_dev@zohomail.in"
                        />
                      </div>

                      <Field
                        label="Budget range (optional)" name="budget" value={form.budget}
                        onChange={set("budget")} error={errors.budget}
                        placeholder="e.g. ₹50k–₹1L, open to discuss"
                      />

                      <Field
                        label="What are you building?" name="message" value={form.message}
                        onChange={set("message")} error={errors.message}
                        textarea placeholder="Describe your project, timeline, or just say hello..."
                      />

                      {/* Project type quick-select */}
                      <div>
                        <p style={{
                          fontFamily: "JetBrains Mono, monospace", fontSize: "0.53rem",
                          textTransform: "uppercase", letterSpacing: "0.25em",
                          color: MUTED, marginBottom: "0.625rem",
                        }}>
                          Project type
                        </p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                          {PROJECT_TAGS.map(tag => {
                            const active = isTagActive(tag);
                            return (
                              <button
                                key={tag} type="button"
                                onClick={() => toggleTag(tag)}
                                style={{
                                  borderRadius: 999, padding: "0.35rem 0.875rem",
                                  fontFamily: "JetBrains Mono, monospace", fontSize: "0.58rem",
                                  textTransform: "uppercase", letterSpacing: "0.15em",
                                  border: `1px solid ${active ? "rgba(182,146,105,0.55)" : "rgba(240,235,227,0.1)"}`,
                                  background: active ? "rgba(182,146,105,0.12)" : "transparent",
                                  color: active ? AMBER : MUTED,
                                  cursor: "pointer", transition: "all 0.2s",
                                }}
                              >
                                {tag}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={status === "sending"}
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.975 }}
                        className="ag-btn"
                        style={{
                          marginTop: "0.5rem",
                          display: "flex", alignItems: "center",
                          justifyContent: "center", gap: "0.625rem",
                          padding: "1rem 1.75rem", borderRadius: 10,
                          border: `1px solid rgba(182,146,105,0.32)`,
                          background: `linear-gradient(135deg, rgba(182,146,105,0.18) 0%, rgba(182,146,105,0.07) 100%)`,
                          color: AMBER, fontSize: "0.875rem",
                          fontFamily: "JetBrains Mono, monospace",
                          textTransform: "uppercase", letterSpacing: "0.18em",
                          cursor: "pointer", transition: "box-shadow 0.3s",
                        }}
                      >
                        {status === "sending" ? (
                          <>
                            <Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} />
                            Transmitting...
                          </>
                        ) : (
                          <>
                            <Send size={14} />
                            Launch message
                          </>
                        )}
                      </motion.button>

                      <p style={{
                        textAlign: "center", fontSize: "0.62rem",
                        fontFamily: "JetBrains Mono, monospace",
                        color: "rgba(240,235,227,0.14)", letterSpacing: "0.15em",
                      }}>
                        Your information stays private · No spam, ever
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          PROCESS STRIP — "Simple by design"
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{
        borderTop: "1px solid rgba(182,146,105,0.07)",
        position: "relative", zIndex: 1,
        padding: "6rem 2.5rem",
      }} className="ag-section-padding">
        <div style={{ maxWidth: "87rem", margin: "0 auto" }}>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem",
              textTransform: "uppercase", letterSpacing: "0.32em",
              color: AMBER, marginBottom: "1rem",
            }}
          >
            How it works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{
              fontFamily: '"Social Gothic","League Gothic",sans-serif',
              fontSize: "clamp(2.5rem,6vw,5rem)", fontWeight: 700,
              textTransform: "uppercase", lineHeight: 0.9,
              letterSpacing: "-0.04em", color: INK, marginBottom: "4rem",
            }}
          >
            Simple by design.
          </motion.h2>

          <div className="ag-process-grid">
            {PROCESS_STEPS.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                style={{
                  borderTop: `2px solid ${i === 0 ? AMBER : "rgba(182,146,105,0.15)"}`,
                  paddingTop: "1.5rem",
                }}
              >
                <span style={{
                  fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem",
                  color: "rgba(182,146,105,0.42)", letterSpacing: "0.2em",
                  display: "block", marginBottom: "1rem",
                }}>{item.step}</span>
                <h3 style={{
                  fontFamily: '"Social Gothic","League Gothic",sans-serif',
                  fontSize: "1.4rem", fontWeight: 700,
                  textTransform: "uppercase", color: INK,
                  lineHeight: 1.1, marginBottom: "0.75rem",
                }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.72, fontWeight: 300, color: MUTED }}>
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════════════════ */}
      <footer style={{
        borderTop: "1px solid rgba(182,146,105,0.07)",
        position: "relative", zIndex: 1,
        padding: "3rem 2.5rem",
      }} className="ag-footer-padding">
        <div style={{
          maxWidth: "87rem", margin: "0 auto",
          display: "flex", flexWrap: "wrap", alignItems: "center",
          justifyContent: "space-between", gap: "1.5rem",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <img src="/logo.png" alt="Logo" style={{ width: "24px", height: "24px", objectContain: "contain" }} />
            <div>
              <span style={{
                fontFamily: '"Social Gothic","League Gothic",sans-serif',
                fontSize: "1.4rem", fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "-0.03em", color: INK,
              }}>
                NOname dev
              </span>
              <span style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "0.7rem", color: MUTED, marginLeft: "0.5rem",
              }}>
                Studio
              </span>
            </div>
          </div>
          <p style={{
            fontFamily: "JetBrains Mono, monospace", fontSize: "0.58rem",
            textTransform: "uppercase", letterSpacing: "0.22em", color: MUTED,
          }}>
            © {new Date().getFullYear()} · Freelance Build Team · Tamil Nadu & Karnataka
          </p>
        </div>
      </footer>
    </motion.div>
  );
}
