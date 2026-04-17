import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { WorldItem } from "./worldConfig";
import DinoGame from "../DinoGame";

export function HomeOverlay({
  overlay,
  onClose,
}: {
  overlay: null | { type: string; item: WorldItem };
  onClose: () => void;
}) {
  // Increment every time the dinoGame overlay opens so React creates a
  // completely new <DinoGame> instance — busting the Runner.instance_ singleton.
  const dinoKeyRef = useRef(0);
  const prevOpen = useRef(false);
  const isOpen = overlay?.type === "dinoGame";
  if (isOpen && !prevOpen.current) dinoKeyRef.current += 1;
  prevOpen.current = isOpen;

  useEffect(() => {
    if (!overlay) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [overlay]);

  // Friendly label for the overlay type tag
  const typeLabel = (type: string) => {
    if (type === "dinoGame") return "Playground";
    if (type === "projectStack") return "Services";
    return type;
  };

  // Title for the overlay heading
  const overlayTitle = (overlay: { type: string; item: WorldItem }) => {
    if (overlay.type === "dinoGame") return "Dino Run";
    return overlay.item.data.title || overlay.item.data.titleA || "Detail";
  };

  return (
    <AnimatePresence>
      {overlay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1C1512]/60 p-4 backdrop-blur-md sm:p-8"
        >
          {/* Click-outside backdrop */}
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-[2rem] border border-white/10 bg-[#dfe6df] p-8 shadow-[0_40px_120px_rgba(0,0,0,0.3)] sm:p-12"
          >
            {/* Header */}
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#4d6a51]">
                  {typeLabel(overlay.type)}
                </p>
                <h2 className="mt-3 font-display text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-[0.92] tracking-[-0.02em] text-[#1f3324]">
                  {overlayTitle(overlay)}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="mt-1 rounded-full border border-[#1f3324]/10 p-3 text-[#1f3324] transition-all hover:rotate-90 hover:bg-[#1f3324]/5"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            {/* ─── Project Stack ─────────────────────────────────────────── */}
            {overlay.type === "projectStack" && (
              <div className="space-y-10">
                <p className="max-w-2xl text-xl font-light leading-relaxed text-[#37503a]">
                  Explore recent work grouped under {overlay.item.data.title.toLowerCase()}.
                </p>
                <div className="grid gap-6 sm:grid-cols-3">
                  {overlay.item.data.projects.map((project: string, i: number) => (
                    <motion.div
                      key={project}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.08 }}
                      className="group rounded-[1.5rem] border border-[#1f3324]/10 bg-white/60 p-6 transition-colors hover:bg-white"
                    >
                      <div className="relative mb-6 h-48 overflow-hidden rounded-xl bg-[linear-gradient(135deg,#dfe6df_0%,#d1d9cf_100%)] p-4">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.5),transparent_35%)]" />
                        <div className="relative z-10 flex h-full flex-col justify-between">
                          <div className="flex gap-2">
                            {overlay.item.data.tags.slice(0, 2).map((tag: string) => (
                              <span
                                key={tag}
                                className="rounded-full border border-[#1f3324]/10 bg-white/60 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-[#4d6a51]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="rounded-[1rem] border border-[#1f3324]/10 bg-white/45 p-4">
                            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#4d6a51]">
                              delivery snapshot
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-[#1f3324]">
                              <div className="rounded-lg bg-white/60 p-3">
                                <div className="font-semibold">UI</div>
                                <div className="mt-1 text-xs text-[#4d6a51]">Responsive and clean</div>
                              </div>
                              <div className="rounded-lg bg-white/60 p-3">
                                <div className="font-semibold">API</div>
                                <div className="mt-1 text-xs text-[#4d6a51]">Integrated properly</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <h3 className="font-display text-xl font-bold text-[#1f3324]">{project}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#4d6a51]">
                        Replace this with your exact stack, screenshots, results, and implementation notes.
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── About ─────────────────────────────────────────────────── */}
            {overlay.type === "about" && (
              <div className="max-w-3xl space-y-6 text-lg font-light text-[#37503a] sm:text-xl">
                <p className="leading-relaxed">
                  We are a three-person development team from Tamil Nadu and Karnataka building practical
                  digital products for real businesses and real users.
                </p>
                <p className="leading-relaxed">
                  Between us, we cover frontend systems, backend engineering, AI integrations, cloud
                  deployment, and production-ready delivery.
                </p>
                <div className="mt-8 border-t border-[#1f3324]/10 pt-8">
                  <a
                    href="/about"
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#1f3324] transition-colors hover:text-[#B69269]"
                  >
                    Read full story <span className="text-lg">→</span>
                  </a>
                </div>
              </div>
            )}

            {/* ─── Contact ───────────────────────────────────────────────── */}
            {overlay.type === "contact" && (
              <div className="space-y-8">
                <p className="max-w-2xl text-xl font-light leading-relaxed text-[#37503a]">
                  Available for freelance web apps, backend systems, AI-integrated products, and
                  production-ready software builds.
                </p>
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "email", value: "noname_dev@zohomail.in" },
                    { label: "linkedin", value: "/in/nonamedev-studio" },
                    { label: "github", value: "github.com/nonamedev" },
                  ].map(({ label, value }) => (
                    <div key={label} className="rounded-[1.5rem] border border-[#1f3324]/10 bg-white/55 p-5">
                      <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#4d6a51]">{label}</div>
                      <div className="mt-4 text-lg font-semibold text-[#1f3324]">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── Dino Game ─────────────────────────────────────────────── */}
            {overlay.type === "dinoGame" && (
              <div className="space-y-5">
                <p className="text-sm font-light leading-relaxed text-[#37503a]">
                  The classic Chrome dino game — runs right in the browser.{" "}
                  <span className="font-mono">
                    <kbd className="rounded border border-[#1f3324]/20 bg-white/60 px-1.5 py-0.5 text-xs">Space</kbd>
                    {" "}or{" "}
                    <kbd className="rounded border border-[#1f3324]/20 bg-white/60 px-1.5 py-0.5 text-xs">↑</kbd>
                    {" "}to jump ·{" "}
                    <kbd className="rounded border border-[#1f3324]/20 bg-white/60 px-1.5 py-0.5 text-xs">↓</kbd>
                    {" "}to duck
                  </span>
                </p>
                {/*
                  key={dinoKeyRef.current} forces a full unmount+remount of DinoGame
                  each time this overlay opens — this resets the iframe and busts
                  the Runner.instance_ singleton left from any previous session.
                */}
                <DinoGame key={dinoKeyRef.current} />
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
