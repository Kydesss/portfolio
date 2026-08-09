import type { MDXComponents } from 'mdx/types';
import { slugify } from '@/lib/toc';
import { Compare } from '@/components/Compare';
import { StatValue } from '@/components/StatValue';
import {
  Accordion,
  Decision,
  ImpactModel,
  ProblemCards,
  Result,
  ResultGrid,
  Stat,
  StatGrid,
  Table,
  TLDR,
} from '@/components/CaseBlocks';

// ───── Custom components usable inside MDX files ─────

export function Outcomes({ items }: { items: { stat: string; desc: string }[] }) {
  return (
    <div className="outcomes-grid">
      {items.map((item, i) => (
        <div key={i} className="outcome-card">
          <div className="stat">
            <StatValue value={item.stat} />
          </div>
          <div className="desc">{item.desc}</div>
        </div>
      ))}
    </div>
  );
}

export function Figure({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="figure">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  const id = typeof children === 'string' ? slugify(children) : undefined;
  return (
    <span className="section-label" id={id}>
      {children}
    </span>
  );
}

// Merge defaults so MDX-authored `<Outcomes />`, `<Figure />`, etc. all resolve.
export const mdxComponents: MDXComponents = {
  Outcomes,
  Figure,
  SectionLabel,
  TLDR,
  Accordion,
  ProblemCards,
  ImpactModel,
  Table,
  Compare,
  StatGrid,
  Stat,
  Decision,
  ResultGrid,
  Result,
};
