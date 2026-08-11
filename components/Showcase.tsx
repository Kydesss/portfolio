import Link from "next/link";
import type { WorkItem } from "@/lib/content";
import { FlowGrid } from "@/components/FlowGrid";

/**
 * Work-first surface for a case study: what was built, then a way through to
 * how. Deliberately almost text-free — the flows are the argument, and the
 * written case study is one click away at the bottom.
 */
export function Showcase({ work, slug }: { work: WorkItem; slug: string }) {
    const { frontmatter } = work;
    const flows = frontmatter.flows ?? [];

    return (
        <>
            <section className="showcase-hero">
                <div className="container">
                    <Link href="/#work" className="back-link">
                        ← Back to work
                    </Link>
                    <div className="showcase-card">
                        <h1>{frontmatter.title}</h1>
                        <p className="showcase-summary">{frontmatter.summary}</p>
                        <p className="showcase-role">
                            {frontmatter.role} <span aria-hidden="true">//</span>{" "}
                            {frontmatter.timeline}, {frontmatter.year}
                        </p>
                    </div>
                </div>
            </section>

            <section className="showcase-flows">
                <div className="container">
                    <FlowGrid flows={flows} />
                </div>
            </section>

            <section className="showcase-cta">
                <div className="container-narrow">
                    <p className="showcase-cta-eyebrow">That was the what</p>
                    <h2>Here is the how.</h2>
                    <p className="showcase-cta-body">
                        The research behind these screens, the decisions that
                        shaped them, and what testing said about them.
                    </p>
                    <Link href={`/work/${slug}/process`} className="showcase-cta-link">
                        Read the case study <span className="arrow">→</span>
                    </Link>
                </div>
            </section>
        </>
    );
}
