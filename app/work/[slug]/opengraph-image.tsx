import { ImageResponse } from 'next/og';
import { OgCard, ogContentType, ogSize } from '@/components/OgCard';
import { getAllWorkSlugs, getWorkBySlug } from '@/lib/content';

// Per-case-study social card.
export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'UX case study by Joaquin Pacia';

// Without this the route is server-rendered on demand, so every social scrape
// costs a function invocation. Enumerating the slugs prerenders one PNG each.
export function generateStaticParams() {
  return getAllWorkSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);

  return new ImageResponse(
    (
      <OgCard
        eyebrow="UX Case Study"
        title={work?.frontmatter.title ?? 'Case study'}
        footnote={work?.frontmatter.tag}
      />
    ),
    size
  );
}
