import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const WORK_DIR = path.join(process.cwd(), 'content', 'work');

export type WorkFrontmatter = {
  title: string;
  summary: string;
  client: string;
  role: string;
  timeline: string;
  year: string;
  tag: string;
  order: number;
  cover?: string;
  coverVideo?: string;
  outcomes?: { stat: string; desc: string }[];
  // Surfaced in the case-study hero. Answers "can this person build?" in the
  // first screen instead of leaving it buried in the body copy.
  tools?: string[];
  // Optional external links (live prototype, repo, Figma file).
  prototype?: string;
  // Frames cycled by the work-list thumbnail. Prefer images wider than they
  // are tall — the slot is 16:10 and crops from the centre.
  thumbnails?: string[];
};

// Normalize a YouTube/Vimeo URL into an embeddable src. Returns null if unrecognized.
export function toEmbedUrl(url: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, '');
    // YouTube: watch?v=ID, youtu.be/ID, shorts/ID, embed/ID
    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const v = u.searchParams.get('v');
      if (v) return `https://www.youtube.com/embed/${v}`;
      const m = u.pathname.match(/\/(shorts|embed)\/([\w-]+)/);
      if (m) return `https://www.youtube.com/embed/${m[2]}`;
    }
    if (host === 'youtu.be') {
      const id = u.pathname.slice(1);
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    // Vimeo: vimeo.com/ID
    if (host === 'vimeo.com') {
      const id = u.pathname.split('/').filter(Boolean)[0];
      if (id) return `https://player.vimeo.com/video/${id}`;
    }
  } catch {
    return null;
  }
  return null;
}

/** YouTube/Vimeo video id from a watch URL, or null if unrecognized. */
function videoId(url: string): { host: 'youtube' | 'vimeo'; id: string } | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, '');
    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const v = u.searchParams.get('v');
      if (v) return { host: 'youtube', id: v };
      const m = u.pathname.match(/\/(shorts|embed)\/([\w-]+)/);
      if (m) return { host: 'youtube', id: m[2] };
    }
    if (host === 'youtu.be') {
      const id = u.pathname.slice(1);
      if (id) return { host: 'youtube', id };
    }
    if (host === 'vimeo.com') {
      const id = u.pathname.split('/').filter(Boolean)[0];
      if (id) return { host: 'vimeo', id };
    }
  } catch {
    return null;
  }
  return null;
}

/**
 * Still image for a work item: its cover if it has one, otherwise the poster
 * frame of its cover video. Without this a video-cover case study shows no
 * thumbnail at all in the work list.
 *
 * hqdefault rather than maxresdefault — the latter 404s for plenty of videos.
 * Vimeo has no equivalent URL pattern (it needs an API call), so those fall
 * through to null and the caller renders its own placeholder.
 */
export function getWorkThumbnail(fm: WorkFrontmatter): string | null {
  if (fm.cover) return fm.cover;
  if (!fm.coverVideo) return null;
  const video = videoId(fm.coverVideo);
  if (video?.host === 'youtube') {
    return `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
  }
  return null;
}

/**
 * Frames for the work-list thumbnail carousel.
 *
 * A single cover only ever shows one crop, and these projects run to six or
 * more screens — so `thumbnails` in frontmatter lists what to cycle through.
 * Falls back to the single cover (or video poster) when it isn't set.
 */
export function getWorkThumbnails(fm: WorkFrontmatter): string[] {
  if (fm.thumbnails && fm.thumbnails.length > 0) return fm.thumbnails;
  const single = getWorkThumbnail(fm);
  return single ? [single] : [];
}

export type WorkItem = {
  slug: string;
  frontmatter: WorkFrontmatter;
  content: string;
};

export function getAllWorkSlugs(): string[] {
  if (!fs.existsSync(WORK_DIR)) return [];
  return fs
    .readdirSync(WORK_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export function getWorkBySlug(slug: string): WorkItem | null {
  const filePath = path.join(WORK_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  return {
    slug,
    frontmatter: data as WorkFrontmatter,
    content,
  };
}

/**
 * Last-modified time of a case study's source file, for sitemap `lastmod` and
 * schema.org `dateModified`. Uses the real file mtime rather than a hand-kept
 * frontmatter date, so it can't go stale. Returns null if the file is missing.
 */
export function getWorkLastModified(slug: string): Date | null {
  const filePath = path.join(WORK_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return fs.statSync(filePath).mtime;
}

export function getAllWork(): WorkItem[] {
  return getAllWorkSlugs()
    .map((slug) => getWorkBySlug(slug))
    .filter((w): w is WorkItem => w !== null)
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

export function getAdjacentWork(slug: string): { prev: WorkItem | null; next: WorkItem | null } {
  const all = getAllWork();
  const idx = all.findIndex((w) => w.slug === slug);
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}
