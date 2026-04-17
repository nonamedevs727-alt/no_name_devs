import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type StickerItem = {
  id: string;
  x: number;
  y: number;
  rotate: number;
  label?: string;
  image?: string;
  hoverImage?: string;
  svg?: React.ReactNode;
  color: string;
  draggable?: boolean;
  shape?: "square" | "circle" | "pill" | "image";
  action?: "panel" | "spin";
};

const stickersData: StickerItem[] = [
  {
    id: "sticker-1",
    x: -15,
    y: -10,
    rotate: -8,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=200&auto=format&fit=crop",
    label: "Brand builder",
    color: "#F4EFE6",
    draggable: true,
    shape: "image",
  },
  {
    id: "sticker-2",
    x: 90,
    y: 5,
    rotate: 12,
    svg: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#B69269]">
        <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor" opacity="0.2"/>
        <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
      </svg>
    ),
    label: "Web + motion",
    color: "#E8D5D5",
    draggable: true,
    shape: "circle",
  },
  {
    id: "sticker-3",
    x: -5,
    y: 85,
    rotate: 6,
    svg: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#37503a]">
        <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
        <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
      </svg>
    ),
    label: "Built with code",
    color: "#D4DFD0",
    draggable: false,
    shape: "pill",
    action: "panel",
  },
  {
    id: "sticker-4",
    x: 85,
    y: 80,
    rotate: -6,
    svg: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#1f3324]">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
        <line x1="9" y1="9" x2="9.01" y2="9"></line>
        <line x1="15" y1="9" x2="15.01" y2="9"></line>
      </svg>
    ),
    label: "Playful systems",
    color: "#D6E0E2",
    draggable: false,
    shape: "square",
    action: "spin",
  },
];

function Sticker({
  item,
  mobile,
  onOpenPanel,
}: {
  item: StickerItem;
  mobile: boolean;
  onOpenPanel: (x: number, y: number) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const drag = useRef({
    active: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { rotate: item.rotate });

    if (!mobile) {
      gsap.to(el, {
        y: "+=12",
        duration: 2.5 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    const onEnter = () => {
      setIsHovered(true);
      if (mobile) return;
      gsap.to(el, {
        scale: 1.08,
        rotate: item.rotate + (item.rotate > 0 ? 4 : -4),
        duration: 0.3,
        ease: "back.out(1.5)",
        boxShadow: "0 20px 40px rgba(28,45,32,0.15)",
      });
    };

    const onLeave = () => {
      setIsHovered(false);
      if (drag.current.active) return;
      gsap.to(el, {
        scale: 1,
        rotate: item.rotate,
        duration: 0.3,
        ease: "power2.out",
        boxShadow: "0 8px 24px rgba(28,45,32,0.08)",
      });
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [item.rotate, mobile]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !item.draggable || mobile) return;

    const onPointerDown = (e: PointerEvent) => {
      e.stopPropagation(); // Prevent map panning
      drag.current.active = true;
      drag.current.startX = e.clientX;
      drag.current.startY = e.clientY;
      drag.current.originX = pos.current.x;
      drag.current.originY = pos.current.y;
      el.setPointerCapture?.(e.pointerId);

      gsap.to(el, {
        scale: 1.12,
        rotate: item.rotate + 6,
        duration: 0.2,
        boxShadow: "0 25px 50px rgba(28,45,32,0.2)",
      });
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!drag.current.active) return;
      const dx = e.clientX - drag.current.startX;
      const dy = e.clientY - drag.current.startY;
      pos.current.x = drag.current.originX + dx;
      pos.current.y = drag.current.originY + dy;

      gsap.set(el, {
        x: pos.current.x,
        y: pos.current.y,
      });
    };

    const onPointerUp = () => {
      if (!drag.current.active) return;
      drag.current.active = false;

      gsap.to(el, {
        scale: 1,
        rotate: item.rotate,
        duration: 0.4,
        ease: "back.out(1.2)",
        boxShadow: "0 8px 24px rgba(28,45,32,0.08)",
      });
    };

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [item.draggable, item.rotate, mobile]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.action === "spin" && ref.current) {
      gsap.to(ref.current, {
        rotation: "+=360",
        scale: 1.2,
        duration: 0.6,
        ease: "back.out(1.5)",
        yoyo: true,
        onComplete: () => {
          gsap.to(ref.current, { scale: 1, duration: 0.2 });
        }
      });
    } else if (item.action === "panel" && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      onOpenPanel(rect.left + rect.width / 2, rect.top + rect.height + 10);
    }
  };

  const radius =
    item.shape === "circle"
      ? "rounded-full"
      : item.shape === "pill"
      ? "rounded-[999px]"
      : "rounded-[16px]";

  const isImageShape = item.shape === "image";

  return (
    <button
      ref={ref}
      type="button"
      onClick={handleClick}
      className={`absolute flex flex-col items-center justify-center gap-3 border-[3px] border-white/80 p-3 text-center shadow-[0_8px_24px_rgba(28,45,32,0.08)] backdrop-blur-md transition-colors no-drag pointer-events-auto ${radius} ${
        item.draggable ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"
      }`}
      style={{
        left: `${item.x}%`,
        top: `${item.y}%`,
        background: item.color,
        minWidth: isImageShape ? "140px" : "120px",
      }}
    >
      {isImageShape && item.image ? (
        <div className="relative w-24 h-24 overflow-hidden rounded-[8px] shadow-inner">
          <img 
            src={isHovered && item.hoverImage ? item.hoverImage : item.image} 
            alt={item.label}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center w-12 h-12">
          {item.svg}
        </div>
      )}
      {item.label && (
        <span className="font-display italic text-[13px] tracking-wide text-[#1f3324] opacity-90">
          {item.label}
        </span>
      )}
    </button>
  );
}

export default function FloatingStickers() {
  const mobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelPos, setPanelPos] = useState({ x: 0, y: 0 });

  const handleOpenPanel = (x: number, y: number) => {
    setPanelPos({ x, y });
    setPanelOpen(!panelOpen);
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      <div className="relative h-full w-full">
        {stickersData.map((item) => (
          <Sticker key={item.id} item={item} mobile={mobile} onOpenPanel={handleOpenPanel} />
        ))}
      </div>

      {/* Mini Panel Overlay */}
      {panelOpen && (
        <div 
          className="fixed z-50 w-64 rounded-2xl bg-[#1f3324] p-5 text-[#e4ebe3] shadow-2xl pointer-events-auto transform -translate-x-1/2"
          style={{ left: panelPos.x, top: panelPos.y }}
        >
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-display text-lg uppercase tracking-tight">Tech Stack</h4>
            <button onClick={() => setPanelOpen(false)} className="opacity-50 hover:opacity-100 transition-opacity">
              ✕
            </button>
          </div>
          <p className="font-sans text-sm font-light opacity-80 leading-relaxed">
            Built with React, Tailwind CSS, GSAP for fluid animations, and Framer Motion for layout transitions.
          </p>
        </div>
      )}
    </div>
  );
}
