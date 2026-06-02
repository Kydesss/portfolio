// Table-of-contents helpers. Sections are derived from the <SectionLabel>
// eyebrows authored in each case study's MDX body.

export type TocSection = { id: string; label: string };

// Slug must match between server extraction (extractSections) and the
// SectionLabel component so anchors and hrefs line up.
export function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const SECTION_LABEL_RE = /<SectionLabel>([\s\S]*?)<\/SectionLabel>/g;

export function extractSections(content: string): TocSection[] {
  const sections: TocSection[] = [];
  const seen = new Set<string>();

  for (const match of content.matchAll(SECTION_LABEL_RE)) {
    const label = match[1].replace(/\s+/g, ' ').trim();
    if (!label) continue;
    let id = slugify(label);
    if (!id || seen.has(id)) continue;
    seen.add(id);
    sections.push({ id, label });
  }

  return sections;
}
