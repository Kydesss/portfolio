import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Nav } from "@/components/Nav";
import DevAgentation from "@/components/DevAgentation";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/site-config";
import {
    siteDescription,
    siteGraph,
    siteKeywords,
    siteTitle,
    siteUrl,
} from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
    // Required for Open Graph and canonical URLs to resolve to absolute URLs.
    // Without it, social scrapers get relative paths and render no preview.
    metadataBase: new URL(siteUrl),
    title: {
        default: siteTitle,
        // Child pages set a bare title; the brand is appended here so it can't
        // drift page to page.
        template: `%s — ${siteConfig.name}`,
    },
    description: siteDescription,
    keywords: siteKeywords,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: siteUrl }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    // No canonical here on purpose: a value set in the layout is inherited by
    // every child that doesn't override it, which would point the whole site at
    // one URL. Each page declares its own.
    openGraph: {
        type: "website",
        siteName: siteConfig.name,
        locale: "en_CA",
        url: siteUrl,
        title: siteTitle,
        description: siteDescription,
    },
    twitter: {
        card: "summary_large_image",
        title: siteTitle,
        description: siteDescription,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            // Allow full-size image thumbnails and untruncated snippets in
            // results — both are opt-in and both help click-through.
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
    icons: { icon: "/favicon.ico" },
    category: "design",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en-CA" suppressHydrationWarning>
            <body>
                <JsonLd data={siteGraph()} />
                <ThemeProvider>
                    <a href="#main-content" className="skip-link">
                        Skip to content
                    </a>
                    <Nav />
                    {children}
                    <DevAgentation />
                </ThemeProvider>
            </body>
        </html>
    );
}
