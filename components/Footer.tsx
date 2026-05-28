import { siteConfig } from '@/lib/site-config';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <span>© {year} {siteConfig.name}</span>
      <span>Designed & built in {siteConfig.location}</span>
    </footer>
  );
}
