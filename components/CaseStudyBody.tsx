import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { WorkItem } from "@/lib/content";
import { extractSections } from "@/lib/toc";
import { mdxComponents } from "@/components/MDXComponents";
import { TableOfContents } from "@/components/TableOfContents";
import { StatValue } from "@/components/StatValue";
import { toEmbedUrl } from "@/lib/content";

/**
 * The written case study: hero, cover, MDX body, outcomes.
 *
 * Shared by two routes. A project with `flows` shows the work-first showcase at
 * /work/<slug> and renders this at /work/<slug>/process; a project without them
 * renders this directly at /work/<slug>.
 */
export function CaseStudyBody({
    work,
    backHref,
    backLabel,
}: {
    work: WorkItem;
    backHref: string;
    backLabel: string;
}) {
    const { frontmatter, content } = work;

    const sections = extractSections(content);
    if (frontmatter.outcomes && frontmatter.outcomes.length > 0) {
        sections.push({ id: "outcomes", label: "Outcomes" });
    }

    return (
        <>
            <TableOfContents sections={sections} />

            {/* Hero */}
            <section className="case-hero">
                <div className="container">
                    <Link href={backHref} className="back-link">
                        ← {backLabel}
                    </Link>
                    <p className="eyebrow">
                        Case Study {String(frontmatter.order).padStart(2, "0")}
                    </p>
                    <h1>{frontmatter.title}</h1>
                    <p className="case-summary">{frontmatter.summary}</p>
                    <div className="case-meta">
                        <div>
                            <span>Client</span>
                            <p>{frontmatter.client}</p>
                        </div>
                        <div>
                            <span>Role</span>
                            <p>{frontmatter.role}</p>
                        </div>
                        <div>
                            <span>Timeline</span>
                            <p>{frontmatter.timeline}</p>
                        </div>
                        <div>
                            <span>Year</span>
                            <p>{frontmatter.year}</p>
                        </div>
                    </div>
                    {frontmatter.tools && frontmatter.tools.length > 0 && (
                        <div className="case-tools">
                            <span>Tools &amp; methods</span>
                            <ul>
                                {frontmatter.tools.map((t) => (
                                    <li key={t}>{t}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </section>

            {/* Cover — video > image > placeholder */}
            {(() => {
                const embed = frontmatter.coverVideo
                    ? toEmbedUrl(frontmatter.coverVideo)
                    : null;
                if (embed) {
                    return (
                        <div className="case-cover case-cover--video">
                            <div className="case-cover-video">
                                <iframe
                                    src={embed}
                                    title={`${frontmatter.title} — video`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    );
                }
                return (
                    <div className="case-cover">
                        {frontmatter.cover ? (
                            <>
                                <div
                                    className="case-cover-blur"
                                    style={{
                                        backgroundImage: `url("${frontmatter.cover}")`,
                                    }}
                                />
                                <div
                                    className="case-cover-sharp"
                                    style={{
                                        backgroundImage: `url("${frontmatter.cover}")`,
                                    }}
                                />
                            </>
                        ) : (
                            <span className="case-cover-placeholder">
                                [HERO IMAGE]
                            </span>
                        )}
                    </div>
                );
            })()}

            {/* MDX body */}
            <div className="case-body">
                <div className="container-narrow">
                    <article className="prose">
                        <MDXRemote
                            source={content}
                            components={mdxComponents}
                            options={{
                                mdxOptions: {
                                    // GitHub-flavoured markdown, for pipe
                                    // tables in case studies. Note this
                                    // pipeline drops array/object literal
                                    // props on MDX components — pass data as
                                    // markdown or string props, not `{[...]}`.
                                    remarkPlugins: [remarkGfm],
                                },
                            }}
                        />
                    </article>

                    {/* Render outcomes from frontmatter, if present */}
                    {frontmatter.outcomes && frontmatter.outcomes.length > 0 && (
                        <>
                            <span className="section-label" id="outcomes">
                                Outcomes
                            </span>
                            <div className="outcomes-grid">
                                {frontmatter.outcomes.map((o, i) => (
                                    <div key={i} className="outcome-card">
                                        <div className="stat">
                                            <StatValue value={o.stat} />
                                        </div>
                                        <div className="desc">{o.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
