import Link from "next/link";
import type { Project } from "@/content/projects";
import { BrowserFrame } from "./BrowserFrame";
import { SurvivalSchoolVisual } from "./visuals/SurvivalSchoolVisual";
import { SignalLiteVisual } from "./visuals/SignalLiteVisual";
import { WorldVisual } from "./visuals/WorldVisual";
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
      <div className={`reveal ${styles.visualCol}`}>
        <ProjectVisual slug={project.slug} />
      </div>

      <div className={styles.textCol}>
        <div className="reveal">
          <p className={styles.index}>
            <span className={styles.indexNumber}>{project.index}</span>
            <span className={styles.indexMeta}>{project.year}</span>
          </p>
        </div>

        <div className="reveal" style={{ transitionDelay: "60ms" }}>
          <h3 className={styles.name}>
            <Link href={`/projects/${project.slug}`} className={styles.nameLink}>
              {project.name}
              <span className={styles.nameArrow} aria-hidden="true">→</span>
            </Link>
          </h3>
        </div>

        <div className="reveal" style={{ transitionDelay: "100ms" }}>
          <p className={styles.tagline}>{project.tagline}</p>
        </div>

        <div className="reveal" style={{ transitionDelay: "140ms" }}>
          <p className={styles.summary}>{project.summary}</p>
        </div>

        <div className="reveal" style={{ transitionDelay: "180ms" }}>
          <ul className={styles.stack} aria-label="Technology stack">
            {project.stack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>

        <div className="reveal" style={{ transitionDelay: "220ms" }}>
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
        </div>
      </div>
    </article>
  );
}
