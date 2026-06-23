'use client';

import { useMemo, useState } from 'react';
import { GALLERY_CATEGORIES, type GalleryItem } from '@/lib/gallery';

type Filter = 'All' | (typeof GALLERY_CATEGORIES)[number];

function GalleryCard({ item }: { item: GalleryItem }) {
  return (
    <div className="gallery-card">
      {item.image ? (
        // The whole image is shown (object-fit: contain) over a blurred fill of
        // itself, so portrait posters, square posts, and landscape thumbnails all
        // sit in the same card size without cropping. Clicking opens the Lightbox.
        <button
          type="button"
          className="gallery-card-media gallery-card-media--has-img"
          aria-label={`View full image: ${item.title}`}
        >
          <span
            className="gallery-card-media-blur"
            style={{ backgroundImage: `url("${item.image}")` }}
            aria-hidden="true"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.image} alt={item.title} loading="lazy" />
        </button>
      ) : (
        <div className="gallery-card-media">
          <span className="gallery-card-placeholder">{item.category}</span>
        </div>
      )}

      <div className="gallery-card-body">
        <div className="gallery-card-head">
          <h3>{item.title}</h3>
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
            {item.linkLabel ?? 'View'} <span className="arrow">→</span>
          </a>
        )}
      </div>
    </div>
  );
}

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<Filter>('All');

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
          <GalleryCard key={item.slug} item={item} />
        ))}
      </div>
    </>
  );
}
