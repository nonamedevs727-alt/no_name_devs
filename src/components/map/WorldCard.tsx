import React from 'react';
import { WorldItem } from './worldConfig';

interface WorldCardProps {
  item: WorldItem;
  onOpen: (item: WorldItem) => void;
}

export function WorldCard({ item, onOpen }: WorldCardProps) {
  const clickable =
    item.type === 'projectStack' ||
    item.type === 'infoCard' ||
    item.type === 'playCard' ||
    item.type === 'dinoGame';

  const handleClick = () => {
    if (clickable) onOpen(item);
  };

  // ── Hero ──────────────────────────────────────────────────────────────────
  if (item.type === 'hero') {
    return (
      <div className="h-full w-full select-none">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#B69269]">
          {item.data.eyebrow}
        </p>
        <h1 className="mt-3 font-display text-[clamp(3rem,7vw,6.5rem)] font-bold uppercase leading-[0.88] tracking-[-0.03em] text-[#1f3324]">
          {item.data.titleA}{' '}
          <span className="text-[#B69269]">{item.data.titleB}</span>
        </h1>
        <p className="mt-4 max-w-md text-base font-light leading-relaxed text-[#4d6a51]">
          {item.data.subtitle}
        </p>
      </div>
    );
  }

  // ── Team card ─────────────────────────────────────────────────────────────
  if (item.type === 'teamCard') {
    return (
      <div
        className="relative h-full w-full rounded-[1.75rem] border border-[#1f3324]/10 p-6 shadow-[0_8px_32px_rgba(28,45,32,0.1)] overflow-hidden"
        style={{ backgroundColor: item.data.tone }}
      >
        {item.data.image && (
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <img src={item.data.image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
          </div>
        )}
        <div className="relative z-10 flex h-full flex-col justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1f3324]/15 bg-white/50 font-display text-lg font-bold text-[#1f3324]">
            {item.data.initials}
          </div>
          <div>
            <h3 className="font-display text-xl font-bold uppercase leading-tight text-[#1f3324]">
              {item.data.name}
            </h3>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-[#4d6a51]">
              {item.data.role}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-[#37503a]/70">
              {item.data.stack}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Sticker ───────────────────────────────────────────────────────────────
  if (item.type === 'sticker') {
    return (
      <div
        className="flex h-full w-full flex-col items-center justify-center rounded-2xl px-4 py-3"
        style={{ backgroundColor: item.data.color }}
      >
        <p
          className="font-display text-sm font-bold uppercase leading-tight tracking-[-0.01em]"
          style={{ color: item.data.textColor }}
        >
          {item.data.title}
        </p>
        <p
          className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.2em] opacity-70"
          style={{ color: item.data.textColor }}
        >
          {item.data.label}
        </p>
      </div>
    );
  }

  // ── Project stack ─────────────────────────────────────────────────────────
  if (item.type === 'projectStack') {
    return (
      <div
        onClick={handleClick}
        className="h-full w-full cursor-pointer rounded-[1.75rem] border border-[#1f3324]/10 p-6 shadow-[0_8px_32px_rgba(28,45,32,0.1)] transition-all hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(28,45,32,0.18)]"
        style={{ backgroundColor: item.data.color }}
      >
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="mb-4 flex flex-wrap gap-1.5">
              {item.data.tags.slice(0, 2).map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#1f3324]/10 bg-white/50 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-[#4d6a51]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="font-display text-2xl font-bold uppercase leading-tight text-[#1f3324]">
              {item.data.title}
            </h3>
          </div>
          <div className="flex flex-col gap-1.5">
            {item.data.projects.map((p: string) => (
              <p key={p} className="text-xs text-[#37503a]/60">
                — {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Info card (about / contact) ────────────────────────────────────────────
  if (item.type === 'infoCard') {
    return (
      <div
        onClick={handleClick}
        className="h-full w-full cursor-pointer rounded-[1.75rem] border border-[#1f3324]/10 p-6 shadow-[0_8px_32px_rgba(28,45,32,0.1)] transition-all hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(28,45,32,0.18)]"
        style={{ backgroundColor: item.data.color }}
      >
        <div className="flex h-full flex-col justify-between">
          <h3 className="font-display text-2xl font-bold uppercase leading-tight text-[#1f3324]">
            {item.data.title}
          </h3>
          <div>
            <p className="text-sm font-light leading-relaxed text-[#37503a]/70">
              {item.data.body}
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.24em] text-[#4d6a51]">
              {item.data.cta} →
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Play card ─────────────────────────────────────────────────────────────
  if (item.type === 'playCard') {
    return (
      <div
        onClick={handleClick}
        className="h-full w-full cursor-pointer rounded-[1.75rem] border border-[#1f3324]/10 p-6 shadow-[0_8px_32px_rgba(28,45,32,0.1)] transition-all hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(28,45,32,0.18)]"
        style={{ backgroundColor: item.data.color }}
      >
        <div className="flex h-full flex-col justify-between">
          <span className="text-4xl">⚡</span>
          <div>
            <h3 className="font-display text-2xl font-bold uppercase leading-tight text-white">
              {item.data.title}
            </h3>
            <p className="mt-2 text-sm font-light leading-relaxed text-white/70">
              {item.data.body}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Dino game card ────────────────────────────────────────────────────────
  if (item.type === 'dinoGame') {
    return (
      <div
        onClick={handleClick}
        className="h-full w-full cursor-pointer rounded-[1.75rem] border border-[#1f3324]/10 bg-[#dfe6df] p-6 shadow-[0_8px_32px_rgba(28,45,32,0.1)] transition-all hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(28,45,32,0.18)]"
      >
        <div className="flex h-full flex-col justify-between">
          <span className="text-4xl">⚡</span>
          <div>
            <h3 className="font-display text-2xl font-bold uppercase leading-tight text-[#1f3324]">
              {item.data.title || 'Mini Game'}
            </h3>
            <p className="mt-2 text-sm font-light leading-relaxed text-[#37503a]/70">
              {item.data.body || 'Click to play'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
