import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

// Palette: #F2EDE3 cream · #1C1512 dark text · #B69269 amber · #EDE7DB slightly darker cream

const teamMembers = [
  {
    name: "Shahid Khan",
    role: "Full-Stack Developer",
    initials: "SK",
    index: "01",
    summary: "React, Django, Supabase, Python. Built invoicing tools, management systems, and mobile-ready web apps for small businesses. Co-Founder of Aspivox.",
    points: ["Full-stack systems", "EduTech product building", "Student training across colleges"],
  },
  {
    name: "Nithish Kumar G",
    role: "Backend Engineer",
    initials: "NK",
    index: "02",
    summary: "Django, Supabase, MySQL, Docker, Redis. Builds systems that stay stable under pressure with strong security foundations.",
    points: ["POS and subscription workflows", "Authentication and API security", "Database architecture and caching"],
  },
  {
    name: "Hrithik N L",
    role: "Full-Stack + AI Engineer",
    initials: "HN",
    index: "03",
    summary: "React, TypeScript, Gemini, Firebase, Vercel, AWS. Focused on AI-integrated products and polished execution.",
    points: ["AI resume analysis platform", "Health tracking app deployment", "Design-aware engineering"],
  },
];

const values = [
  { title: "We build for real use cases", body: "Our work is grounded in software that has to function outside demos: internal tools, payment flows, AI products, and operational systems." },
  { title: "We cover the full stack properly", body: "Frontend, backend, AI integration, deployment, security, and performance are handled inside one small team with clear coordination." },
  { title: "We care about reliability", body: "Authentication, API safety, deployment quality, database structure, and stability are not treated as optional polish." },
  { title: "We stay direct and practical", body: "Clients work with builders, not layers of process. We communicate clearly, move quickly, and keep the work grounded." },
];

const stats = [
  { value: "3", label: "Team members" },
  { value: "10+", label: "Products shipped" },
  { value: "2024", label: "Established" },
  { value: "∞", label: "Curiosity" },
];

const shipped = [
  { num: "01", title: "Invoice + Management Tools", desc: "Operational tools for small businesses with frontend usability and backend reliability.", tags: ["React", "Django", "Supabase"] },
  { num: "02", title: "POS + Subscription Systems", desc: "Real-time transaction handling, Razorpay flows, Redis-aware backend architecture.", tags: ["Django", "Redis", "Docker"] },
  { num: "03", title: "AI Resume Analysis Platform", desc: "Production-deployed application using Gemini 1.5, Supabase, and full-stack architecture.", tags: ["Gemini AI", "Supabase", "React"] },
  { num: "04", title: "Mobile-Ready Web Apps", desc: "Apps designed to work cleanly across desktop and mobile without sacrificing speed.", tags: ["React", "TypeScript", "Firebase"] },
];

const BG = "#F2EDE3";
const BG2 = "#EDE7DB";
const INK = "#1C1512";
const AMBER = "#B69269";

export default function AboutPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [openValue, setOpenValue] = useState<number>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-word",
        { y: "110%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1, stagger: 0.08, ease: "power4.out", delay: 0.2 });
      gsap.fromTo(".hero-sub",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", delay: 0.75 });
      gsap.from(".stat-item", {
        y: 40, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".stats-row", start: "top 85%" },
      });
      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((el) => {
        gsap.fromTo(el,
          { y: 50, opacity: 0, filter: "blur(6px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%" } });
      });
      gsap.from(".team-member-card", {
        y: 50, opacity: 0, stagger: 0.12, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: ".team-row", start: "top 80%" },
      });
      gsap.utils.toArray<HTMLElement>(".expand-line").forEach((el) => {
        gsap.fromTo(el, { scaleX: 0 },
          { scaleX: 1, duration: 1.2, ease: "power3.inOut",
            scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      gsap.to(".ghost-text", {
        y: -70, ease: "none",
        scrollTrigger: { trigger: ".statement-section", start: "top bottom", end: "bottom top", scrub: 1.5 },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
      ref={rootRef} style={{ backgroundColor: BG, color: INK, overflowX: "hidden" }}
    >

      {/* ─── HERO ─── */}
      <section style={{ backgroundColor: BG, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "7rem 2.5rem 5rem", position: "relative", overflow: "hidden" }}>
        <img src="/logo.png" alt="Logo" style={{ position: "absolute", top: "2rem", right: "2.5rem", width: "40px", height: "auto", zIndex: 50, opacity: 0.8 }} />
        <div style={{ position: "absolute", top: 0, right: 0, height: 500, width: 500, borderRadius: "50%", background: `radial-gradient(circle, rgba(182,146,105,0.12), transparent 70%)`, pointerEvents: "none" }} />

        <div className="hero-sub" style={{ position: "absolute", top: "7rem", left: "2.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ height: 1, width: 32, backgroundColor: `rgba(28,21,18,0.25)` }} />
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.35em", color: `rgba(28,21,18,0.4)` }}>
            Freelance Build Team · Est. 2024
          </span>
        </div>

        <div style={{ position: "relative", zIndex: 10, maxWidth: "87rem", width: "100%" }}>
          <div style={{ overflow: "hidden", marginBottom: "0.25rem" }}>
            <span className="hero-word" style={{ display: "inline-block", fontFamily: '"Social Gothic","League Gothic",sans-serif', fontSize: "clamp(4.5rem,14vw,160px)", fontWeight: 700, textTransform: "uppercase", lineHeight: 0.88, letterSpacing: "-0.03em", color: INK }}>
              We Are
            </span>
          </div>
          <div style={{ overflow: "hidden" }}>
            <span className="hero-word" style={{ display: "inline-block", fontFamily: '"Social Gothic","League Gothic",sans-serif', fontSize: "clamp(4.5rem,14vw,160px)", fontWeight: 700, textTransform: "uppercase", lineHeight: 0.88, letterSpacing: "-0.03em", color: AMBER }}>
              NOname dev
            </span>
          </div>

          <div style={{ marginTop: "2.5rem", display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem" }}>
            <p className="hero-sub" style={{ maxWidth: "28rem", fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.7, color: `rgba(28,21,18,0.55)` }}>
              A three-person development team from Tamil Nadu &amp; Karnataka building full-stack products, AI tools, and reliable software that ships.
            </p>
            <Link to="/connect" className="hero-sub group" style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", border: `1px solid rgba(182,146,105,0.4)`, padding: "0.75rem 1.5rem", fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.2em", color: AMBER, textDecoration: "none", transition: "all 0.3s" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = AMBER; el.style.color = BG; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = ""; el.style.color = AMBER; }}>
              Start a project <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="hero-sub" style={{ position: "absolute", bottom: "2rem", right: "2.5rem", fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.3em", color: `rgba(28,21,18,0.22)`, display: "flex", alignItems: "center", gap: "0.5rem" }}>
          Scroll <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>↓</motion.span>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <div className="stats-row" style={{ borderTop: `1px solid rgba(28,21,18,0.1)`, borderBottom: `1px solid rgba(28,21,18,0.1)` }}>
        <div style={{ maxWidth: "87rem", margin: "0 auto", padding: "0 2.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {stats.map((stat, i) => (
              <div key={stat.label} className="stat-item" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2.5rem 1rem", textAlign: "center", borderRight: i < stats.length - 1 ? `1px solid rgba(28,21,18,0.08)` : "none" }}>
                <span style={{ fontFamily: '"Social Gothic","League Gothic",sans-serif', fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.04em", color: AMBER }}>{stat.value}</span>
                <span style={{ marginTop: "0.5rem", fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.24em", color: `rgba(28,21,18,0.38)` }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── WHO WE ARE ─── */}
      <section style={{ maxWidth: "87rem", margin: "0 auto", padding: "7rem 2.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "0.55fr 1.45fr", gap: "5rem", alignItems: "start" }}>
          <div>
            <p className="reveal-up" style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.32em", color: AMBER, marginBottom: "1.25rem" }}>Who we are</p>
            <div className="expand-line" style={{ transformOrigin: "left", height: 1, backgroundColor: `rgba(182,146,105,0.28)`, marginBottom: "1.5rem" }} />
            <h2 className="reveal-up" style={{ fontFamily: '"Social Gothic","League Gothic",sans-serif', fontSize: "clamp(2.5rem,5.5vw,5rem)", fontWeight: 700, textTransform: "uppercase", lineHeight: 0.9, letterSpacing: "-0.04em", color: INK }}>
              Developers who ship.
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", fontWeight: 300, lineHeight: 1.75, color: `rgba(28,21,18,0.55)` }}>
            {[
              "We are a three-person development team built out of Tamil Nadu and Karnataka — developers who have moved beyond classrooms and into real products.",
              "Shahid Khan leads the team as a full-stack developer and co-founder of Aspivox, an EduTech startup. With experience spanning React, Django, Supabase, and Python, he has shipped invoicing tools, management systems, and mobile-ready web apps for small businesses.",
              "Nithish Kumar G is our backend engineer — the person who makes sure nothing breaks under pressure. He has built systems handling real-time POS transactions, Razorpay-powered subscription workflows, and multi-database architectures with Redis caching.",
              "Hrithik N L handles full-stack and AI-integrated work. He has deployed an AI resume analysis platform using Gemini 1.5, a health tracking app on Firebase, and brings strong foundations in React, TypeScript, and cloud deployment on Vercel and AWS.",
            ].map((p, i) => (
              <p key={i} className="reveal-up" style={{ fontSize: "1.05rem" }}>{p}</p>
            ))}
            <p className="reveal-up" style={{ fontSize: "1.05rem", fontWeight: 500, color: `rgba(28,21,18,0.8)` }}>Small team. Real delivery.</p>
          </div>
        </div>
      </section>

      {/* ─── STATEMENT ─── */}
      <section className="statement-section" style={{ position: "relative", overflow: "hidden", backgroundColor: BG2, borderTop: `1px solid rgba(28,21,18,0.08)`, borderBottom: `1px solid rgba(28,21,18,0.08)`, padding: "7rem 2.5rem" }}>
        <div className="ghost-text" style={{ pointerEvents: "none", position: "absolute", bottom: -40, left: 0, right: 0, textAlign: "center", userSelect: "none", fontFamily: '"Social Gothic","League Gothic",sans-serif', fontSize: "clamp(8rem,22vw,260px)", fontWeight: 700, textTransform: "uppercase", lineHeight: 1, color: `rgba(28,21,18,0.035)`, letterSpacing: "-0.04em" }}>BUILD</div>
        <div style={{ position: "relative", zIndex: 10, maxWidth: "87rem", margin: "0 auto" }}>
          <p className="reveal-up" style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.32em", color: AMBER, marginBottom: "2.5rem" }}>How we work</p>
          {[
            { num: "01", text: "Frontend, backend, AI, and deployment — in one unit." },
            { num: "02", text: "No handoffs. No silos. Direct communication." },
            { num: "03", text: "We build for actual use cases, not portfolios alone." },
          ].map((item) => (
            <div key={item.num} className="reveal-up group" style={{ display: "flex", alignItems: "baseline", gap: "1.5rem", borderBottom: `1px solid rgba(28,21,18,0.1)`, padding: "2rem 0" }}>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.625rem", color: `rgba(182,146,105,0.55)`, flexShrink: 0, width: 24 }}>{item.num}</span>
              <h3 style={{ fontFamily: '"Social Gothic","League Gothic",sans-serif', fontSize: "clamp(1.8rem,4.5vw,4rem)", fontWeight: 700, textTransform: "uppercase", lineHeight: 0.95, letterSpacing: "-0.03em", color: INK, transition: "color 0.5s", cursor: "default" }}
                onMouseEnter={e => (e.currentTarget.style.color = AMBER)}
                onMouseLeave={e => (e.currentTarget.style.color = INK)}>
                {item.text}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TEAM ─── */}
      <section style={{ maxWidth: "87rem", margin: "0 auto", padding: "7rem 2.5rem" }}>
        <div style={{ marginBottom: "3.5rem", display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1.5rem" }}>
          <div>
            <p className="reveal-up" style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.32em", color: AMBER, marginBottom: "1rem" }}>The team</p>
            <h2 className="reveal-up" style={{ fontFamily: '"Social Gothic","League Gothic",sans-serif', fontSize: "clamp(3rem,8vw,7rem)", fontWeight: 700, textTransform: "uppercase", lineHeight: 0.88, letterSpacing: "-0.04em", color: INK }}>
              Three people.<br /><span style={{ color: AMBER }}>One serious</span><br />build team.
            </h2>
          </div>
          <p className="reveal-up" style={{ maxWidth: "18rem", fontSize: "0.875rem", fontWeight: 300, lineHeight: 1.7, color: `rgba(28,21,18,0.45)`, textAlign: "right" }}>
            Tamil Nadu &amp; Karnataka. Compact by design — no unnecessary layers between the idea and the delivery.
          </p>
        </div>

        <div className="team-row" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, border: `1px solid rgba(28,21,18,0.1)`, backgroundColor: `rgba(28,21,18,0.1)` }}>
          {teamMembers.map((member) => (
            <article key={member.name} className="team-member-card"
              style={{ display: "flex", flexDirection: "column", overflow: "hidden", backgroundColor: BG, transition: "background-color 0.4s" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = BG2)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = BG)}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.75rem", borderBottom: `1px solid rgba(28,21,18,0.08)`, backgroundColor: BG2 }}>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.28em", color: `rgba(28,21,18,0.28)` }}>{member.index}</span>
                <div style={{ display: "flex", height: 56, width: 56, alignItems: "center", justifyContent: "center", borderRadius: "50%", border: `1px solid rgba(182,146,105,0.3)`, backgroundColor: `rgba(182,146,105,0.07)`, fontFamily: '"Social Gothic","League Gothic",sans-serif', fontSize: "1.4rem", fontWeight: 700, letterSpacing: "-0.03em", color: AMBER }}>
                  {member.initials}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "1.75rem" }}>
                <h3 style={{ fontFamily: '"Social Gothic","League Gothic",sans-serif', fontSize: "1.9rem", fontWeight: 700, textTransform: "uppercase", lineHeight: 1, letterSpacing: "-0.03em", color: INK }}>
                  {member.name}
                </h3>
                <p style={{ marginTop: "0.375rem", fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.22em", color: AMBER }}>{member.role}</p>
                <p style={{ marginTop: "1.25rem", fontSize: "0.875rem", lineHeight: 1.7, fontWeight: 300, flex: 1, color: `rgba(28,21,18,0.55)` }}>{member.summary}</p>
                <ul style={{ marginTop: "1.25rem", borderTop: `1px solid rgba(28,21,18,0.08)`, paddingTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {member.points.map((pt) => (
                    <li key={pt} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", fontSize: "0.875rem", color: `rgba(28,21,18,0.5)` }}>
                      <span style={{ marginTop: 7, height: 4, width: 4, flexShrink: 0, borderRadius: "50%", backgroundColor: `rgba(182,146,105,0.55)` }} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ─── SHIPPED WORK ─── */}
      <section style={{ borderTop: `1px solid rgba(28,21,18,0.08)`, padding: "7rem 2.5rem" }}>
        <div style={{ maxWidth: "87rem", margin: "0 auto" }}>
          <p className="reveal-up" style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.32em", color: AMBER, marginBottom: "1rem" }}>Shipped work</p>
          <h2 className="reveal-up" style={{ fontFamily: '"Social Gothic","League Gothic",sans-serif', fontSize: "clamp(3rem,7vw,6.5rem)", fontWeight: 700, textTransform: "uppercase", lineHeight: 0.9, letterSpacing: "-0.04em", color: INK, marginBottom: "3.5rem" }}>
            Real products.<br />Real results.
          </h2>
          {shipped.map((item) => (
            <div key={item.title} className="reveal-up" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1.25rem", borderBottom: `1px solid rgba(28,21,18,0.08)`, padding: "2rem 0" }}>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.625rem", color: `rgba(182,146,105,0.55)`, width: 32, flexShrink: 0 }}>{item.num}</span>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: '"Social Gothic","League Gothic",sans-serif', fontSize: "clamp(1.5rem,3vw,2.5rem)", fontWeight: 700, textTransform: "uppercase", lineHeight: 1.1, letterSpacing: "-0.03em", color: INK, cursor: "default", transition: "color 0.4s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = AMBER)}
                  onMouseLeave={e => (e.currentTarget.style.color = INK)}>
                  {item.title}
                </h3>
                <p style={{ marginTop: "0.375rem", fontSize: "0.875rem", lineHeight: 1.65, fontWeight: 300, color: `rgba(28,21,18,0.5)`, maxWidth: "36rem" }}>{item.desc}</p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {item.tags.map((tag) => (
                  <span key={tag} style={{ borderRadius: 999, border: `1px solid rgba(28,21,18,0.15)`, padding: "0.25rem 0.75rem", fontFamily: "JetBrains Mono, monospace", fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.18em", color: `rgba(28,21,18,0.45)` }}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section style={{ maxWidth: "87rem", margin: "0 auto", padding: "7rem 2.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "0.55fr 1.45fr", gap: "5rem", alignItems: "start" }}>
          <div>
            <p className="reveal-up" style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.32em", color: AMBER, marginBottom: "1rem" }}>Why us</p>
            <h2 className="reveal-up" style={{ fontFamily: '"Social Gothic","League Gothic",sans-serif', fontSize: "clamp(2.5rem,5.5vw,5rem)", fontWeight: 700, textTransform: "uppercase", lineHeight: 0.9, letterSpacing: "-0.04em", color: INK }}>
              The values that shape how we build.
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {values.map((value, index) => {
              const isOpen = openValue === index;
              return (
                <div key={value.title} style={{ overflow: "hidden", border: `1px solid ${isOpen ? "rgba(182,146,105,0.35)" : "rgba(28,21,18,0.1)"}`, backgroundColor: isOpen ? "rgba(182,146,105,0.05)" : "transparent", transition: "all 0.3s" }}>
                  <button type="button" onClick={() => setOpenValue(isOpen ? -1 : index)}
                    style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between", gap: "1.5rem", padding: "1.25rem 1.75rem", textAlign: "left", background: "none", border: "none", cursor: "none" }}>
                    <span style={{ fontFamily: '"Social Gothic","League Gothic",sans-serif', fontSize: "clamp(1.1rem,2.2vw,1.5rem)", fontWeight: 700, textTransform: "uppercase", lineHeight: 1.2, letterSpacing: "-0.02em", color: INK }}>
                      {value.title}
                    </span>
                    <span style={{ flexShrink: 0, color: `rgba(182,146,105,0.8)` }}>
                      {isOpen ? <Minus size={15} strokeWidth={1.5} /> : <Plus size={15} strokeWidth={1.5} />}
                    </span>
                  </button>
                  <div style={{ display: "grid", gridTemplateRows: isOpen ? "1fr" : "0fr", transition: "grid-template-rows 0.4s cubic-bezier(0.4,0,0.2,1)" }}>
                    <div style={{ overflow: "hidden" }}>
                      <p style={{ padding: "0 1.75rem 1.5rem", fontSize: "0.9rem", lineHeight: 1.75, fontWeight: 300, color: `rgba(28,21,18,0.55)` }}>
                        {value.body}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ position: "relative", overflow: "hidden", backgroundColor: INK, padding: "7rem 2.5rem", textAlign: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(182,146,105,0.09), transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 10, maxWidth: "75rem", margin: "0 auto" }}>
          <p className="reveal-up" style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.35em", color: `rgba(182,146,105,0.6)`, marginBottom: "2rem" }}>Ready to build?</p>
          <h2 className="reveal-up" style={{ fontFamily: '"Social Gothic","League Gothic",sans-serif', fontSize: "clamp(4rem,14vw,140px)", fontWeight: 700, textTransform: "uppercase", lineHeight: 0.88, letterSpacing: "-0.03em", color: "#F2EDE3" }}>
            Your Project<br /><span style={{ color: AMBER }}>Starts Here.</span>
          </h2>
          <div className="reveal-up" style={{ marginTop: "3rem" }}>
            <Link to="/connect"
              style={{ display: "inline-flex", alignItems: "center", gap: "1rem", border: `1px solid rgba(182,146,105,0.35)`, padding: "1rem 2rem", fontFamily: "JetBrains Mono, monospace", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.22em", color: AMBER, textDecoration: "none", transition: "all 0.3s" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = AMBER; el.style.color = INK; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = ""; el.style.color = AMBER; }}>
              Get in touch <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

    </motion.div>
  );
}
