import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { projects, getProject } from "@/content/projects";
import { site } from "@/content/site";
import styles from "./project.module.css";

type ProjectPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: `${project.name} — Project`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.name} — Chandra Sekhar Reddy Basireddy`,
      description: project.tagline,
      url: `/projects/${project.slug}`,
      type: "article",
    },
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      <Header />
      <main>
        {/* ---------- project header ---------- */}
        <section className={`shell ${styles.header}`}>
          <Link href="/#work" className={styles.backLink}>
            ← All work
          </Link>

          <Reveal>
            <p className={styles.index}>
              <span className={styles.indexNumber}>Project {project.index}</span>
              <span className={styles.indexMeta}>{project.year}</span>
            </p>
          </Reveal>

          <Reveal delay={60}>
            <h1 className={styles.title}>{project.name}</h1>
          </Reveal>

          <Reveal delay={120}>
            <p className={styles.tagline}>{project.tagline}</p>
          </Reveal>

          <Reveal delay={180}>
            <div className={styles.metaGrid}>
              <div>
                <h2 className={styles.metaLabel}>Status</h2>
                <p className={styles.metaValue}>{project.status}</p>
              </div>
              <div>
                <h2 className={styles.metaLabel}>Stack</h2>
                <p className={styles.metaValue}>{project.stack.join(" · ")}</p>
              </div>
              <div>
                <h2 className={styles.metaLabel}>Links</h2>
                <p className={styles.metaValue}>
                  {project.links.map((link, i) => (
                    <span key={link.url}>
                      {i > 0 && (
                        <span className={styles.linkDivider}> · </span>
                      )}
                      <a
                        href={link.url}
                        className="link link--external"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ---------- overview ---------- */}
        <section className={`shell section ${styles.overview}`}>
          <Reveal>
            <p className="lede-label">
              <em>{project.index}</em>Overview
            </p>
          </Reveal>
          <Reveal delay={60}>
            <p className={styles.overviewBody}>{project.overview}</p>
          </Reveal>
        </section>

        {/* ---------- problem & approach ---------- */}
        <section className={`shell section ${styles.duoGrid}`}>
          <Reveal>
            <div>
              <h2 className={styles.subHeading}>Problem</h2>
              <p className={styles.subBody}>{project.problem}</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div>
              <h2 className={styles.subHeading}>Approach</h2>
              <p className={styles.subBody}>{project.approach}</p>
            </div>
          </Reveal>
        </section>

        {/* ---------- implementation ---------- */}
        <section className={`shell section ${styles.implementation}`}>
          <Reveal>
            <p className="lede-label">
              <em>{project.index}</em>Implementation
            </p>
          </Reveal>
          <div className={styles.implementationList}>
            {project.implementation.map((note, i) => (
              <Reveal key={note.heading} delay={i * 40}>
                <div className={styles.implementationNote}>
                  <h3 className={styles.noteHeading}>{note.heading}</h3>
                  <p className={styles.noteBody}>{note.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------- decisions ---------- */}
        <section className={`shell section ${styles.decisions}`}>
          <Reveal>
            <p className="lede-label">
              <em>{project.index}</em>Engineering decisions
            </p>
          </Reveal>
          <div className={styles.decisionsGrid}>
            {project.decisions.map((decision, i) => (
              <Reveal key={decision.title} delay={i * 60}>
                <div className={styles.decision}>
                  <h3 className={styles.decisionTitle}>{decision.title}</h3>
                  <p className={styles.decisionBody}>{decision.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------- challenges & lessons ---------- */}
        <section className={`shell section ${styles.duoGrid}`}>
          <Reveal>
            <div>
              <h2 className={styles.subHeading}>Challenges</h2>
              <div className={styles.challengeList}>
                {project.challenges.map((challenge) => (
                  <div key={challenge.heading} className={styles.challenge}>
                    <h3 className={styles.noteHeading}>{challenge.heading}</h3>
                    <p className={styles.noteBody}>{challenge.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div>
              <h2 className={styles.subHeading}>What I learned</h2>
              <ul className={styles.lessonList}>
                {project.lessons.map((lesson) => (
                  <li key={lesson}>{lesson}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        {/* ---------- next project ---------- */}
        <section className={`shell section ${styles.next}`}>
          <Reveal>
            <p className="lede-label">
              <em>→</em>Next project
            </p>
          </Reveal>
          <Reveal delay={60}>
            <Link href={`/projects/${nextProject.slug}`} className={styles.nextLink}>
              <span className={styles.nextIndex}>{nextProject.index}</span>
              <span className={styles.nextName}>{nextProject.name}</span>
              <span className={styles.nextTagline}>{nextProject.tagline}</span>
            </Link>
          </Reveal>
        </section>

        {/* ---------- contact footer band ---------- */}
        <section className={`shell section ${styles.contactBand}`}>
          <Reveal>
            <h2 className={styles.contactHeading}>Building something similar?</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className={styles.contactBody}>
              I'd be glad to talk about any of this — the details, the
              trade-offs, or the parts that didn't work.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <a href={`mailto:${site.email}`} className={styles.contactEmail}>
              {site.email}
            </a>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
