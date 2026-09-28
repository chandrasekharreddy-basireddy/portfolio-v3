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
  availability: "Open to software engineering internships",
  heroLine: "I build software to understand how systems really work.",
  heroSub:
    "I'm a second-year Computer Science student at Sai University. I learn by building working versions of systems rather than stopping at abstractions.",
  buildNote:
    "Built with Next.js, TypeScript and hand-written CSS. Deployed on GitHub Pages.",
} as const;

export type Site = typeof site;
