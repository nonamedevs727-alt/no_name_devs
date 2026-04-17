import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { Zone, WorldItem, items, WORLD_WIDTH, WORLD_HEIGHT, navTargets, START_X, START_Y } from './worldConfig';
import { useWorldCamera } from './useWorldCamera';
import { WorldCard } from './WorldCard';
import { HomeOverlay } from './HomeOverlay';
import { useMediaQuery } from '@/src/hooks/useMediaQuery';

export default function PortfolioMap() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const minimapRef = useRef<HTMLDivElement>(null);

  const [overlay, setOverlay] = useState<null | { type: string; item: WorldItem }>(null);
  const [activeZone, setActiveZone] = useState<Zone>("hero");

  const isMobile = useMediaQuery("(max-width: 767px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const { centerOn } = useWorldCamera({
    viewportRef,
    worldRef,
    minimapRef,
    isMobile,
    prefersReducedMotion,
    overlay,
    WORLD_WIDTH,
    WORLD_HEIGHT,
    START_X,
    START_Y,
  });

  const didPanRef = useRef(false);
  const pointerDownPosRef = useRef({ x: 0, y: 0 });

  const handleViewportPointerDown = useCallback((e: React.PointerEvent) => {
    if (overlay) return;
    pointerDownPosRef.current = { x: e.clientX, y: e.clientY };
    didPanRef.current = false;
  }, [overlay]);

  const handleViewportPointerMove = useCallback((e: React.PointerEvent) => {
    if (pointerDownPosRef.current.x === 0 && pointerDownPosRef.current.y === 0) return;
    const dx = Math.abs(e.clientX - pointerDownPosRef.current.x);
    const dy = Math.abs(e.clientY - pointerDownPosRef.current.y);
    if (dx > 5 || dy > 5) didPanRef.current = true;
  }, []);

  const handleViewportPointerUp = useCallback(() => {
    pointerDownPosRef.current = { x: 0, y: 0 };
  }, []);

  const openOverlay = useCallback((item: WorldItem) => {
    if (didPanRef.current) {
      didPanRef.current = false;
      return;
    }

    let type: string = item.type;
    if (item.id === "about-card") type = "about";
    if (item.id === "contact-card") type = "contact";
    if (item.type === "playCard") type = "dinoGame";
    if (item.type === "dinoGame") type = "dinoGame";
    setOverlay({ type, item });
  }, []);

  const goToZone = useCallback((zone: Zone) => {
    setActiveZone(zone);
    const target = navTargets[zone];
    centerOn(target.x, target.y, 1.2);
  }, [centerOn]);

  return (
    <div className="relative h-[100dvh] w-screen overflow-hidden bg-[#e4ebe3] text-[#1f3324] font-sans">

      {/* Subtle radial background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(207,216,207,0.5),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(182,146,105,0.07),transparent_35%),linear-gradient(180deg,#e4ebe3_0%,#dfe6df_100%)]" />

      {/* Viewport */}
      <div
        ref={viewportRef}
        className="relative h-full w-full overflow-hidden cursor-grab active:cursor-grabbing"
        onPointerDown={handleViewportPointerDown}
        onPointerMove={handleViewportPointerMove}
        onPointerUp={handleViewportPointerUp}
        onPointerCancel={handleViewportPointerUp}
      >
        {/* Dot grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.15] will-change-[background-position,background-size]"
          style={{
            backgroundPosition: 'var(--bg-x, 0) var(--bg-y, 0)',
            backgroundSize: 'calc(28px * var(--bg-s, 1)) calc(28px * var(--bg-s, 1))',
            backgroundImage: 'radial-gradient(circle at center, rgba(31,51,36,0.8) 1px, transparent 1px)',
          }}
        />

        <div
          ref={worldRef}
          className="absolute left-0 top-0 origin-top-left will-change-transform"
          style={{ width: WORLD_WIDTH, height: WORLD_HEIGHT }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="absolute"
              style={{
                left: item.x,
                top: item.y,
                width: item.width,
                height: item.height,
                zIndex: Math.round(item.depth || 1),
                transform: item.rotation ? `rotate(${item.rotation}deg)` : undefined,
              }}
            >
              <div
                className={`h-full w-full ${
                  item.type === "projectStack" ||
                  item.type === "infoCard" ||
                  item.type === "playCard" ||
                  item.type === "teamCard" ||
                  item.type === "dinoGame"
                    ? "floating-card"
                    : ""
                }`}
              >
                <WorldCard item={item} onOpen={openOverlay} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Explore hint (top-left, tucked under nav wordmark) ── */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="pointer-events-none absolute left-6 top-[4.5rem] z-30 sm:top-16"
      >
        <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#4d6a51]/70">
          Drag · click cards · scroll to zoom
        </p>
      </motion.div>

      {/* ── Minimap (bottom-right) ── */}
      <div className="pointer-events-none absolute bottom-[4.5rem] right-6 z-30 hidden sm:block">
        <div className="relative h-[80px] w-[120px] overflow-hidden rounded-xl border border-[#1f3324]/8 bg-white/50 backdrop-blur-sm shadow-sm">
          {(Object.entries(navTargets) as [Zone, { x: number; y: number }][]).map(([zone, pos]) => (
            <div
              key={zone}
              className="absolute h-1.5 w-1.5 rounded-full bg-[#4d6a51]/30"
              style={{
                left: `${(pos.x / WORLD_WIDTH) * 100}%`,
                top: `${(pos.y / WORLD_HEIGHT) * 100}%`,
                transform: "translate(-50%,-50%)",
              }}
            />
          ))}
          <div
            ref={minimapRef}
            className="absolute rounded border border-[#A35A3A]/50 bg-[#A35A3A]/8"
            style={{
              left: "var(--mini-x, 40%)",
              top: "var(--mini-y, 40%)",
              width: "var(--mini-w, 20%)",
              height: "var(--mini-h, 20%)",
            }}
          />
        </div>
      </div>

      {/* ── Bottom zone nav ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2"
      >
        {/* Desktop pill nav */}
        <div className="hidden gap-1 rounded-full border border-[#1f3324]/8 bg-white/75 p-1.5 backdrop-blur-md shadow-md md:flex">
          {(["hero", "services", "play", "about", "contact"] as Zone[]).map((zone) => (
            <button
              key={zone}
              onClick={() => goToZone(zone)}
              className={`rounded-full px-5 py-2 text-[11px] font-mono uppercase tracking-[0.18em] transition-all duration-250 ${
                activeZone === zone
                  ? "bg-[#1f3324] text-white shadow-sm"
                  : "text-[#4d6a51] hover:bg-[#1f3324]/6 hover:text-[#1f3324]"
              }`}
            >
              {zone}
            </button>
          ))}
        </div>

        {/* Mobile dot nav */}
        <div className="flex items-center gap-3 rounded-full border border-[#1f3324]/8 bg-white/80 px-4 py-3 backdrop-blur-md shadow-md md:hidden">
          {(["hero", "services", "play", "about", "contact"] as Zone[]).map((zone) => (
            <button
              key={zone}
              onClick={() => goToZone(zone)}
              title={zone}
              className="flex flex-col items-center gap-1 group"
            >
              <span
                className={`block h-2 w-2 rounded-full transition-all duration-250 ${
                  activeZone === zone
                    ? "bg-[#1f3324] scale-110"
                    : "bg-[#4d6a51]/40 group-hover:bg-[#4d6a51]"
                }`}
              />
              <span className={`font-mono text-[8px] uppercase tracking-widest transition-colors ${
                activeZone === zone ? "text-[#1f3324]" : "text-[#4d6a51]/60"
              }`}>
                {zone[0]}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      <HomeOverlay overlay={overlay} onClose={() => setOverlay(null)} />
    </div>
  );
}
