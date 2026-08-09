import { siteConfig } from '@/lib/site-config';

// Replaces the scrolling marquee.
//
// The marquee rendered all 29 tools twice — 58 icon requests to an external
// host — and listing Bootstrap and VS Code alongside Figma diluted the signal
// that actually matters. This renders only the tools flagged `core`, statically,
// with visible names so the strip is readable rather than a logo parade.

export function ToolsStrip() {
  const tools = siteConfig.tools.filter((t) => 'core' in t && t.core);
  if (tools.length === 0) return null;

  return (
    <div className="cv-block">
      <h3>Tools</h3>
      <ul className="tools-strip">
        {tools.map((tool) => (
          <li key={tool.name}>
            <img
              src={`https://api.iconify.design/${tool.icon.replace(':', '/')}.svg`}
              alt=""
              aria-hidden="true"
              loading="lazy"
              width={18}
              height={18}
            />
            {tool.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
