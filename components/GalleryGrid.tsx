'use client';

import { useEffect, useMemo, useState } from 'react';
import { GALLERY_CATEGORIES, type GalleryItem } from '@/lib/gallery';
import { CategoryGlyph, LinkIcon, ZoomIcon, linkKind } from '@/components/GalleryIcons';

type Filter = 'All' | (typeof GALLERY_CATEGORIES)[number];

function GalleryCard({ item, targeted }: { item: GalleryItem; targeted: boolean }) {
  return (
    <div
      // Anchor target so /gallery#<slug> deep-links to this card.
      id={item.slug}
      className={`gallery-card${targeted ? ' is-targeted' : ''}`}
    >
      {item.image ? (
        // The whole image is shown (object-fit: contain) over a blurred fill of
        // itself, so portrait posters, square posts, and landscape thumbnails all
        // sit in the same card size without cropping. Clicking opens the Lightbox.
        <button
          type="button"
          className="gallery-card-media gallery-card-media--has-img"
          aria-label={`Enlarge image: ${item.title}`}
        >
          <span
            className="gallery-card-media-blur"
            style={{ backgroundImage: `url("${item.image}")` }}
            aria-hidden="true"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.image} alt={item.title} loading="lazy" />
          {/* Always visible, not hover-only: without it the image reads as a video
              thumbnail and people don't know it enlarges. */}
          <span className="gallery-card-zoom" aria-hidden="true">
            <ZoomIcon />
            Enlarge
          </span>
        </button>
      ) : (
        // No image on file, so draw deliberate cover art instead of an empty
        // photo slot. Shorter than the image media, so it reads as a banner.
        <div className="gallery-card-media gallery-card-media--empty" aria-hidden="true">
          <span className="gallery-card-cover">
            <CategoryGlyph category={item.category} />
            <span className="gallery-card-cover-label">{item.category}</span>
          </span>
        </div>
      )}

      <div className="gallery-card-body">
        <div className="gallery-card-head">
          <h3>
            {item.title}
            <a
              className="gallery-card-anchor"
              href={`#${item.slug}`}
              aria-label={`Link to ${item.title}`}
            >
              #
            </a>
          </h3>
          <span className="gallery-card-year">{item.year}</span>
        </div>
        <p className="gallery-card-desc">{item.description}</p>
        {item.tags && item.tags.length > 0 && (
          <ul className="gallery-card-tags">
            {item.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}
        {item.href && (
          <a
            className="gallery-card-link"
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkIcon kind={linkKind(item.href)} className="gallery-card-link-icon" />
            {item.linkLabel ?? 'View'} <span className="arrow">→</span>
          </a>
        )}
      </div>
    </div>
  );
}

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<Filter>('All');
  const [targeted, setTargeted] = useState<string | null>(null);

  // Only show filter tabs for categories that actually have items.
  const activeCategories = useMemo(
    () => GALLERY_CATEGORIES.filter((c) => items.some((i) => i.category === c)),
    [items]
  );

  const filtered = useMemo(
    () => (filter === 'All' ? items : items.filter((i) => i.category === filter)),
    [items, filter]
  );

  const filters: Filter[] = ['All', ...activeCategories];

  // Deep links: /gallery#<slug>. Handled here rather than left to the browser
  // because an active category filter can keep the target card out of the DOM.
  useEffect(() => {
    const resolve = () => {
      const slug = decodeURIComponent(window.location.hash.slice(1));
      if (!slug || !items.some((i) => i.slug === slug)) return;
      setFilter('All');
      setTargeted(slug);
    };
    resolve();
    window.addEventListener('hashchange', resolve);
    return () => window.removeEventListener('hashchange', resolve);
  }, [items]);

  // Runs after the filter reset above has put the card back in the DOM.
  useEffect(() => {
    if (!targeted) return;
    const el = document.getElementById(targeted);
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
    const clear = setTimeout(() => setTargeted(null), 2000);
    return () => clearTimeout(clear);
  }, [targeted]);

  return (
    <>
      <div className="gallery-filters" role="tablist" aria-label="Filter work by type">
        {filters.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            className={`gallery-filter${filter === f ? ' is-active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {filtered.map((item) => (
          <GalleryCard key={item.slug} item={item} targeted={targeted === item.slug} />
        ))}
      </div>
    </>
  );
}
