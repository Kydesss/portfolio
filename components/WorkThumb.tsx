'use client';

// Auto-advancing thumbnail for the home page work list.
//
// A single cover can only ever show one crop, and these projects are six to
// eleven screens each — so the thumbnail cycles instead. All frames are stacked
// and cross-faded rather than translated, which keeps the layout static and
// costs one compositor-only property.
//
// The first frame is always rendered, so the list looks correct before
// hydration and with JS off; the rest fade in on top of it.

import { useEffect, useRef, useState } from 'react';

const INTERVAL = 3800;
// Offset each row so five thumbnails don't flip in unison down the page.
const STAGGER = 650;

export function WorkThumb({
  images,
  row,
  fallback,
}: {
  images: string[];
  /** Position in the list, used only to stagger the timers. */
  row: number;
  /** Shown when a project has no imagery at all. */
  fallback: string;
}) {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (images.length < 2) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let interval: ReturnType<typeof setInterval> | undefined;
    let start: ReturnType<typeof setTimeout> | undefined;

    const stop = () => {
      if (interval) clearInterval(interval);
      if (start) clearTimeout(start);
      interval = undefined;
      start = undefined;
    };

    // Only animate while the row is actually on screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (interval || start) return;
          start = setTimeout(() => {
            interval = setInterval(
              () => setActive((i) => (i + 1) % images.length),
              INTERVAL
            );
          }, (row % 5) * STAGGER);
        } else {
          stop();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      stop();
    };
  }, [images.length, row]);

  if (images.length === 0) {
    return (
      <span className="work-thumb" aria-hidden="true">
        <span className="work-thumb-fallback">{fallback}</span>
      </span>
    );
  }

  return (
    <span className="work-thumb" ref={ref} aria-hidden="true">
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          loading={i === 0 ? 'eager' : 'lazy'}
          decoding="async"
          className={i === active ? 'is-active' : undefined}
        />
      ))}
      {images.length > 1 && (
        <span className="work-thumb-dots">
          {images.map((src, i) => (
            <span key={src} className={i === active ? 'is-active' : undefined} />
          ))}
        </span>
      )}
    </span>
  );
}
