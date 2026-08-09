// Server-rendered scannable blocks for MDX case studies.
//
// Everything here stays server-rendered on purpose: the text ships in the HTML,
// so it is indexable by crawlers and readable with JS off. <Accordion> uses a
// native <details>, which gives us open/close, keyboard support, and in-page
// find (browsers expand a collapsed <details> when the user searches inside it)
// without a line of JavaScript.

import { Fragment, type ReactNode } from 'react';

/**
 * Wrapper for a GitHub-flavoured markdown pipe table.
 *
 * Data lives in the MDX as a normal markdown table rather than as a prop: this
 * pipeline silently drops array and object literal props on MDX components
 * (string and JSX-expression props survive), so `rows={[[...]]}` arrives as
 * undefined. Authoring in markdown is nicer anyway.
 */
export function Table({
  caption,
  children,
}: {
  caption?: string;
  children: ReactNode;
}) {
  return (
    <figure className="case-table-wrap">
      {children}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/**
 * Four labelled lines at the top of a case study. A hiring manager reading only
 * this should be able to decide whether to keep going.
 */
export function TLDR({
  problem,
  approach,
  result,
  prototype,
  repo,
  figma,
}: {
  problem: string;
  approach: string;
  result: string;
  // Only string props — this pipeline drops every non-string attribute value,
  // including JSX expressions, so links are passed as plain URLs and rendered
  // here rather than handed in as markup.
  prototype?: string;
  repo?: string;
  figma?: string;
}) {
  const links = [
    prototype && { href: prototype, label: 'Live prototype' },
    figma && { href: figma, label: 'Figma file' },
    repo && { href: repo, label: 'Repository' },
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <aside className="tldr" aria-label="Summary">
      <p className="tldr-eyebrow">TL;DR</p>
      <dl>
        <div>
          <dt>Problem</dt>
          <dd>{problem}</dd>
        </div>
        <div>
          <dt>What I did</dt>
          <dd>{approach}</dd>
        </div>
        <div>
          <dt>Result</dt>
          <dd>{result}</dd>
        </div>
        {links.length > 0 && (
          <div>
            <dt>See it</dt>
            <dd>
              {links.map((link, i) => (
                <Fragment key={link.href}>
                  {i > 0 && ' · '}
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label} →
                  </a>
                </Fragment>
              ))}
            </dd>
          </div>
        )}
      </dl>
    </aside>
  );
}

/** Collapsed detail. The finding stays visible; the evidence is one click away. */
export function Accordion({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <details className="accordion">
      <summary>
        <span className="accordion-title">{title}</span>
        {note && <span className="accordion-note">{note}</span>}
        <span className="accordion-chevron" aria-hidden="true" />
      </summary>
      <div className="accordion-body">{children}</div>
    </details>
  );
}

/**
 * A numbered grid of findings. Replaces long bolded lists — the claim reads at a
 * glance, the evidence sits underneath in muted type.
 */
export function ProblemCards({ children }: { children: ReactNode }) {
  // Children are an ordered markdown list, one item per card, each written as
  // "**Claim.** Evidence." CSS turns the list into a grid and styles the
  // leading <strong> as the claim line, so authoring stays plain markdown.
  return <div className="problem-cards">{children}</div>;
}

/**
 * The business-impact block. Deliberately separates a modelled projection from
 * measured findings, and states the basis inline — an unlabelled projection in a
 * portfolio is the fastest way to lose a reviewer's trust.
 */
export function ImpactModel({
  headline,
  basis,
  disclaimer,
  children,
}: {
  headline: string;
  basis: string;
  disclaimer: string;
  children: ReactNode;
}) {
  // Children carry the working: a markdown table of the inputs, so a reader can
  // check the arithmetic rather than take the headline on faith.
  return (
    <aside className="impact" aria-label="Opportunity sizing">
      <p className="impact-eyebrow">{basis}</p>
      <p className="impact-headline">{headline}</p>
      <div className="impact-rows">{children}</div>
      <p className="impact-disclaimer">{disclaimer}</p>
    </aside>
  );
}
