import { notFound } from "next/navigation";
import Link from "next/link";
import {
    getAllWork,
    getWorkBySlug,
    getWorkLastModified,
} from "@/lib/content";
import { Footer } from "@/components/Footer";
import { Lightbox } from "@/components/Lightbox";
import { JsonLd } from "@/components/JsonLd";
import { CaseStudyBody } from "@/components/CaseStudyBody";
import {
    absoluteUrl,
    breadcrumbSchema,
    ogBase,
    personId,
    websiteId,
} from "@/lib/seo";
import type { Metadata } from "next";

type PageProps = {
    params: Promise<{ slug: string }>;
};

/**
 * Only projects with flows split into showcase + process. Everything else keeps
 * the written case study at /work/<slug>, so this route must not exist for them
 * — two URLs serving the same content would be a duplicate.
 */
export async function generateStaticParams() {
    return getAllWork()
        .filter((w) => (w.frontmatter.flows?.length ?? 0) > 0)
        .map((w) => ({ slug: w.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const work = getWorkBySlug(slug);
    if (!work) return {};

    const { frontmatter } = work;
    const path = `/work/${slug}/process`;
    const title = `${frontmatter.title} — UX Case Study`;
    const modified = getWorkLastModified(slug);

    return {
        title,
        description: frontmatter.summary,
        keywords: frontmatter.tag
            .split("·")
            .map((t) => t.trim())
            .filter(Boolean),
        alternates: { canonical: path },
        openGraph: {
            ...ogBase,
            type: "article",
            url: absoluteUrl(path),
            title,
            description: frontmatter.summary,
            modifiedTime: modified?.toISOString(),
            authors: [absoluteUrl("/")],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: frontmatter.summary,
        },
    };
}

export default async function ProcessPage({ params }: PageProps) {
    const { slug } = await params;
    const work = getWorkBySlug(slug);

    if (!work || (work.frontmatter.flows?.length ?? 0) === 0) notFound();

    const { frontmatter } = work;
    const path = `/work/${slug}/process`;
    const modified = getWorkLastModified(slug);

    return (
        <main id="main-content" tabIndex={-1}>
            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "CreativeWork",
                            "@id": `${absoluteUrl(path)}#case-study`,
                            url: absoluteUrl(path),
                            name: `${frontmatter.title} — case study`,
                            headline: frontmatter.title,
                            abstract: frontmatter.summary,
                            description: frontmatter.summary,
                            keywords: frontmatter.tag
                                .split("·")
                                .map((t) => t.trim())
                                .filter(Boolean),
                            inLanguage: "en-CA",
                            author: { "@id": personId },
                            creator: { "@id": personId },
                            copyrightYear: frontmatter.year,
                            ...(modified && {
                                dateModified: modified.toISOString(),
                            }),
                            ...(frontmatter.cover && {
                                image: absoluteUrl(frontmatter.cover),
                            }),
                            isPartOf: { "@id": websiteId },
                        },
                        breadcrumbSchema([
                            { name: "Home", path: "/" },
                            { name: "Work", path: "/#work" },
                            { name: frontmatter.title, path: `/work/${slug}` },
                            { name: "Case study", path },
                        ]),
                    ],
                }}
            />

            <CaseStudyBody
                work={work}
                backHref={`/work/${slug}`}
                backLabel="Back to the work"
            />

            <Link href={`/work/${slug}`} className="next-case">
                <div className="container">
                    <div className="next-label">Back to the work</div>
                    <div className="next-title">
                        <span>See the flows again</span>
                        <span className="arrow">→</span>
                    </div>
                </div>
            </Link>

            <Footer />
            <Lightbox />
        </main>
    );
}
