export type Zone = "hero" | "services" | "play" | "about" | "contact";
export type WorldItemType =
  | "hero"
  | "projectStack"
  | "infoCard"
  | "sticker"
  | "playCard"
  | "dinoGame"
  | "teamCard";

export type WorldItem = {
  id: string;
  type: WorldItemType;
  zone: Zone;
  x: number;
  y: number;
  width: number;
  height: number;
  depth?: number;
  rotation?: number;
  data: Record<string, any>;
};

export const WORLD_WIDTH = 5000;
export const WORLD_HEIGHT = 4000;
export const START_X = 2500;
export const START_Y = 1800;

// ─── Zone nav targets ───────────────────────────────────────────────────────
export const navTargets: Record<Zone, { x: number; y: number }> = {
  hero:     { x: 2500, y: 1700 },
  services: { x:  950, y: 1600 },
  play:     { x: 3900, y: 1400 },
  about:    { x: 1800, y: 3000 },
  contact:  { x: 3100, y: 3000 },
};

export const items: WorldItem[] = [

  // ─── HERO ZONE (center) ─────────────────────────────────────────────────
  {
    id: "hero-main",
    type: "hero",
    zone: "hero",
    x: 1900,
    y: 1380,
    width: 1100,
    height: 340,
    depth: 2,
    data: {
      eyebrow: "Freelance Build Team",
      titleA: "Build",
      titleB: "Better.",
      subtitle:
        "Full-stack development, backend systems, AI integrations, and deployment — handled by a focused three-person team.",
    },
  },
  {
    id: "team-shahid",
    type: "teamCard",
    zone: "hero",
    x: 1820,
    y: 1900,
    width: 280,
    height: 360,
    rotation: -3,
    depth: 1.15,
    data: {
      name: "Shahid Khan",
      role: "Full-Stack Developer",
      stack: "React, Django, Supabase, Python",
      initials: "SK",
      tone: "#d8ead7",
      image: "/shahid.png",
    },
  },
  {
    id: "team-nithish",
    type: "teamCard",
    zone: "hero",
    x: 2180,
    y: 1940,
    width: 280,
    height: 360,
    rotation: 1,
    depth: 1.1,
    data: {
      name: "Nithish Kumar G",
      role: "Backend Engineer",
      stack: "Django, MySQL, Docker, Redis",
      initials: "NK",
      tone: "#eadfcf",
      image: "/nithish.png",
    },
  },
  {
    id: "team-hrithik",
    type: "teamCard",
    zone: "hero",
    x: 2540,
    y: 1900,
    width: 280,
    height: 360,
    rotation: 3,
    depth: 1.15,
    data: {
      name: "Hrithik N L",
      role: "Full-Stack + AI Engineer",
      stack: "React, TypeScript, Gemini, AWS",
      initials: "HN",
      tone: "#dbe5ec",
      image: "/hrithik.png",
    },
  },
  {
    id: "sticker-available",
    type: "sticker",
    zone: "hero",
    x: 1620,
    y: 1540,
    width: 165,
    height: 80,
    rotation: -8,
    depth: 0.9,
    data: {
      title: "Open for work",
      label: "2025",
      color: "#FF73A4",
      textColor: "#1C1512",
    },
  },
  {
    id: "sticker-est",
    type: "sticker",
    zone: "hero",
    x: 3020,
    y: 1460,
    width: 148,
    height: 74,
    rotation: 10,
    depth: 0.8,
    data: {
      title: "Est. 2024",
      label: "NOname dev",
      color: "#B69269",
      textColor: "#1C1512",
    },
  },

  // ─── SERVICES ZONE (far left) ────────────────────────────────────────────
  {
    id: "service-web",
    type: "projectStack",
    zone: "services",
    x: 480,
    y: 1200,
    width: 300,
    height: 330,
    rotation: -3,
    depth: 1.1,
    data: {
      title: "Web Apps",
      color: "#dfe6df",
      tags: ["React", "TypeScript", "Mobile-Ready"],
      projects: ["Aspivox Platform", "Invoicing Tool", "Management System"],
    },
  },
  {
    id: "service-backend",
    type: "projectStack",
    zone: "services",
    x: 960,
    y: 1080,
    width: 300,
    height: 330,
    rotation: 2,
    depth: 1.1,
    data: {
      title: "Backend Systems",
      color: "#e8ddd0",
      tags: ["Django", "Supabase", "Redis", "Docker"],
      projects: ["POS System", "Auth Platform", "Subscription Engine"],
    },
  },
  {
    id: "service-ai",
    type: "projectStack",
    zone: "services",
    x: 680,
    y: 1700,
    width: 300,
    height: 330,
    rotation: -1,
    depth: 1.05,
    data: {
      title: "AI + Cloud",
      color: "#d8e4ec",
      tags: ["Gemini AI", "AWS", "Firebase", "Vercel"],
      projects: ["AI Resume Platform", "Health Tracker", "Cloud Deployments"],
    },
  },
  {
    id: "sticker-fullstack",
    type: "sticker",
    zone: "services",
    x: 380,
    y: 1680,
    width: 155,
    height: 76,
    rotation: -7,
    depth: 0.85,
    data: {
      title: "Full Stack",
      label: "End to end",
      color: "#1f3324",
      textColor: "#dfe6df",
    },
  },

  // ─── PLAY ZONE (far right) ───────────────────────────────────────────────
  {
    id: "play-card",
    type: "playCard",
    zone: "play",
    x: 3700,
    y: 1100,
    width: 290,
    height: 290,
    rotation: -4,
    depth: 1.15,
    data: {
      title: "Playground",
      body: "Small interactions, Pikachu mini-game and visual experiments.",
      color: "#b69269",
    },
  },
  {
    id: "sticker-ai",
    type: "sticker",
    zone: "play",
    x: 3520,
    y: 1480,
    width: 150,
    height: 74,
    rotation: -5,
    depth: 0.9,
    data: {
      title: "AI-powered",
      label: "Gemini · Claude",
      color: "#dbe5ec",
      textColor: "#1f3324",
    },
  },
  {
    id: "sticker-speed",
    type: "sticker",
    zone: "play",
    x: 4200,
    y: 1480,
    width: 155,
    height: 78,
    rotation: 7,
    depth: 0.85,
    data: {
      title: "Ship fast.",
      label: "Zero fluff",
      color: "#1f3324",
      textColor: "#dfe6df",
    },
  },

  // ─── ABOUT ZONE (bottom-left) ────────────────────────────────────────────
  {
    id: "about-card",
    type: "infoCard",
    zone: "about",
    x: 1600,
    y: 2800,
    width: 320,
    height: 300,
    rotation: -3,
    depth: 1.1,
    data: {
      title: "About Us",
      body: "Three developers from Tamil Nadu and Karnataka building full-stack products, AI tools, and reliable software.",
      cta: "Our story",
      color: "#dfe6df",
    },
  },
  {
    id: "sticker-india",
    type: "sticker",
    zone: "about",
    x: 1340,
    y: 2940,
    width: 160,
    height: 76,
    rotation: 5,
    depth: 0.88,
    data: {
      title: "Tamil Nadu · Karnataka",
      label: "India",
      color: "#eadfcf",
      textColor: "#1f3324",
    },
  },

  // ─── CONTACT ZONE (bottom-right) ─────────────────────────────────────────
  {
    id: "contact-card",
    type: "infoCard",
    zone: "contact",
    x: 2980,
    y: 2820,
    width: 320,
    height: 300,
    rotation: 4,
    depth: 1.1,
    data: {
      title: "Contact",
      body: "Available for freelance web apps, backend systems, AI integrations, and production-ready builds.",
      cta: "Say hello",
      color: "#edf1ea",
    },
  },
];
