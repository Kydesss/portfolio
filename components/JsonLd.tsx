// Emits a schema.org JSON-LD block. Server-rendered, so crawlers that don't run
// JavaScript still see it.

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Escape '<' so a stray "</script>" inside content (a case-study summary,
      // a gallery description) can't close the element early.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
