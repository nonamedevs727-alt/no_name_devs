import React, { useRef, useEffect } from 'react';

export default function DinoGame() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Auto-focus the iframe once it loads so keyboard events work immediately
    const iframe = iframeRef.current;
    if (!iframe) return;

    const onLoad = () => {
      iframe.focus();
    };
    iframe.addEventListener('load', onLoad);

    // Forward keyboard events from the parent page into the iframe
    const forward = (e: KeyboardEvent) => {
      // Don't capture keys when user is typing in an input
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) return;

      const doc = iframeRef.current?.contentDocument;
      if (!doc) return;

      // Prevent the modal from scrolling on game keys
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'ArrowDown') {
        e.preventDefault();
      }

      try {
        const cloned = new KeyboardEvent(e.type, {
          key: e.key,
          code: e.code,
          keyCode: e.keyCode,
          which: e.which,
          bubbles: true,
          cancelable: true,
        });
        doc.dispatchEvent(cloned);
      } catch {
        // Ignore cross-origin errors
      }
    };

    document.addEventListener('keydown', forward);
    document.addEventListener('keyup', forward);

    return () => {
      iframe.removeEventListener('load', onLoad);
      document.removeEventListener('keydown', forward);
      document.removeEventListener('keyup', forward);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div
        className="w-full overflow-hidden rounded-2xl border border-[#1f3324]/15 bg-[#f7f7f7] shadow-[0_8px_32px_rgba(28,45,32,0.12)] cursor-pointer"
        onClick={() => iframeRef.current?.focus()}
      >
        <iframe
          ref={iframeRef}
          src="/dino.html"
          style={{ width: '100%', height: '220px', border: 'none', display: 'block' }}
          title="Chrome Dino Game"
          tabIndex={0}
        />
      </div>
      <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#6b5d50]">
        Click the game · Press Space / ↑ to jump · ↓ to duck
      </p>
    </div>
  );
}
