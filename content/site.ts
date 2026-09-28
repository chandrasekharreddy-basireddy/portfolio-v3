export const site = {
  name: "Chandra Sekhar Reddy Basireddy",
  shortName: "Chandra",
  role: "Computer Science Student",
  university: "Sai University",
  email: "srinivasabasireddy06@gmail.com",
  github: "https://github.com/chandrasekharreddy-basireddy",
  linkedin:
    "https://www.linkedin.com/in/chandra-sekhar-reddy-basireddy-5733a2385",
  siteUrl: "https://chandrasekharreddy-basireddy.github.io/portfolio-v3",
  location: "India",
  availability: "Learning by building",
  heroLine: "I learn by building systems with real constraints.",
  heroSub:
    "I’m a second-year Computer Science student at Sai University, building software where architecture, tradeoffs, and product behavior matter as much as the visual polish.",
  buildNote:
    "Built with Next.js, TypeScript, and hand-written CSS. Deployed on GitHub Pages.",
} as const;

export type Site = typeof site;
