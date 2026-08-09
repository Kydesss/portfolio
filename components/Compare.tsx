'use client';

// Draggable before/after image slider.
//
// Both images are always in the DOM at full size; the "after" layer is revealed
// by a clip-path driven off a range input. Using a real <input type="range">
// rather than pointer math means keyboard and screen-reader support come for
// free, and the control still works if the pointer handlers never fire.

import { useCallback, useRef, useState } from 'react';

export function Compare({
  before,
  after,
  beforeAlt,
  afterAlt,
  beforeLabel = 'Before',
  afterLabel = 'After',
  caption,
}: {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
}) {
  const [pos, setPos] = useState(50);
  const frame = useRef<HTMLDivElement | null>(null);

  // Dragging anywhere on the image feels more natural than only on the handle.
  const setFromClientX = useCallback((clientX: number) => {
    const el = frame.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  return (
    <figure className="figure compare">
      <div
        className="compare-frame"
        ref={frame}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          setFromClientX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons !== 1) return;
          setFromClientX(e.clientX);
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={before} alt={beforeAlt} loading="lazy" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="compare-after"
          src={after}
          alt={afterAlt}
          loading="lazy"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        />

        <span className="compare-tag compare-tag--before" aria-hidden="true">
          {beforeLabel}
        </span>
        <span className="compare-tag compare-tag--after" aria-hidden="true">
          {afterLabel}
        </span>

        <span className="compare-divider" style={{ left: `${pos}%` }} aria-hidden="true">
          <span className="compare-grip">⇔</span>
        </span>

        <input
          className="compare-range"
          type="range"
          min={0}
          max={100}
          step={0.1}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Reveal ${afterLabel.toLowerCase()}: ${afterAlt}`}
        />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
