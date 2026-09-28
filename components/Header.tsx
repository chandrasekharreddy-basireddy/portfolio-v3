"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import styles from "./header.module.css";

const sections = ["work", "about", "skills", "timeline"] as const;
const sectionLabels: Record<(typeof sections)[number], string> = {
  work: "Work",
  about: "About",
  skills: "Skills",
  timeline: "Timeline",
};

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setActive(null);
      return;
    }

    const ids = sections
      .map((s) => document.getElementById(s))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5] }
    );

    ids.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>("a")?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`shell ${styles.inner}`}>
        <Link href="/" className={styles.wordmark} aria-label="Home">
          {site.name}
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {sections.map((section) => (
            <Link
              key={section}
              href={`/#${section}`}
              className={`${styles.navLink} ${
                active === section ? styles.navLinkActive : ""
              }`}
              aria-current={active === section ? "page" : undefined}
            >
              <span className={styles.navIndex}>
                0{sections.indexOf(section) + 1}
              </span>
              {sectionLabels[section]}
            </Link>
          ))}
        </nav>

        <a href={`mailto:${site.email}`} className={styles.status}>
          Email me
        </a>

        <button
          ref={toggleRef}
          type="button"
          className={styles.burger}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={styles.burgerBar} />
          <span className={styles.burgerBar} />
        </button>
      </div>

      <div
        id="mobile-navigation"
        ref={dialogRef}
        className={`${styles.mobileNav} ${menuOpen ? styles.mobileNavOpen : ""}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Site navigation"
      >
        <nav className={styles.mobileNavInner} aria-label="Primary mobile">
          {sections.map((section, i) => (
            <Link
              key={section}
              href={`/#${section}`}
              className={styles.mobileNavLink}
              onClick={() => setMenuOpen(false)}
              aria-current={active === section ? "page" : undefined}
            >
              <span className={styles.mobileNavIndex}>0{i + 1}</span>
              {sectionLabels[section]}
            </Link>
          ))}
        </nav>
        <a
          href={`mailto:${site.email}`}
          className={styles.mobileNavEmail}
          onClick={() => setMenuOpen(false)}
        >
          {site.email}
        </a>
      </div>
    </header>
  );
}
