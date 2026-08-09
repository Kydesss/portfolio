import Link from 'next/link';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { getAllWork, getWorkThumbnails } from '@/lib/content';
import { WorkThumb } from '@/components/WorkThumb';
import { Footer } from '@/components/Footer';
import { ToolsStrip } from '@/components/ToolsStrip';
import { JsonLd } from '@/components/JsonLd';
import { absoluteUrl, ogBase, personId, siteDescription, siteTitle } from '@/lib/seo';

export const metadata: Metadata = {
  // `absolute` so the home page isn't titled "Joaquin Pacia — Joaquin Pacia"
  // by the layout's title template.
  title: { absolute: siteTitle },
  description: siteDescription,
  alternates: { canonical: '/' },
  openGraph: {
    ...ogBase,
    type: 'website',
    url: absoluteUrl('/'),
    title: siteTitle,
    description: siteDescription,
  },
};

// Render headline with *italic* segments
function renderHeadline(text: string) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return <span key={i}>{part}</span>;
  });
}

export default function HomePage() {
  const work = getAllWork();
  const years =
    work.length > 0
      ? `${Math.min(...work.map((w) => parseInt(w.frontmatter.year)))} — ${Math.max(...work.map((w) => parseInt(w.frontmatter.year)))}`
      : new Date().getFullYear().toString();

  return (
    <main id="main-content" tabIndex={-1}>
      {/* Marks this as the canonical page about Joaquin (the Person node lives in
          the root layout's graph) and lists the case studies it links out to. */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          url: absoluteUrl('/'),
          name: siteTitle,
          description: siteDescription,
          mainEntity: { '@id': personId },
          about: { '@id': personId },
          inLanguage: 'en-CA',
          hasPart: work.map((w) => ({
            '@type': 'CreativeWork',
            name: w.frontmatter.title,
            abstract: w.frontmatter.summary,
            url: absoluteUrl(`/work/${w.slug}`),
            author: { '@id': personId },
          })),
        }}
      />

      {/* Hero */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-text">
            <p className="eyebrow reveal">{siteConfig.role}</p>
            <h1 className="reveal">{renderHeadline(siteConfig.headline)}</h1>
            <p className="hero-subhead reveal">{siteConfig.subhead}</p>
            <div className="hero-meta reveal">
              <div>Based in <span>{siteConfig.location}</span></div>
              <div>Available <span>{siteConfig.status}</span></div>
              <div>Latest <span>{siteConfig.currently}</span></div>
            </div>
          </div>
          <img
            src="/me.jpg"
            alt={`Portrait of ${siteConfig.name}`}
            className="hero-portrait reveal"
            width={420}
            height={560}
          />
        </div>
      </section>

      {/* Work */}
      <section id="work">
        <div className="container">
          <div className="section-head">
            <h2>Selected work</h2>
            <span className="index">{years}</span>
          </div>
          <div className="work-list">
            {work.length === 0 && (
              <p style={{ padding: '2rem 0', color: 'var(--fg-muted)' }}>
                No case studies yet. Add <code>.mdx</code> files to <code>content/work/</code> to get started.
              </p>
            )}
            {work.map((w, i) => (
              <Link key={w.slug} href={`/work/${w.slug}`} className="work-item">
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                {/* A design portfolio whose work list has no pictures of the
                    work gives a scanning reader nothing to catch. */}
                <WorkThumb
                  images={getWorkThumbnails(w.frontmatter)}
                  row={i}
                  fallback={w.frontmatter.year}
                />
                <span className="work-body">
                  <span className="title">{w.frontmatter.title}</span>
                  <span className="work-summary">{w.frontmatter.summary}</span>
                  {w.frontmatter.outcomes && w.frontmatter.outcomes.length > 0 && (
                    <span className="work-stats">
                      {w.frontmatter.outcomes.slice(0, 2).map((o, oi) => (
                        <span key={oi} className="work-stat">
                          {/* First sentence only. Splitting on commas too used
                              to cut mid-citation, e.g. "(Chorostil & Ranger". */}
                          <b>{o.stat}</b> {o.desc.split(/(?<=\.)\s|\s—\s/)[0]}
                        </span>
                      ))}
                    </span>
                  )}
                </span>
                <span className="tag">{w.frontmatter.tag}</span>
                <span className="arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-grid">
            <h2>About</h2>
            <div className="about-bio">
              {siteConfig.about.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CV */}
      <section className="cv">
        <div className="container">
          <div className="cv-block">
            <h3>Experience</h3>
            <div>
              {siteConfig.experience.map((entry, i) => (
                <div key={i} className="cv-entry">
                  <span className="year">{entry.year}</span>
                  <div>
                    <div className="role">{entry.role}</div>
                    <div className="org">{entry.org}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cv-block">
            <h3>Education</h3>
            <div>
              {siteConfig.education.map((entry, i) => (
                <div key={i} className="cv-entry">
                  <span className="year">{entry.year}</span>
                  <div>
                    <div className="role">{entry.role}</div>
                    <div className="org">{entry.org}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cv-block">
            <h3>Skills</h3>
            <ul className="skills-list">
              {siteConfig.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>

          <ToolsStrip />

          {siteConfig.recognition.length > 0 && (
            <div className="cv-block">
              <h3>Recognition</h3>
              <div>
                {siteConfig.recognition.map((entry, i) => (
                  <div key={i} className="cv-entry">
                    <span className="year">{entry.year}</span>
                    <div>
                      <div className="role">{entry.role}</div>
                      <div className="org">{entry.org}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact">
        <div className="container-narrow">
          <h2>Let&rsquo;s make something worth using.</h2>
          <div className="contact-links">
            <a className="contact-link" href={`mailto:${siteConfig.email}`}>Email →</a>
            <a className="contact-link" href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn →</a>
            <a className="contact-link" href={siteConfig.github} target="_blank" rel="noopener noreferrer">GitHub →</a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
