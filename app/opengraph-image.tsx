import { ImageResponse } from 'next/og';
import { OgCard, ogContentType, ogSize } from '@/components/OgCard';
import { siteConfig } from '@/lib/site-config';

// Default social card, inherited by any route without its own.
export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${siteConfig.name} — ${siteConfig.role}`;

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Portfolio"
        title="UI/UX design, research, and multimedia work."
      />
    ),
    size
  );
}
