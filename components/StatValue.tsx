'use client';

// Counts a stat up when it scrolls into view.
//
// The full value is rendered on the server and only replaced once the element is
// observed, so with JS off — or before hydration — the real number is already on
// screen. Non-numeric stats ("PSSUQ + TLX") and reduced-motion users skip the
// animation entirely and just render the text.

import { useEffect, useRef, useState } from 'react';

const DURATION = 1100;

/** Split "132 bpm" into 132 / " bpm", or "4.42/5" into 4.42 / "/5". */
function parse(value: string): { prefix: string; target: number; suffix: string } | null {
  const match = value.match(/^(\D*?)([\d,]+(?:\.\d+)?)(.*)$/s);
  if (!match) return null;
  const target = Number(match[2].replace(/,/g, ''));
  if (!Number.isFinite(target)) return null;
  return { prefix: match[1], target, suffix: match[3] };
}

export function StatValue({ value }: { value: string }) {
  const parsed = parse(value);
  const [display, setDisplay] = useState<string | null>(null);
  const ref = useRef<HTMLSpanElement | null>(null);
  const raf = useRef(0);

  // `parsed` is a fresh object each render, so key the effect off the raw string.
  useEffect(() => {
    if (!parsed) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const { target } = parsed;
    const decimals = (target.toString().split('.')[1] ?? '').length;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        // Fire once, then stop observing.
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION);
          // easeOutExpo — fast start, long settle, so the final value is legible.
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          setDisplay((target * eased).toFixed(decimals));
          if (t < 1) raf.current = requestAnimationFrame(tick);
        };
        raf.current = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!parsed) return <span>{value}</span>;

  return (
    <span ref={ref}>
      {parsed.prefix}
      {display ?? parsed.target}
      {parsed.suffix}
    </span>
  );
}
