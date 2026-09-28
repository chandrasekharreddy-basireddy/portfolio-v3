import { site } from "@/content/site";
import { Reveal } from "./Reveal";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`shell ${styles.contact}`}>
        <Reveal>
          <p className={styles.label}>
            <span className={styles.labelRule} aria-hidden="true" />
            Contact
          </p>
        </Reveal>
        <Reveal delay={60}>
          <p className={styles.statement}>
            If something here catches your eye, email me.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <a href={`mailto:${site.email}`} className={styles.email}>
            {site.email}
          </a>
        </Reveal>
        <Reveal delay={180}>
          <nav className={styles.links} aria-label="Contact and profiles">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </nav>
        </Reveal>
      </div>

      <div className={`shell ${styles.inner}`}>
        <p className={styles.name}>{site.name}</p>
        <p className={styles.buildNote}>{site.buildNote}</p>
        <p className={styles.meta}>
          {site.location} · © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
