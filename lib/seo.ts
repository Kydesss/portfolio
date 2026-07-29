// Single source of truth for anything a crawler or social scraper reads:
// the canonical origin, the default meta copy, and the JSON-LD graphs.
//
// Pages import from here rather than hand-rolling metadata, so canonical URLs
// and Open Graph tags can't drift apart between routes.

import { siteConfig } from "@/lib/site-config";

/**
 * Canonical production origin, no trailing slash.
 *
 * Order matters: an explicit env var wins, then Vercel's production domain
 * (which is the production host even on preview builds — canonicals should
 * always point at production, never at a preview URL), then the known domain.
 */
function resolveSiteUrl(): string {
    const explicit = process.env.NEXT_PUBLIC_SITE_URL;
    if (explicit) return explicit.replace(/\/+$/, "");
    const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL;
    if (vercelProd) return `https://${vercelProd.replace(/\/+$/, "")}`;
    return "https://joaquinpacia.com";
}

export const siteUrl = resolveSiteUrl();

/** Resolve a site-relative path against the canonical origin. */
export function absoluteUrl(path = "/"): string {
    return new URL(path, `${siteUrl}/`).toString();
}

/**
 * Default meta description. Deliberately not reused from siteConfig.about —
 * that copy is written for a human reading the page, this is written to be
 * legible in a search result: who, what, where, and what's on the site.
 */
export const siteDescription =
    `${siteConfig.name} is a UI/UX designer and multimedia producer in ` +
    `${siteConfig.location}. UX case studies covering research, usability ` +
    `testing, and interface design, plus graphic design, video, and code work.`;

export const siteTitle = `${siteConfig.name} — UI/UX Designer`;

/** Terms a recruiter or hiring manager would plausibly search. */
export const siteKeywords = [
    siteConfig.name,
    "UI/UX designer",
    "UX designer portfolio",
    "product designer",
    "UX case study",
    "usability testing",
    "user research",
    "interaction design",
    "multimedia producer",
    "Toronto UX designer",
    "Mississauga UX designer",
    "Figma designer",
];

/**
 * Fields every page's `openGraph` must repeat.
 *
 * Next's metadata merge replaces the parent `openGraph` object wholesale rather
 * than deep-merging it, so a page that sets its own title drops the layout's
 * siteName and locale. Spread this into each page's openGraph to keep them.
 */
export const ogBase = {
    siteName: siteConfig.name,
    locale: "en_CA",
} as const;

/* ───────────────────────── JSON-LD ───────────────────────── */

/** Stable @id for the Person node, so other nodes can reference it. */
export const personId = `${siteUrl}/#person`;
export const websiteId = `${siteUrl}/#website`;

export function personSchema() {
    return {
        "@type": "Person",
        "@id": personId,
        name: siteConfig.name,
        url: siteUrl,
        image: absoluteUrl("/me.jpg"),
        email: `mailto:${siteConfig.email}`,
        jobTitle: siteConfig.role,
        description: siteConfig.about.split("\n\n")[0].trim(),
        address: {
            "@type": "PostalAddress",
            addressLocality: "Mississauga",
            addressRegion: "ON",
            addressCountry: "CA",
        },
        alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "University of Toronto Mississauga",
        },
        knowsAbout: siteConfig.skills,
        sameAs: [siteConfig.linkedin, siteConfig.github],
    };
}

export function websiteSchema() {
    return {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: siteTitle,
        description: siteDescription,
        inLanguage: "en-CA",
        publisher: { "@id": personId },
    };
}

/** The site-wide graph, emitted once in the root layout. */
export function siteGraph() {
    return {
        "@context": "https://schema.org",
        "@graph": [personSchema(), websiteSchema()],
    };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
    return {
        "@type": "BreadcrumbList",
        itemListElement: trail.map((crumb, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: crumb.name,
            item: absoluteUrl(crumb.path),
        })),
    };
}
