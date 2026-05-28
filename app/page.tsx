import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';
import { getAllWork } from '@/lib/content';
import { Footer } from '@/components/Footer';
import { ToolsMarquee } from '@/components/ToolsMarquee';

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
      {/* Hero */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-text">
            <p className="eyebrow reveal">{siteConfig.role}</p>
            <h1 className="reveal">{renderHeadline(siteConfig.headline)}</h1>
            <div className="hero-meta reveal">
              <div>Based in <span>{siteConfig.location}</span></div>
              <div>Available <span>{siteConfig.status}</span></div>
              <div>Currently <span>{siteConfig.currently}</span></div>
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

      <ToolsMarquee />

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
                <span className="title">{w.frontmatter.title}</span>
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
