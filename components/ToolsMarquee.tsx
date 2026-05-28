import { siteConfig } from '@/lib/site-config';

export function ToolsMarquee() {
  const tools = siteConfig.tools;
  if (!tools || tools.length === 0) return null;

  const renderGroup = (keyPrefix: string) =>
    tools.map((tool, i) => (
      <div
        className="tool-chip"
        role="listitem"
        key={`${keyPrefix}-${tool.icon}-${i}`}
        title={tool.name}
        data-tool={tool.name}
      >
        <img
          src={`https://api.iconify.design/${tool.icon.replace(':', '/')}.svg`}
          alt={tool.name}
          loading="lazy"
          width={32}
          height={32}
        />
      </div>
    ));

  return (
    <section className="tools-marquee" aria-label="Tools I work with">
      <div className="container">
        <p className="tools-label">Experienced with</p>
      </div>
      <div className="tools-track-wrap">
        <div className="tools-track" role="list">
          <div className="tools-track-group" aria-hidden="false">{renderGroup('a')}</div>
          <div className="tools-track-group" aria-hidden="true">{renderGroup('b')}</div>
        </div>
      </div>
    </section>
  );
}
