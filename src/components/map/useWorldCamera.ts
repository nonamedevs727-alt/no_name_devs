import { RefObject, useCallback, useEffect, useRef } from 'react';

interface UseWorldCameraProps {
  viewportRef: RefObject<HTMLDivElement>;
  worldRef: RefObject<HTMLDivElement>;
  minimapRef: RefObject<HTMLDivElement>;
  isMobile: boolean;
  prefersReducedMotion: boolean;
  overlay: any;
  WORLD_WIDTH: number;
  WORLD_HEIGHT: number;
  START_X: number;
  START_Y: number;
}

export function useWorldCamera({
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
}: UseWorldCameraProps) {
  const scaleRef = useRef(isMobile ? 0.55 : 0.72);
  const txRef = useRef(0);
  const tyRef = useRef(0);
  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const pointerDownPos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  const clamp = (val: number, min: number, max: number) =>
    Math.max(min, Math.min(max, val));

  const applyTransform = useCallback(
    (x: number, y: number, s: number, animate = false) => {
      const world = worldRef.current;
      const viewport = viewportRef.current;
      const minimap = minimapRef.current;
      if (!world || !viewport) return;

      const vw = viewport.offsetWidth;
      const vh = viewport.offsetHeight;

      // Remove clamping to allow infinite panning
      // x = clamp(x, minX, 0);
      // y = clamp(y, minY, 0);

      txRef.current = x;
      tyRef.current = y;
      scaleRef.current = s;

      world.style.transition =
        animate && !prefersReducedMotion
          ? 'transform 0.55s cubic-bezier(0.22,1,0.36,1)'
          : '';
      world.style.transform = `translate(${x}px,${y}px) scale(${s})`;

      viewport.style.setProperty('--bg-x', `${x}px`);
      viewport.style.setProperty('--bg-y', `${y}px`);
      viewport.style.setProperty('--bg-s', `${s}`);

      if (minimap) {
        const mw = minimap.parentElement?.offsetWidth ?? 130;
        const mh = minimap.parentElement?.offsetHeight ?? 90;
        const miniX = clamp((-x / s / WORLD_WIDTH) * 100, 0, 100);
        const miniY = clamp((-y / s / WORLD_HEIGHT) * 100, 0, 100);
        const miniW = clamp((vw / s / WORLD_WIDTH) * 100, 5, 60);
        const miniH = clamp((vh / s / WORLD_HEIGHT) * 100, 5, 60);
        minimap.style.setProperty('--mini-x', `${miniX}%`);
        minimap.style.setProperty('--mini-y', `${miniY}%`);
        minimap.style.setProperty('--mini-w', `${miniW}%`);
        minimap.style.setProperty('--mini-h', `${miniH}%`);
      }
    },
    [viewportRef, worldRef, minimapRef, WORLD_WIDTH, WORLD_HEIGHT, prefersReducedMotion]
  );

  const centerOn = useCallback(
    (wx: number, wy: number, targetScale?: number) => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      const s = targetScale ?? scaleRef.current;
      const vw = viewport.offsetWidth;
      const vh = viewport.offsetHeight;
      const x = vw / 2 - wx * s;
      const y = vh / 2 - wy * s;
      applyTransform(x, y, s, true);
    },
    [viewportRef, applyTransform]
  );

  // Initial position
  useEffect(() => {
    const s = isMobile ? 0.55 : 0.72;
    centerOn(START_X, START_Y, s);
  }, []);

  // Drag + wheel
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onPointerDown = (e: PointerEvent) => {
      if (overlay) return;
      // Don't capture immediately, wait for move
      isDragging.current = false;
      lastPointer.current = { x: e.clientX, y: e.clientY };
      pointerDownPos.current = { x: e.clientX, y: e.clientY };
      velocity.current = { x: 0, y: 0 };
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (pointerDownPos.current.x === 0) return;
      
      const dx = e.clientX - lastPointer.current.x;
      const dy = e.clientY - lastPointer.current.y;
      
      if (!isDragging.current) {
        const dist = Math.sqrt(Math.pow(e.clientX - pointerDownPos.current.x, 2) + Math.pow(e.clientY - pointerDownPos.current.y, 2));
        if (dist > 5) {
          isDragging.current = true;
          viewport.setPointerCapture(e.pointerId);
        } else {
          return;
        }
      }

      velocity.current = { x: dx, y: dy };
      lastPointer.current = { x: e.clientX, y: e.clientY };
      applyTransform(txRef.current + dx, tyRef.current + dy, scaleRef.current);
    };

    const onPointerUp = (e: PointerEvent) => {
      pointerDownPos.current = { x: 0, y: 0 };
      if (!isDragging.current) return;
      isDragging.current = false;
      try { viewport.releasePointerCapture(e.pointerId); } catch(e) {}
      if (prefersReducedMotion) return;
      const decelerate = () => {
        const vx = velocity.current.x * 0.9;
        const vy = velocity.current.y * 0.9;
        velocity.current = { x: vx, y: vy };
        if (Math.abs(vx) > 0.4 || Math.abs(vy) > 0.4) {
          applyTransform(txRef.current + vx, tyRef.current + vy, scaleRef.current);
          rafId.current = requestAnimationFrame(decelerate);
        }
      };
      rafId.current = requestAnimationFrame(decelerate);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = -e.deltaY * 0.001;
        const newScale = clamp(scaleRef.current * (1 + delta), 0.3, 2.5);
        const rect = viewport.getBoundingClientRect();
        const cx = e.clientX - rect.left;
        const cy = e.clientY - rect.top;
        const newTx = cx - (cx - txRef.current) * (newScale / scaleRef.current);
        const newTy = cy - (cy - tyRef.current) * (newScale / scaleRef.current);
        applyTransform(newTx, newTy, newScale);
      } else {
        applyTransform(txRef.current - e.deltaX, tyRef.current - e.deltaY, scaleRef.current);
      }
    };

    viewport.addEventListener('pointerdown', onPointerDown);
    viewport.addEventListener('pointermove', onPointerMove);
    viewport.addEventListener('pointerup', onPointerUp);
    viewport.addEventListener('pointercancel', onPointerUp);
    viewport.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      viewport.removeEventListener('pointerdown', onPointerDown);
      viewport.removeEventListener('pointermove', onPointerMove);
      viewport.removeEventListener('pointerup', onPointerUp);
      viewport.removeEventListener('pointercancel', onPointerUp);
      viewport.removeEventListener('wheel', onWheel);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [overlay, applyTransform, prefersReducedMotion]);

  return { centerOn };
}
