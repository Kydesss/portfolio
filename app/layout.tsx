import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Nav } from "@/components/Nav";
import DevAgentation from "@/components/DevAgentation";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.about.split("\n\n")[0],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
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
