import Link from 'next/link';
import type { Metadata } from 'next';
import { getGalleryItems } from '@/lib/gallery';
import { GalleryGrid } from '@/components/GalleryGrid';
import { Footer } from '@/components/Footer';
import { Lightbox } from '@/components/Lightbox';

export const metadata: Metadata = {
  title: 'Gallery — Joaquin Pacia',
  description:
    'Graphic design, video, multimedia, and code work beyond the UX case studies.',
};

export default function GalleryPage() {
  const items = getGalleryItems();

  return (
    <main id="main-content" tabIndex={-1}>
      <section className="gallery-hero">
        <div className="container">
          <Link href="/#work" className="back-link">
            ← Back to work
          </Link>
          <p className="eyebrow">Gallery</p>
          <h1>Beyond the case studies.</h1>
          <p className="gallery-intro">
            A wider look at what I make: graphic design, video, multimedia, and code.
            These are lighter than my UX case studies, just the work and a link to see it.
          </p>
        </div>
      </section>

      <section className="gallery-section">
        <div className="container">
          {items.length === 0 ? (
            <p style={{ padding: '2rem 0', color: 'var(--fg-muted)' }}>
              Nothing here yet. Add items to <code>lib/gallery.ts</code>.
            </p>
          ) : (
            <GalleryGrid items={items} />
          )}
        </div>
      </section>

      <Footer />
      <Lightbox />
    </main>
  );
}
