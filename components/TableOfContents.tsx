'use client';

import { useEffect, useState } from 'react';
import type { TocSection } from '@/lib/toc';

export function TableOfContents({ sections }: { sections: TocSection[] }) {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string | null>(sections[0]?.id ?? null);

  // Scroll-spy: highlight the section nearest the top of the viewport.
  useEffect(() => {
    if (sections.length === 0) return;

    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const inView = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
        if (inView.length > 0) {
          setActive(inView[0].target.id);
        }
      },
      { rootMargin: '-15% 0px -75% 0px', threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  // Reveal the TOC only once the cover image has scrolled above the top.
  useEffect(() => {
    const cover = document.querySelector('.case-cover');
    if (!cover) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const r = entry.boundingClientRect;
        // Reveal once the cover's midpoint has scrolled above the top edge.
        setVisible(r.top + r.height / 2 < 0);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    observer.observe(cover);
    return () => observer.disconnect();
  }, [sections]);

  if (sections.length === 0) return null;

  return (
    <nav
      className="toc"
      aria-label="Table of contents"
      data-visible={visible}
    >
      <p className="toc-heading">Contents</p>
      <ul className="toc-list">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="toc-link"
              aria-current={active === s.id ? 'true' : undefined}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
