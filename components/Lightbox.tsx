"use client";

import { useEffect, useState, useCallback, useRef } from "react";

const MIN_SCALE = 1;
const MAX_SCALE = 6;

export function Lightbox() {
  const [active, setActive] = useState<{ src: string; alt: string } | null>(
    null
  );
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const drag = useRef<{
    panning: boolean;
    moved: boolean;
    startX: number;
    startY: number;
    baseTx: number;
    baseTy: number;
  }>({ panning: false, moved: false, startX: 0, startY: 0, baseTx: 0, baseTy: 0 });

  const reset = useCallback(() => {
    setScale(1);
    setTx(0);
    setTy(0);
  }, []);

  const close = useCallback(() => {
    setActive(null);
    reset();
  }, [reset]);

  // Delegate clicks from any image inside the case body.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const img = target.closest(".case-body img") as HTMLImageElement | null;
      if (!img) return;
      e.preventDefault();
      reset();
      setActive({ src: img.currentSrc || img.src, alt: img.alt || "" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [reset]);

  // Esc to close + lock scroll while open.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, close]);

  // Wheel zoom anchored to the pointer. Non-passive so preventDefault works.
  useEffect(() => {
    if (!active) return;
    const el = imgRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      // Pointer position relative to image center, in element (pre-scale) units.
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const px = e.clientX - cx;
      const py = e.clientY - cy;

      setScale((prevScale) => {
        const factor = Math.exp(-e.deltaY * 0.0015);
        const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, prevScale * factor));
        const ratio = next / prevScale;
        if (next === MIN_SCALE) {
          setTx(0);
          setTy(0);
        } else {
          // Keep the point under the cursor fixed while scaling.
          setTx((t) => px - (px - t) * ratio);
          setTy((t) => py - (py - t) * ratio);
        }
        return next;
      });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [active]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (scale <= 1) return;
    e.preventDefault();
    drag.current = {
      panning: true,
      moved: false,
      startX: e.clientX,
      startY: e.clientY,
      baseTx: tx,
      baseTy: ty,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.panning) return;
    const dx = e.clientX - drag.current.startX;
    const dy = e.clientY - drag.current.startY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) drag.current.moved = true;
    setTx(drag.current.baseTx + dx);
    setTy(drag.current.baseTy + dy);
  };

  const onPointerUp = () => {
    drag.current.panning = false;
  };

  const onImgClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Suppress close when a pan just happened.
    if (drag.current.moved) {
      drag.current.moved = false;
    }
  };

  const onImgDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (scale > 1) {
      reset();
    } else {
      setScale(2.5);
    }
  };

  if (!active) return null;

  const zoomed = scale > 1;

  return (
    <div
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={active.alt || "Image preview"}
      onClick={close}
    >
      <button className="lightbox-close" aria-label="Close" onClick={close}>
        ✕
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        className="lightbox-img"
        src={active.src}
        alt={active.alt}
        draggable={false}
        style={{
          transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
          cursor: zoomed ? "grab" : "zoom-in",
        }}
        onClick={onImgClick}
        onDoubleClick={onImgDoubleClick}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      />
      <div className="lightbox-hint">Scroll to zoom · double-click to reset</div>
    </div>
  );
}
