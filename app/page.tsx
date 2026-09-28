import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { HeroDiagram } from "@/components/HeroDiagram";
import { ProjectPreview } from "@/components/ProjectPreview";
import { Reveal } from "@/components/Reveal";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { journey } from "@/content/journey";
import styles from "./home.module.css";

const principles = [
  {
    title: "Build to understand",
    body: "Reading about a system is a start; building a working version of it is where the actual learning happens. Every project on this page started as a question.",
  },
  {
    title: "Question the abstraction",
    body: "Frameworks are convenient until they're the reason something breaks. I'd rather know what the library is doing underneath than be surprised by it later.",
  },
  {
    title: "Keep the interface honest",
    body: "Good engineering should be understandable to the person using it — clear states, predictable behaviour, nothing that quietly fails.",
  },
  {
    title: "Fix what breaks",
    body: "Testing and iteration are part of building, not a phase after it. The bugs that survive are the ones nobody went looking for.",
  },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* ---------- hero ---------- */}
        <section className={`shell ${styles.hero}`}>
          <div className={styles.heroGrid}>
            <div>
              <Reveal>
                <p className="meta">
                  <span className={styles.heroMetaLine} aria-hidden="true" />
                  Computer Science student · Sai University · India
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h1 className={styles.heroTitle}>
                  I build software to understand how{" "}
                  <span className={styles.heroTitleAccent}>things actually work.</span>
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className={styles.heroIntro}>
                  I'm Chandra — a second-year Computer Science student at Sai
                  University. When I want to know how a system works, I build a
                  working version of it and let the hard parts teach me.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className={styles.heroActions}>
                  <a href="#work" className="button button--primary">
                    View selected work
                    <span className="button-arrow" aria-hidden="true">→</span>
                  </a>
                  <a href="#contact" className="button">
                    Get in touch
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={200} className={styles.heroAside}>
              <span className={`meta ${styles.heroAsideLabel}`}>
                The shape of my projects
              </span>
              <HeroDiagram />
            </Reveal>
          </div>
        </section>

        {/* ---------- about ---------- */}
        <SectionHeading
          id="about"
          index="01"
          label="About"
          title="The short version"
          body="I'm studying Computer Science at Sai University, and I learn primarily through building. I like understanding how systems work rather than only using abstractions — full-stack development, backend systems, data structures and algorithms, and interactive web experiences are where I spend most of my time."
        >
          <Reveal delay={160}>
            <div className={styles.aboutRow}>
              <img
                className={styles.aboutPhoto}
                src="portrait.jpg"
                alt="Portrait of Chandra Sekhar Reddy Basireddy"
                width={132}
                height={132}
                loading="lazy"
              />
              <dl className={styles.aboutFacts}>
                <div>
                  <dt>Studying</dt>
                  <dd>B.Tech Computer Science, Sai University</dd>
                </div>
                <div>
                  <dt>Year</dt>
                  <dd>Second year</dd>
                </div>
                <div>
                  <dt>Focus</dt>
                  <dd>Full-stack · Backend · DSA</dd>
                </div>
                <div>
                  <dt>Based in</dt>
                  <dd>India</dd>
                </div>
                <div>
                  <dt>Looking for</dt>
                  <dd>A software engineering internship</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </SectionHeading>

        {/* ---------- work ---------- */}
        <SectionHeading
          id="work"
          index="02"
          label="Selected work"
          title="Three projects, three questions"
          body="Each of these started as something I wanted to understand — how exam platforms score fairly, how chat apps stay secure, how 3D worlds hold a frame budget. Each is a full case study."
        >
          {projects.map((project, i) => (
            <ProjectPreview key={project.slug} project={project} flip={i % 2 === 1} />
          ))}
        </SectionHeading>

        {/* ---------- principles ---------- */}
        <SectionHeading
          id="principles"
          index="03"
          label="How I work"
          title="Four working principles"
        >
          <div className={styles.principles}>
            {principles.map((principle, i) => (
              <Reveal key={principle.title} delay={i * 60}>
                <div className={styles.principle}>
                  <span className={styles.principleNumber}>
                    0{i + 1}
                  </span>
                  <h3 className={styles.principleTitle}>{principle.title}</h3>
                  <p className={styles.principleBody}>{principle.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </SectionHeading>

        {/* ---------- engineering ---------- */}
        <SectionHeading
          id="engineering"
          index="04"
          label="Engineering"
          title="What I work with"
          body="Grouped by where I've actually used each of these — in the projects above, in coursework, or both."
        >
          <div className={styles.skills}>
            {skillGroups.map((group) => (
              <Reveal key={group.label}>
                <div className={styles.skillGroup}>
                  <span className={styles.skillGroupLabel}>{group.label}</span>
                  <ul className={styles.skillList}>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </SectionHeading>

        {/* ---------- journey ---------- */}
        <SectionHeading
          id="journey"
          index="05"
          label="Journey"
          title="How I got here"
          body="No invented work history — just an honest record of where I'm studying and what I've built along the way."
        >
          <div className={styles.timeline}>
            {journey.map((entry) => (
              <Reveal key={`${entry.period}-${entry.title}`}>
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
              </Reveal>
            ))}
          </div>
        </SectionHeading>

        {/* ---------- contact ---------- */}
        <section id="contact" className="section lede-grid section--ruled">
          <Reveal>
            <p className="lede-label">
              <em>06</em>Contact
            </p>
          </Reveal>
          <div className={styles.contact}>
            <Reveal delay={60}>
              <h2 className={styles.contactHeading}>Let's work together.</h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="lede-body" style={{ marginTop: "1.25rem" }}>
                I'm currently studying Computer Science at Sai University and
                looking for opportunities to work on real software engineering
                problems. The fastest way to reach me is email — I read
                everything.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <a href={`mailto:${site.email}`} className={styles.contactEmail}>
                {site.email}
              </a>
            </Reveal>
            <Reveal delay={240}>
              <div className={styles.contactLinks}>
                <a
                  href={site.github}
                  className="link link--external"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  href={site.linkedin}
                  className="link link--external"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <Link href="/work" className="link">
                  Browse the projects first
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
