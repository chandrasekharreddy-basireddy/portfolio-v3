import Link from "next/link";
import type { Project } from "@/content/projects";
import { ProjectSketch } from "./visuals/ProjectSketch";
import styles from "./ProjectPreview.module.css";

type ProjectPreviewProps = {
  project: Project;
  flip: boolean;
};

export function ProjectPreview({ project, flip }: ProjectPreviewProps) {
  return (
    <article className={`${styles.preview} ${flip ? styles.flipped : ""}`}>
      <div className={`reveal ${styles.visualCol}`}>
        <ProjectSketch slug={project.slug} name={project.name} />
      </div>

      <div className={styles.textCol}>
        <div className="reveal">
          <p className={styles.index}>
            <span className={styles.indexNumber}>{project.index}</span>
            <span className={styles.indexMeta}>{project.year}</span>
            <span className={styles.projectStatus} data-status={project.status}>
              {project.status}
            </span>
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
              More about this project
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
