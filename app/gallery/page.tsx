import Link from 'next/link';
import type { Metadata } from 'next';
import { getGalleryItems } from '@/lib/gallery';
import { GalleryGrid } from '@/components/GalleryGrid';
import { Footer } from '@/components/Footer';
import { Lightbox } from '@/components/Lightbox';
import { JsonLd } from '@/components/JsonLd';
import {
  absoluteUrl,
  breadcrumbSchema,
  ogBase,
  personId,
  websiteId,
} from '@/lib/seo';

// Kept short: the layout appends "— Joaquin Pacia", and Google truncates the
// whole thing around 60 characters.
const title = 'Gallery — Graphic Design, Video & Code';
const description =
  'Graphic design, video, multimedia, and code work by Joaquin Pacia, beyond the UX case studies: brand marks, posters, social campaigns, video production, and side projects.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/gallery' },
  openGraph: {
    ...ogBase,
    type: 'website',
    url: absoluteUrl('/gallery'),
    title,
    description,
  },
  twitter: { card: 'summary_large_image', title, description },
};

export default function GalleryPage() {
  const items = getGalleryItems();

  return (
    <main id="main-content" tabIndex={-1}>
      {/* One ItemList entry per card. Each points at the card's anchor, so a
          search result can deep-link straight to the item. */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'CollectionPage',
              url: absoluteUrl('/gallery'),
              name: title,
              description,
              inLanguage: 'en-CA',
              isPartOf: { '@id': websiteId },
              about: { '@id': personId },
              mainEntity: {
                '@type': 'ItemList',
                numberOfItems: items.length,
                itemListElement: items.map((item, i) => ({
                  '@type': 'ListItem',
                  position: i + 1,
                  item: {
                    '@type': 'CreativeWork',
                    name: item.title,
                    description: item.description,
                    url: absoluteUrl(`/gallery#${item.slug}`),
                    genre: item.category,
                    copyrightYear: item.year,
                    creator: { '@id': personId },
                    ...(item.tags && { keywords: item.tags }),
                    ...(item.image && { image: absoluteUrl(item.image) }),
                    ...(item.href && { sameAs: item.href }),
                  },
                })),
              },
            },
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Gallery', path: '/gallery' },
            ]),
          ],
        }}
      />
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
