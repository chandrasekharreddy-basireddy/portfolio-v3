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
    body: "I learn by making systems real. The value is not in the idea alone, but in the decisions that survive runtime, scale, and actual user behavior.",
  },
  {
    title: "Question the abstraction",
    body: "Libraries and frameworks are useful only when I understand what they hide. I want the system underneath to be legible, not mysterious.",
  },
  {
    title: "Keep the interface honest",
    body: "A good interface should be clear and predictable. If the state model is confusing, the product will fail before the user gets to the real problem.",
  },
  {
    title: "Iterate on what breaks",
    body: "I care about failure modes, edge cases, and revision. The best systems are not the ones that never break — they are the ones that teach you how to fix them well.",
  },
];

const facts = [
  { label: "Studying", value: "B.Tech Computer Science, Sai University" },
  { label: "Focus", value: "Backend systems · product thinking · interfaces" },
  { label: "Based in", value: "India" },
  { label: "Interested in", value: "System design · reliability · thoughtful UX" },
];

const focusAreas = [
  "backend systems and data flow",
  "real-time product behavior",
  "thoughtful interfaces and product tradeoffs",
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
          <p className={styles.leadSentence}>
            I care about software that stays honest under pressure: clear interfaces, reliable systems, and decisions that still feel right after the demo is over.
          </p>
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
          <div className={styles.focusWrap}>
            <p className={styles.focusLabel}>Current focus</p>
            <ul className={styles.focusList}>
              {focusAreas.map((area) => (
                <li key={area} className={styles.focusItem}>{area}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="reveal" style={{ transitionDelay: "340ms" }}>
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
        title="Three projects, three real questions"
        body="Each project started from a practical problem: how exam systems stay fair, how chat apps stay secure under pressure, and how real-time interfaces keep performance honest."
      >
        {projects.map((project, i) => (
          <ProjectPreview key={project.slug} project={project} flip={i % 2 === 1} />
        ))}
      </SectionHeading>

      {/* ---------- 03 working principles ---------- */}
      <SectionHeading
        id="principles"
        index="02"
        label="How I think"
        title="A systems-first engineering mindset"
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
        title="Tools I use in practice"
        body="This is organized around what I have actually built with, not just what looks good on a generic technology list."
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
        body="A direct record of where I am studying and what I have built so far, without adding any artificial polish to the story."
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
