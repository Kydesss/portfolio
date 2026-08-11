'use client';

// Grid of looping flow demos — the "work first" surface of a case study.
//
// Seven autoplaying videos on one page is a lot of decode work, so each clip
// preloads nothing, shows its poster frame until it scrolls into view, and
// pauses again once it leaves. Under prefers-reduced-motion nothing ever plays
// and the poster is the whole experience.

import { useEffect, useRef } from 'react';
import type { WorkFlow } from '@/lib/content';

function Flow({ flow }: { flow: WorkFlow }) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // play() rejects if the browser blocks autoplay; the poster stays up,
          // which is a fine fallback, so swallow it rather than logging noise.
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      el.pause();
    };
  }, []);

  return (
    <figure className="flow">
      {/* Caption first: a <figcaption> is valid as either the first or last
          child, and the label reads as a header for the clip beneath it. */}
      <figcaption className="flow-label">
        {flow.emoji && (
          <span className="flow-emoji" aria-hidden="true">
            {flow.emoji}
          </span>
        )}
        {flow.label}
      </figcaption>
      <div className="flow-media">
        <video
          ref={ref}
          src={flow.src}
          poster={flow.poster}
          muted
          loop
          playsInline
          preload="none"
          // Decorative: the label above names the flow.
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>
    </figure>
  );
}

export function FlowGrid({ flows }: { flows: WorkFlow[] }) {
  if (flows.length === 0) return null;
  return (
    <div className="flow-grid">
      {flows.map((flow) => (
        <Flow key={flow.src} flow={flow} />
      ))}
    </div>
  );
}
