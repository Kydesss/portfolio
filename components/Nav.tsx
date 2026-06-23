import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';
import { ThemeToggle } from './ThemeToggle';

export function Nav() {
  return (
    <nav className="nav">
      <Link href="/" className="nav-name">{siteConfig.name}</Link>
      <div className="nav-right">
        <ul className="nav-links">
          <li><Link href="/#work">Work</Link></li>
          <li><Link href="/gallery">Gallery</Link></li>
          <li><Link href="/#about">About</Link></li>
          <li><Link href="/#contact">Contact</Link></li>
        </ul>
        <ThemeToggle />
      </div>
    </nav>
  );
}
