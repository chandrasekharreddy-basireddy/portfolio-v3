import { ProjectPreview } from "@/components/ProjectPreview";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { journey } from "@/content/journey";
import styles from "./home.module.css";

const principles = [
  {
    title: "Build to understand",
    body: "Reading about a system is a start. Building a working version of it is where the actual learning happens, and every project on this page started as a question.",
  },
  {
    title: "Question the abstraction",
    body: "Frameworks are convenient until they're the reason something breaks. I'd rather know what the library is doing underneath than be surprised by it later.",
  },
  {
    title: "Keep the interface honest",
    body: "Good engineering should be understandable to the person using it. Clear states, predictable behaviour, nothing that quietly fails.",
  },
  {
    title: "Fix what breaks",
    body: "Testing and iteration are part of building, not a phase after it. The bugs that survive are the ones nobody went looking for.",
  },
];

const facts = [
  { label: "Studying", value: "B.Tech Computer Science, Sai University" },
  { label: "Focus", value: "Full-stack · Backend · DSA" },
  { label: "Based in", value: "India" },
  { label: "Looking for", value: "A software engineering internship" },
];

export default function HomePage() {
  return (
    <main id="main">
      {/* ---------- 01 hero ---------- */}
      <section className={`shell ${styles.hero}`}>
        <div className="reveal">
          <p className="meta">
            <span className={styles.heroMetaLine} aria-hidden="true" />
            Computer Science · Sai University · India
          </p>
        </div>

        <div className="reveal" style={{ transitionDelay: "80ms" }}>
          <h1 className={styles.heroTitle}>{site.heroLine}</h1>
        </div>

        <div className="reveal" style={{ transitionDelay: "160ms" }}>
          <p className={styles.heroSub}>{site.heroSub}</p>
        </div>

        <div className="reveal" style={{ transitionDelay: "220ms" }}>
          <dl className={styles.facts}>
            {facts.map((fact) => (
              <div key={fact.label} className={styles.fact}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="reveal" style={{ transitionDelay: "280ms" }}>
          <div className={styles.heroActions}>
            <a href="#work" className="button button--primary">
              View selected work
              <span className="button-arrow" aria-hidden="true">→</span>
            </a>
            <a href={`mailto:${site.email}`} className="button">
              Get in touch
            </a>
          </div>
        </div>
      </section>

      {/* ---------- 02 selected work ---------- */}
      <SectionHeading
        id="work"
        index="01"
        label="Selected work"
        title="Three projects, three questions"
        body="Each of these started as something I wanted to understand. How exam platforms score fairly, how chat apps stay secure, how 3D worlds hold a frame budget. Each one links to a full case study."
      >
        {projects.map((project, i) => (
          <ProjectPreview key={project.slug} project={project} flip={i % 2 === 1} />
        ))}
      </SectionHeading>

      {/* ---------- 03 working principles ---------- */}
      <SectionHeading
        id="principles"
        index="02"
        label="How I work"
        title="Four working principles"
      >
        <div className={styles.principles}>
          {principles.map((principle, i) => (
            <div key={principle.title} className="reveal" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className={styles.principle}>
                <span className={styles.principleNumber}>0{i + 1}</span>
                <h3 className={styles.principleTitle}>{principle.title}</h3>
                <p className={styles.principleBody}>{principle.body}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionHeading>

      {/* ---------- 04 skills ---------- */}
      <SectionHeading
        id="skills"
        index="03"
        label="Skills"
        title="What I work with"
        body="Grouped by where I've actually used each of these, in the projects above, in coursework, or both."
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

      {/* ---------- 05 timeline ---------- */}
      <SectionHeading
        id="timeline"
        index="04"
        label="Timeline"
        title="How I got here"
        body="No invented work history. This is an honest record of where I'm studying and what I've built along the way."
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
