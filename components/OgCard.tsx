// Shared layout for the generated Open Graph cards (1200x630).
//
// Rendered by next/og's ImageResponse at build time, which supports only a
// subset of CSS — flexbox, no grid, no external stylesheets — so everything here
// is inline and flex-based. Colors are hardcoded rather than read from CSS
// variables for the same reason.

import { siteConfig } from '@/lib/site-config';

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

const BG = '#0a0a0a';
const FG = '#f5f5f5';
const MUTED = '#8a8a8a';
const LINE = '#232323';

/** Long case-study titles need to step down or they overflow the card. */
function titleSize(title: string): number {
  if (title.length > 52) return 60;
  if (title.length > 34) return 72;
  return 88;
}

export function OgCard({
  eyebrow,
  title,
  footnote,
}: {
  eyebrow: string;
  title: string;
  footnote?: string;
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: BG,
        color: FG,
        padding: '72px 80px',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 24,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: MUTED,
        }}
      >
        {eyebrow}
      </div>

      <div
        style={{
          display: 'flex',
          fontSize: titleSize(title),
          fontWeight: 600,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          // Leave room for the eyebrow and footer rows.
          maxHeight: 340,
          overflow: 'hidden',
        }}
      >
        {title}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          borderTop: `1px solid ${LINE}`,
          paddingTop: 28,
          fontSize: 28,
        }}
      >
        <div style={{ display: 'flex', fontWeight: 600 }}>{siteConfig.name}</div>
        <div style={{ display: 'flex', color: MUTED, fontSize: 24 }}>
          {footnote ?? siteConfig.role}
        </div>
      </div>
    </div>
  );
}
