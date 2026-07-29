// Inline monochrome icons for the gallery. Kept in one file so the grid stays
// readable and no runtime icon dependency is pulled in.
//
// Brand marks (YouTube, GitHub) are the official simple-icons paths. Everything
// else is a generic glyph — we only claim a brand when the host actually matches.

import type { GalleryCategory } from '@/lib/gallery';

/** Which service a gallery link points at, so the CTA can carry its logo. */
export type LinkKind = 'youtube' | 'github' | 'drive' | 'external';

export function linkKind(href: string): LinkKind {
  let host: string;
  try {
    host = new URL(href).hostname.replace(/^www\./, '');
  } catch {
    return 'external';
  }
  if (host === 'youtube.com' || host === 'youtu.be' || host.endsWith('.youtube.com')) {
    return 'youtube';
  }
  if (host === 'github.com' || host.endsWith('.github.io')) return 'github';
  if (host === 'drive.google.com' || host === 'docs.google.com') return 'drive';
  return 'external';
}

type IconProps = { className?: string };

function Svg({ children, className }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

function YouTubeIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </Svg>
  );
}

function GitHubIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </Svg>
  );
}

/** Generic document glyph — Drive links here are all PDF viewers, not the app. */
function DocumentIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2.5L17.5 9H13V4.5zM8 13h8v1.6H8V13zm0 3.4h8V18H8v-1.6z" />
    </Svg>
  );
}

function ExternalIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M13 3v2h4.6l-8.3 8.3 1.4 1.4L19 6.4V11h2V3h-8zM5 5h5V3H3v18h18v-7h-2v5H5V5z" />
    </Svg>
  );
}

export function LinkIcon({ kind, className }: { kind: LinkKind; className?: string }) {
  switch (kind) {
    case 'youtube':
      return <YouTubeIcon className={className} />;
    case 'github':
      return <GitHubIcon className={className} />;
    case 'drive':
      return <DocumentIcon className={className} />;
    default:
      return <ExternalIcon className={className} />;
  }
}

export function ZoomIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M10 2a8 8 0 1 0 4.9 14.32l5.39 5.39 1.41-1.42-5.38-5.38A8 8 0 0 0 10 2zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm-1 2v3H6v2h3v3h2v-3h3V9h-3V6H9z" />
    </Svg>
  );
}

/* Category glyphs, used as the cover art for items that have no image. */

function CodeGlyph() {
  return (
    <Svg className="gallery-card-cover-icon">
      <path d="M8.7 6.3 3 12l5.7 5.7 1.4-1.4L6.2 12l3.9-4.3-1.4-1.4zm6.6 0-1.4 1.4L17.8 12l-3.9 4.3 1.4 1.4L21 12l-5.7-5.7z" />
    </Svg>
  );
}

function VideoGlyph() {
  return (
    <Svg className="gallery-card-cover-icon">
      <path d="M4 5h11a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm15 4.5 3-2v9l-3-2v-5z" />
    </Svg>
  );
}

function MultimediaGlyph() {
  return (
    <Svg className="gallery-card-cover-icon">
      <path d="M12 2 2 7.5 12 13l10-5.5L12 2zM3.9 12.2 2 13.2l10 5.5 10-5.5-1.9-1L12 16.5l-8.1-4.3zm0 4.3-1.9 1L12 23l10-5.5-1.9-1L12 20.8l-8.1-4.3z" />
    </Svg>
  );
}

function GraphicGlyph() {
  return (
    <Svg className="gallery-card-cover-icon">
      <path d="M17.7 3.3a2.5 2.5 0 0 1 3.5 3.5l-1.6 1.6-3.5-3.5 1.6-1.6zM14.7 6.3l3.5 3.5-8.6 8.6-4.3.9.9-4.3 8.5-8.7zM3 20h18v2H3v-2z" />
    </Svg>
  );
}

export function CategoryGlyph({ category }: { category: GalleryCategory }) {
  switch (category) {
    case 'Code':
      return <CodeGlyph />;
    case 'Video':
      return <VideoGlyph />;
    case 'Multimedia':
      return <MultimediaGlyph />;
    default:
      return <GraphicGlyph />;
  }
}
