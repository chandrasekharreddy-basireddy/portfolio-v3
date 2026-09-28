import Link from "next/link";
import { site } from "@/content/site";
import styles from "./Footer.module.css";

const sectionLinks = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#journey", label: "Journey" },
  { href: "/#contact", label: "Contact" },
] as const;

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`shell ${styles.inner}`}>
        <p className={styles.name}>{site.name}</p>

        <nav className={styles.links} aria-label="Footer">
          {sectionLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.sectionLink}>
              {link.label}
            </Link>
          ))}
          <a href={`mailto:${site.email}`}>Email</a>
          <a href={site.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </nav>

        <p className={styles.meta}>
          {site.location} · © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
