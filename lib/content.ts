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
