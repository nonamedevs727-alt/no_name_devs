import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], input, textarea, select, label, .no-drag');
      setIsHovering(!!interactive);
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, [isVisible]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden sm:block">
      {/* Dot */}
      <motion.div
        className="absolute top-0 left-0 rounded-full"
        animate={{
          x: pos.x - (isHovering ? 18 : 5),
          y: pos.y - (isHovering ? 18 : 5),
          width: isHovering ? 36 : 10,
          height: isHovering ? 36 : 10,
          backgroundColor: isHovering ? 'rgba(255,115,164,0.25)' : '#B69269',
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          x: { type: 'spring', stiffness: 600, damping: 35, mass: 0.4 },
          y: { type: 'spring', stiffness: 600, damping: 35, mass: 0.4 },
          width: { duration: 0.2, ease: 'easeOut' },
          height: { duration: 0.2, ease: 'easeOut' },
          backgroundColor: { duration: 0.2 },
          opacity: { duration: 0.2 },
        }}
      />
      {/* Ring — lags behind slightly for depth */}
      <motion.div
        className="absolute top-0 left-0 rounded-full border border-[#B69269]/50"
        animate={{
          x: pos.x - 18,
          y: pos.y - 18,
          scale: isHovering ? 0.6 : 1,
          opacity: isVisible ? (isHovering ? 0 : 0.5) : 0,
        }}
        style={{ width: 36, height: 36 }}
        transition={{
          x: { type: 'spring', stiffness: 180, damping: 22, mass: 0.8 },
          y: { type: 'spring', stiffness: 180, damping: 22, mass: 0.8 },
          scale: { duration: 0.25 },
          opacity: { duration: 0.2 },
        }}
      />
    </div>
  );
}
