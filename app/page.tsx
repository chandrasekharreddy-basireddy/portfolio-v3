import { ProjectPreview } from "@/components/ProjectPreview";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { journey } from "@/content/journey";
import styles from "./home.module.css";

export default function HomePage() {
  return (
    <main id="main">
      <section className={`shell ${styles.hero}`}>
        <div className="reveal">
          <p className="meta">
            <span className={styles.heroMetaLine} aria-hidden="true" />
            Sai University · India
          </p>
        </div>

        <div className="reveal" style={{ transitionDelay: "80ms" }}>
          <h1 className={styles.heroTitle}>{site.heroLine}</h1>
        </div>

        <div className="reveal" style={{ transitionDelay: "160ms" }}>
          <p className={styles.heroSub}>{site.heroSub}</p>
        </div>

        <div className="reveal" style={{ transitionDelay: "220ms" }}>
          <div className={styles.heroActions}>
            <a href="#work" className="button button--primary">
              Browse projects
              <span className="button-arrow" aria-hidden="true">→</span>
            </a>
            <a href={`mailto:${site.email}`} className="button">
              Email me
            </a>
          </div>
        </div>
      </section>

      <SectionHeading
        id="work"
        index="01"
        label="Projects"
        title="Things I’ve been working on"
        body="A few diagrams explain what each project does. Open one for the details and source."
      >
        {projects.map((project, i) => (
          <ProjectPreview key={project.slug} project={project} flip={i % 2 === 1} />
        ))}
      </SectionHeading>

      <SectionHeading
        id="about"
        index="02"
        label="About"
        title="A little context"
        body="I’m studying computer science at Sai University. This site keeps track of what I’ve built and what I’m still figuring out."
      >
        <p className={styles.aboutNote}>
          Coursework takes up a lot of my time: C, Python, and data structures
          at the moment. Outside class, I’ve been making web apps and learning
          Three.js by turning this portfolio into a small world you can walk
          through.{" "}
          <a
            href="https://chandrasekharreddy-basireddy.github.io/portfolio-3d/"
            className="link link--external"
            target="_blank"
            rel="noopener noreferrer"
          >
            Take a look
          </a>
          . The projects here are at different stages; I’ve marked what’s live
          and what’s still in progress.
        </p>
      </SectionHeading>

      <SectionHeading
        id="skills"
        index="03"
        label="Skills"
        title="Tools I’ve used"
      >
        <div className={styles.skills}>
          {skillGroups.map((group) => (
            <div key={group.label} className="reveal">
              <div className={styles.skillGroup}>
                <span className={styles.skillGroupLabel}>{group.label}</span>
                <ul className={styles.skillList}>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </SectionHeading>

      <SectionHeading
        id="timeline"
        index="04"
        label="Timeline"
        title="School and projects"
      >
        <div className={styles.timeline}>
          {journey.map((entry) => (
            <div key={`${entry.period}-${entry.title}`} className="reveal">
              <div
                className={`${styles.timelineEntry} ${
                  entry.kind === "project" ? styles["timelineEntry--project"] : ""
                }`}
              >
                <span className={styles.timelinePeriod}>{entry.period}</span>
                <div>
                  <h3 className={styles.timelineTitle}>{entry.title}</h3>
                  <p className={styles.timelinePlace}>{entry.place}</p>
                  {entry.detail ? (
                    <p className={styles.timelineDetail}>{entry.detail}</p>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionHeading>
    </main>
  );
}
