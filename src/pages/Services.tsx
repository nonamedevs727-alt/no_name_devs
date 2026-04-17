import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    title: "Web Development",
    description: "We design and develop fast, responsive, and scalable websites — from landing pages and portfolios to full-stack web applications. Built with React, Django, and modern tooling.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    bg: "#1f3324",
    text: "#e4ebe3"
  },
  {
    title: "Mobile App Development",
    description: "Cross-platform mobile apps for Android and iOS using React Native and Expo, connected to robust cloud backends via Supabase or Firebase.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
    bg: "#B69269",
    text: "#1f3324"
  },
  {
    title: "UI/UX Design",
    description: "User-first interface design using Figma — wireframes, prototypes, and high-fidelity mockups that look polished and convert visitors into users.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
    bg: "#cfd8cf",
    text: "#1f3324"
  },
  {
    title: "Backend & API Development",
    description: "RESTful APIs, database design, and server-side logic built with Django REST Framework and Supabase — secure, documented, and production-ready.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    bg: "#37503a",
    text: "#e4ebe3"
  },
  {
    title: "ERP & Management Systems",
    description: "Custom internal tools like assignment trackers, billing systems, inventory managers, and student portals tailored to SMEs and educational institutions.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    bg: "#1f3324",
    text: "#e4ebe3"
  },
  {
    title: "Billing & Invoice Solutions",
    description: "Lightweight, smart invoicing tools for micro and small businesses — with PDF generation, GST compliance, and email delivery built in.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    bg: "#B69269",
    text: "#1f3324"
  },
  {
    title: "Technical Training & Workshops",
    description: "Hands-on coding workshops and sessions for college students covering web development, Python, app development, and real-world project building.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
    bg: "#cfd8cf",
    text: "#1f3324"
  },
  {
    title: "Software Consulting",
    description: "Early-stage startups and small businesses can get architecture advice, tech stack recommendations, and product roadmap guidance from our team.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    bg: "#37503a",
    text: "#e4ebe3"
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = panelsRef.current.filter(Boolean);

      // Initial states
      panels.forEach(panel => gsap.set(panel, { filter: "brightness(1)" }));

      // Hide panels 1, 2, 3 initially using clip-path so they can reveal over the previous
      panels.forEach((panel, i) => {
        if (i !== 0) {
          gsap.set(panel, { clipPath: "inset(100% 0 0 0)" });
        }
      });

      panels.forEach((panel, i) => {
        if (i === 0) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ghostRef.current,
            start: () => `top+=${(i - 1) * window.innerHeight} top`,
            end: () => `top+=${i * window.innerHeight} top`,
            scrub: true
          }
        });

        // Reveal current panel
        tl.to(panel, {
          clipPath: "inset(0% 0 0 0)",
          ease: "none"
        }, 0);

        // Animate current panel content slightly downward into place
        const content = panel.querySelector('.content');
        if (content) {
          tl.fromTo(content, {
            y: window.innerWidth < 768 ? -70 : -100
          }, {
            y: 0,
            ease: "none"
          }, 0);
        }

        // Previous panel moves upward and dims
        tl.to(panels[i - 1], {
          y: window.innerWidth < 768 ? -70 : -100,
          filter: "brightness(0.5)",
          ease: "none"
        }, 0);
      });

      // Intro h1 scale and fade
      gsap.timeline({
        scrollTrigger: {
          trigger: ghostRef.current,
          start: "top top",
          end: () => `top+=${window.innerHeight} top`,
          scrub: 1
        }
      })
      .to(".intro h1", {
        scale: window.innerWidth < 768 ? 3.2 : 4,
        opacity: 0.15,
        ease: "none"
      }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      ref={containerRef} 
      className="services-wrap relative bg-[#0a0a0a]"
    >
      <div id="ghost-scroll" ref={ghostRef} className="h-[900vh] w-full"></div>

      <section 
        ref={el => panelsRef.current[0] = el} 
        className="service-panel intro fixed inset-0 grid place-items-center p-8 sm:p-16 will-change-transform z-[1] bg-[#e4ebe3] text-[#1f3324]"
      >
        <h1 className="font-social font-bold text-7xl sm:text-8xl md:text-9xl uppercase tracking-tighter m-0 text-center">Services</h1>
      </section>

      {servicesData.map((service, index) => (
        <section 
          key={service.title}
          ref={el => panelsRef.current[index + 1] = el} 
          className="service-panel fixed inset-0 grid place-items-center p-8 sm:p-16 will-change-transform"
          style={{ backgroundColor: service.bg, color: service.text, zIndex: index + 2 }}
        >
          <div className="content max-w-[1200px] w-full grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <p className="font-mono text-sm uppercase tracking-[0.2em] mb-6 opacity-80">0{index + 1} // Service</p>
              <h2 className="font-display text-5xl sm:text-6xl md:text-7xl uppercase tracking-tighter mb-6 leading-[0.9]">{service.title}</h2>
              <p className="font-sans text-lg sm:text-xl font-light leading-relaxed opacity-90">{service.description}</p>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] shadow-2xl">
              <img src={service.image} alt={service.title} className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
        </section>
      ))}
    </motion.div>
  );
}
