import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const work = [
  {
    num: "01",
    title: "Invoice + Management Tools",
    tags: "React · Django · Supabase",
    year: "2024",
  },
  {
    num: "02",
    title: "POS + Subscription Systems",
    tags: "Django · Redis · Razorpay",
    year: "2024",
  },
  {
    num: "03",
    title: "AI Resume Analysis Platform",
    tags: "Gemini 1.5 · Supabase · React",
    year: "2024",
  },
  {
    num: "04",
    title: "Health Tracking App",
    tags: "Firebase · React · TypeScript",
    year: "2024",
  },
];

const services = [
  { title: "Frontend Development", items: ["React & TypeScript interfaces", "Responsive production UI", "Motion & interaction design"] },
  { title: "Backend Engineering", items: ["Django APIs & Supabase", "Auth, security, databases", "Redis, Docker, deployment"] },
  { title: "AI + Cloud", items: ["Gemini & Claude integrations", "AWS · Firebase · Vercel", "Scalable AI workflows"] },
];

const team = [
  { initials: "SK", name: "Shahid Khan", role: "Full-Stack Developer", stack: "React · Django · Supabase · Python", note: "Co-Founder, Aspivox", image: "/shahid.png" },
  { initials: "NK", name: "Nithish Kumar G", role: "Backend Engineer", stack: "Django · MySQL · Docker · Redis", note: "Systems & Security", image: "/nithish.png" },
  { initials: "HN", name: "Hrithik N L", role: "Full-Stack + AI Engineer", stack: "React · TypeScript · Gemini · AWS", note: "AI & Design-aware Engineering", image: "/hrithik.png" },
];

const ticker = ["Full-Stack Development", "Backend Systems", "AI Integration", "Cloud Deployment", "React & TypeScript", "Django & Supabase", "Gemini AI", "AWS & Firebase", "Production-ready Builds", "Tamil Nadu · Karnataka"];

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero lines stagger in
      gsap.fromTo(".hero-line",
        { y: "105%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.1, stagger: 0.1, ease: "power4.out", delay: 0.1 }
      );
      gsap.fromTo(".hero-meta",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "power3.out", delay: 0.7 }
      );

      // Work rows reveal
      gsap.utils.toArray<HTMLElement>(".work-row").forEach((el, i) => {
        gsap.fromTo(el,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.75, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
            delay: i * 0.04,
          }
        );
      });

      // Section headers
      gsap.utils.toArray<HTMLElement>(".section-head").forEach((el) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0, filter: "blur(6px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%" } }
        );
      });

      // Team cards
      gsap.from(".team-card",{
        y: 50, opacity: 0, stagger: 0.12, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: ".team-grid", start: "top 82%" },
      });

      // Service blocks
      gsap.from(".service-block", {
        y: 40, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".services-grid", start: "top 85%" },
      });

      // Divider lines expand
      gsap.utils.toArray<HTMLElement>(".divider").forEach((el) => {
        gsap.fromTo(el, { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: "power3.inOut",
            scrollTrigger: { trigger: el, start: "top 90%" } }
        );
      });

      // Parallax on big CTA text
      gsap.to(".cta-bg-text", {
        y: -60, ease: "none",
        scrollTrigger: { trigger: ".cta-section", start: "top bottom", end: "bottom top", scrub: 1.5 },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} style={{ backgroundColor: "#F2EDE3", color: "#1C1512", overflowX: "hidden" }}>

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "7rem 2.5rem 4rem", position: "relative" }}>
        {/* Ambient glow top-right */}
        <div style={{ position: "absolute", top: 0, right: 0, height: 600, width: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(182,146,105,0.1), transparent 70%)", pointerEvents: "none" }} />

        {/* Top-right meta */}
        <div className="hero-meta" style={{ position: "absolute", top: "7rem", right: "2.5rem", textAlign: "right", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(28,21,18,0.38)" }}>Est. 2024</span>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(28,21,18,0.38)" }}>Tamil Nadu · Karnataka</span>
        </div>

        {/* Huge wordmark */}
        <div style={{ maxWidth: "90rem", width: "100%" }}>
          <div style={{ overflow: "hidden", marginBottom: "0.5rem" }}>
            <h1 className="hero-line" style={{ fontFamily: '"Social Gothic","League Gothic",sans-serif', fontSize: "clamp(5rem,17vw,18rem)", fontWeight: 700, textTransform: "uppercase", lineHeight: 0.85, letterSpacing: "-0.03em", color: "#1C1512", margin: 0 }}>
              NOname dev
            </h1>
          </div>
          <div style={{ overflow: "hidden" }}>
            <p className="hero-line" style={{ fontFamily: '"Social Gothic","League Gothic",sans-serif', fontSize: "clamp(1.8rem,4vw,4.5rem)", fontWeight: 700, textTransform: "uppercase", lineHeight: 1, letterSpacing: "-0.02em", color: "#B69269", margin: 0 }}>
              Studio — Freelance Build Team
            </p>
          </div>

          <div style={{ marginTop: "3rem", display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem" }}>
            <p className="hero-meta" style={{ maxWidth: "32rem", fontSize: "clamp(1rem,1.8vw,1.2rem)", fontWeight: 300, lineHeight: 1.75, color: "rgba(28,21,18,0.55)" }}>
              Full-stack development, backend systems, AI integrations, and deployment — handled by a focused three-person team from South India.
            </p>
            <div className="hero-meta" style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-end" }}>
              <Link to="/connect" style={{ display: "inline-flex", alignItems: "center", gap: "0.625rem", fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.22em", color: "#B69269", textDecoration: "none", border: "1px solid rgba(182,146,105,0.35)", padding: "0.75rem 1.5rem", transition: "all 0.3s" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = "#B69269"; el.style.color = "#F2EDE3"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = ""; el.style.color = "#B69269"; }}>
                Start a project <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="hero-meta" style={{ position: "absolute", bottom: "2.5rem", left: "2.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 1, height: 48, backgroundColor: "rgba(28,21,18,0.2)" }} />
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(28,21,18,0.3)" }}>Scroll</span>
        </div>
      </section>

      {/* ─── TICKER ───────────────────────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid rgba(28,21,18,0.1)", borderBottom: "1px solid rgba(28,21,18,0.1)", overflow: "hidden", padding: "1rem 0", backgroundColor: "#1C1512" }}>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          style={{ display: "flex", gap: "3rem", whiteSpace: "nowrap", width: "max-content" }}
        >
          {[...ticker, ...ticker].map((item, i) => (
            <span key={i} style={{ fontFamily: '"Social Gothic","League Gothic",sans-serif', fontSize: "clamp(1rem,2vw,1.4rem)", textTransform: "uppercase", letterSpacing: "0.05em", color: i % 3 === 0 ? "#B69269" : "rgba(242,237,227,0.5)", flexShrink: 0 }}>
              {item} <span style={{ color: "#B69269", marginLeft: "1rem" }}>·</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ─── INTRO STATEMENT ─────────────────────────────────────────────── */}
      <section style={{ maxWidth: "90rem", margin: "0 auto", padding: "8rem 2.5rem", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "6rem", alignItems: "start" }}>
        <div>
          <p className="section-head" style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.32em", color: "#B69269", marginBottom: "1.5rem" }}>Who we are</p>
          <h2 className="section-head" style={{ fontFamily: '"Social Gothic","League Gothic",sans-serif', fontSize: "clamp(3rem,6vw,5.5rem)", fontWeight: 700, textTransform: "uppercase", lineHeight: 0.9, letterSpacing: "-0.03em", color: "#1C1512" }}>
            Three<br />people.<br /><span style={{ color: "#B69269" }}>One team.</span>
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", paddingTop: "0.5rem" }}>
          <p className="section-head" style={{ fontSize: "1.15rem", fontWeight: 300, lineHeight: 1.8, color: "rgba(28,21,18,0.6)" }}>
            We are a freelance development team from Tamil Nadu and Karnataka — three developers who build real software for real use cases.
          </p>
          <p className="section-head" style={{ fontSize: "1.15rem", fontWeight: 300, lineHeight: 1.8, color: "rgba(28,21,18,0.6)" }}>
            Between us we cover frontend, backend, AI integration, and cloud deployment — without splitting responsibility across too many hands. No handoffs. No silos. You talk to the people who build.
          </p>
          <Link to="/about" className="section-head" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.22em", color: "#1C1512", textDecoration: "none", marginTop: "0.5rem", transition: "color 0.3s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#B69269")}
            onMouseLeave={e => (e.currentTarget.style.color = "#1C1512")}>
            Read our story <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      {/* ─── WORK ────────────────────────────────────────────────────────── */}
      <section style={{ borderTop: "1px solid rgba(28,21,18,0.1)", padding: "7rem 0" }}>
        <div style={{ maxWidth: "90rem", margin: "0 auto", padding: "0 2.5rem" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "4rem" }}>
            <h2 className="section-head" style={{ fontFamily: '"Social Gothic","League Gothic",sans-serif', fontSize: "clamp(3rem,6vw,5rem)", fontWeight: 700, textTransform: "uppercase", lineHeight: 0.9, letterSpacing: "-0.03em", color: "#1C1512" }}>
              Selected Work
            </h2>
            <span className="section-head" style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.28em", color: "rgba(28,21,18,0.35)" }}>
              2024 — Present
            </span>
          </div>

          <div>
            {work.map((item, i) => (
              <div key={item.num} className="work-row" style={{ display: "flex", alignItems: "center", gap: "2rem", padding: "1.75rem 0", borderBottom: "1px solid rgba(28,21,18,0.08)", cursor: "default", transition: "all 0.35s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.paddingLeft = "1rem"; (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(28,21,18,0.03)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.paddingLeft = "0"; (e.currentTarget as HTMLElement).style.backgroundColor = ""; }}>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", color: "rgba(182,146,105,0.6)", width: 28, flexShrink: 0 }}>{item.num}</span>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: '"Social Gothic","League Gothic",sans-serif', fontSize: "clamp(1.6rem,3.5vw,3rem)", fontWeight: 700, textTransform: "uppercase", lineHeight: 1, letterSpacing: "-0.02em", color: "#1C1512" }}>
                    {item.title}
                  </h3>
                  <p style={{ marginTop: "0.35rem", fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(28,21,18,0.4)" }}>{item.tags}</p>
                </div>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", color: "rgba(28,21,18,0.3)", flexShrink: 0 }}>{item.year}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ────────────────────────────────────────────────────── */}
      <section style={{ padding: "7rem 0", backgroundColor: "#EDE7DB" }}>
        <div style={{ maxWidth: "90rem", margin: "0 auto", padding: "0 2.5rem" }}>
          <div style={{ marginBottom: "4rem" }}>
            <p className="section-head" style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.32em", color: "#B69269", marginBottom: "1rem" }}>What we do</p>
            <h2 className="section-head" style={{ fontFamily: '"Social Gothic","League Gothic",sans-serif', fontSize: "clamp(3rem,6vw,5rem)", fontWeight: 700, textTransform: "uppercase", lineHeight: 0.9, letterSpacing: "-0.03em", color: "#1C1512" }}>
              Full-stack.<br /><span style={{ color: "#B69269" }}>Front to back.</span>
            </h2>
          </div>
          <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, backgroundColor: "rgba(28,21,18,0.1)" }}>
            {services.map((s, i) => (
              <div key={s.title} className="service-block" style={{ backgroundColor: "#EDE7DB", padding: "2.5rem" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#F2EDE3")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#EDE7DB")}>
                <div style={{ height: 1, backgroundColor: "rgba(182,146,105,0.3)", marginBottom: "2rem", transformOrigin: "left" }} />
                <h3 style={{ fontFamily: '"Social Gothic","League Gothic",sans-serif', fontSize: "clamp(1.5rem,2.5vw,2.2rem)", fontWeight: 700, textTransform: "uppercase", lineHeight: 0.95, letterSpacing: "-0.02em", color: "#1C1512", marginBottom: "1.5rem" }}>{s.title}</h3>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {s.items.map(it => (
                    <li key={it} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.6, color: "rgba(28,21,18,0.6)" }}>
                      <span style={{ marginTop: 8, width: 3, height: 3, borderRadius: "50%", backgroundColor: "#B69269", flexShrink: 0 }} />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEAM ────────────────────────────────────────────────────────── */}
      <section style={{ padding: "7rem 0", borderTop: "1px solid rgba(28,21,18,0.08)" }}>
        <div style={{ maxWidth: "90rem", margin: "0 auto", padding: "0 2.5rem" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "4rem", flexWrap: "wrap", gap: "1rem" }}>
            <h2 className="section-head" style={{ fontFamily: '"Social Gothic","League Gothic",sans-serif', fontSize: "clamp(3rem,6vw,5rem)", fontWeight: 700, textTransform: "uppercase", lineHeight: 0.9, letterSpacing: "-0.03em", color: "#1C1512" }}>
              The Team
            </h2>
            <p className="section-head" style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(28,21,18,0.35)", maxWidth: "18rem", textAlign: "right" }}>
              Three people, direct communication, serious execution
            </p>
          </div>
          <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
            {team.map((m, i) => (
              <div 
                key={m.name} 
                className="team-card" 
                style={{ 
                  borderTop: "2px solid #B69269", 
                  paddingTop: "1.75rem", 
                  transition: "all 0.4s",
                  position: "relative",
                  overflow: "hidden",
                  zIndex: 1
                }}
                onMouseEnter={e => (e.currentTarget.querySelector(".team-initials") as HTMLElement | null)?.style && ((e.currentTarget.querySelector(".team-initials") as HTMLElement).style.color = "#F2EDE3") && ((e.currentTarget.querySelector(".team-initials") as HTMLElement).style.backgroundColor = "#1C1512")}
                onMouseLeave={e => (e.currentTarget.querySelector(".team-initials") as HTMLElement | null) && ((e.currentTarget.querySelector(".team-initials") as HTMLElement).style.color = "#B69269") && ((e.currentTarget.querySelector(".team-initials") as HTMLElement).style.backgroundColor = "rgba(182,146,105,0.08)")}
              >
                {m.image && (
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: -1,
                    opacity: 0.15,
                    pointerEvents: "none"
                  }}>
                    <img src={m.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent, #F2EDE3)" }} />
                  </div>
                )}
                <div className="team-initials" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 52, height: 52, borderRadius: "50%", border: "1px solid rgba(182,146,105,0.3)", backgroundColor: "rgba(182,146,105,0.08)", fontFamily: '"Social Gothic","League Gothic",sans-serif', fontSize: "1.3rem", fontWeight: 700, color: "#B69269", marginBottom: "1.25rem", transition: "all 0.4s" }}>
                  {m.initials}
                </div>
                <h3 style={{ fontFamily: '"Social Gothic","League Gothic",sans-serif', fontSize: "clamp(1.6rem,2.5vw,2.2rem)", fontWeight: 700, textTransform: "uppercase", lineHeight: 0.95, letterSpacing: "-0.02em", color: "#1C1512", marginBottom: "0.35rem" }}>{m.name}</h3>
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "#B69269", marginBottom: "1rem" }}>{m.role}</p>
                <p style={{ fontSize: "0.875rem", fontWeight: 300, lineHeight: 1.7, color: "rgba(28,21,18,0.55)", marginBottom: "0.75rem" }}>{m.stack}</p>
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(28,21,18,0.3)" }}>{m.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────────────────── */}
      <section className="cta-section" style={{ backgroundColor: "#1C1512", padding: "8rem 2.5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="cta-bg-text" style={{ position: "absolute", bottom: -40, left: 0, right: 0, fontFamily: '"Social Gothic","League Gothic",sans-serif', fontSize: "clamp(8rem,22vw,280px)", fontWeight: 700, textTransform: "uppercase", lineHeight: 1, color: "rgba(242,237,227,0.03)", letterSpacing: "-0.04em", userSelect: "none", pointerEvents: "none" }}>
          BUILD
        </div>
        <div style={{ position: "relative", zIndex: 10, maxWidth: "70rem", margin: "0 auto" }}>
          <p className="section-head" style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.35em", color: "rgba(182,146,105,0.55)", marginBottom: "2rem" }}>
            Got a project in mind?
          </p>
          <h2 className="section-head" style={{ fontFamily: '"Social Gothic","League Gothic",sans-serif', fontSize: "clamp(4rem,14vw,13rem)", fontWeight: 700, textTransform: "uppercase", lineHeight: 0.88, letterSpacing: "-0.03em", color: "#F2EDE3", marginBottom: "3rem" }}>
            Let's<br /><span style={{ color: "#B69269" }}>Build.</span>
          </h2>
          <Link to="/connect" className="section-head" style={{ display: "inline-flex", alignItems: "center", gap: "1rem", border: "1px solid rgba(182,146,105,0.35)", padding: "1.1rem 2.5rem", fontFamily: "JetBrains Mono, monospace", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.25em", color: "#B69269", textDecoration: "none", transition: "all 0.3s" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = "#B69269"; el.style.color = "#1C1512"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = ""; el.style.color = "#B69269"; }}>
            Get in touch <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────────────────────── */}
      <footer style={{ backgroundColor: "#1C1512", borderTop: "1px solid rgba(242,237,227,0.06)", padding: "2rem 2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <span style={{ fontFamily: '"Social Gothic","League Gothic",sans-serif', fontSize: "1.1rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "-0.02em", color: "#F2EDE3" }}>NOname dev Studio</span>
        <div style={{ display: "flex", gap: "2rem" }}>
          {["home","about","services","connect"].map(p => (
            <Link key={p} to={p === "home" ? "/" : `/${p}`} style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(242,237,227,0.35)", textDecoration: "none", transition: "color 0.3s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#B69269")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(242,237,227,0.35)")}>
              {p}
            </Link>
          ))}
        </div>
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(242,237,227,0.25)" }}>
          © 2024 NOname dev Studio
        </span>
      </footer>

    </div>
  );
}
