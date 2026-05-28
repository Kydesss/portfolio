import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllWorkSlugs, getWorkBySlug, getAdjacentWork, toEmbedUrl } from "@/lib/content";
import { mdxComponents } from "@/components/MDXComponents";
import { Footer } from "@/components/Footer";
import { Lightbox } from "@/components/Lightbox";
import type { Metadata } from "next";

type PageProps = {
    params: { slug: string };
};

export async function generateStaticParams() {
    return getAllWorkSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = params;
    const work = getWorkBySlug(slug);
    if (!work) return {};
    return {
        title: `${work.frontmatter.title} — Case Study`,
        description: work.frontmatter.summary,
    };
}

export default async function CaseStudyPage({ params }: PageProps) {
    const { slug } = params;
    const work = getWorkBySlug(slug);

    if (!work) notFound();

    const { prev, next } = getAdjacentWork(slug);
    const { frontmatter, content } = work;
    const idx = getAllWorkSlugs().sort().indexOf(slug);

    return (
        <main id="main-content" tabIndex={-1}>
            {/* Hero */}
            <section className="case-hero">
                <div className="container">
                    <Link href="/#work" className="back-link">
                        ← Back to work
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
                                    style={{ backgroundImage: `url("${frontmatter.cover}")` }}
                                />
                                <div
                                    className="case-cover-sharp"
                                    style={{ backgroundImage: `url("${frontmatter.cover}")` }}
                                />
                            </>
                        ) : (
                            <span className="case-cover-placeholder">[HERO IMAGE]</span>
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
                        />
                    </article>

                    {/* Render outcomes from frontmatter, if present */}
                    {frontmatter.outcomes &&
                        frontmatter.outcomes.length > 0 && (
                            <>
                                <span className="section-label">Outcomes</span>
                                <div className="outcomes-grid">
                                    {frontmatter.outcomes.map((o, i) => (
                                        <div key={i} className="outcome-card">
                                            <div className="stat">{o.stat}</div>
                                            <div className="desc">{o.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                </div>
            </div>

            {/* Next case */}
            {next ? (
                <Link href={`/work/${next.slug}`} className="next-case">
                    <div className="container">
                        <div className="next-label">Next case study</div>
                        <div className="next-title">
                            <span>{next.frontmatter.title}</span>
                            <span className="arrow">→</span>
                        </div>
                    </div>
                </Link>
            ) : (
                <Link href="/#work" className="next-case">
                    <div className="container">
                        <div className="next-label">Back to all work</div>
                        <div className="next-title">
                            <span>See more projects</span>
                            <span className="arrow">→</span>
                        </div>
                    </div>
                </Link>
            )}

            <Footer />
            <Lightbox />
        </main>
    );
}
