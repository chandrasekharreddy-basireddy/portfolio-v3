import Link from "next/link";
import type { Project } from "@/content/projects";
import { BrowserFrame } from "./BrowserFrame";
import { SurvivalSchoolVisual } from "./visuals/SurvivalSchoolVisual";
import { SignalLiteVisual } from "./visuals/SignalLiteVisual";
import { WorldVisual } from "./visuals/WorldVisual";
import { Reveal } from "./Reveal";
import styles from "./ProjectPreview.module.css";

function ProjectVisual({ slug }: { slug: string }) {
  if (slug === "survival-school") {
    return (
      <BrowserFrame url="survivalschool.vercel.app/exam/physics-unit-3">
        <SurvivalSchoolVisual />
      </BrowserFrame>
    );
  }
  if (slug === "signal-lite") {
    return (
      <BrowserFrame url="localhost:3000/#systems-study">
        <SignalLiteVisual />
      </BrowserFrame>
    );
  }
  return (
    <figure className={styles.worldFigure} aria-hidden="true">
      <WorldVisual />
    </figure>
  );
}

type ProjectPreviewProps = {
  project: Project;
  flip: boolean;
};

export function ProjectPreview({ project, flip }: ProjectPreviewProps) {
  return (
    <article className={`${styles.preview} ${flip ? styles.flipped : ""}`}>
      <Reveal className={styles.visualCol}>
        <ProjectVisual slug={project.slug} />
      </Reveal>

      <div className={styles.textCol}>
        <Reveal>
          <p className={styles.index}>
            <span className={styles.indexNumber}>{project.index}</span>
            <span className={styles.indexMeta}>{project.year}</span>
          </p>
        </Reveal>

        <Reveal delay={60}>
          <h3 className={styles.name}>
            <Link href={`/projects/${project.slug}`} className={styles.nameLink}>
              {project.name}
              <span className={styles.nameArrow} aria-hidden="true">→</span>
            </Link>
          </h3>
        </Reveal>

        <Reveal delay={100}>
          <p className={styles.tagline}>{project.tagline}</p>
        </Reveal>

        <Reveal delay={140}>
          <p className={styles.summary}>{project.summary}</p>
        </Reveal>

        <Reveal delay={180}>
          <ul className={styles.stack} aria-label="Technology stack">
            {project.stack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={220}>
          <div className={styles.links}>
            <Link
              href={`/projects/${project.slug}`}
              className="link"
            >
              Read the case study
            </Link>
            {project.links
              .filter((l) => l.kind === "live")
              .map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  className="link link--external"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {l.label}
                </a>
              ))}
            {project.links
              .filter((l) => l.kind === "source")
              .map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  className="link link--external"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source
                </a>
              ))}
          </div>
        </Reveal>
      </div>
    </article>
  );
}
