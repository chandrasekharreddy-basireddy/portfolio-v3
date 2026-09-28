export const site = {
  name: "Chandra Sekhar Reddy Basireddy",
  shortName: "Chandra",
  headerName: "Chandra Sekhar",
  role: "Computer Science Student",
  university: "Sai University",
  email: "srinivasabasireddy06@gmail.com",
  github: "https://github.com/chandrasekharreddy-basireddy",
  linkedin:
    "https://www.linkedin.com/in/chandra-sekhar-reddy-basireddy-5733a2385",
  siteUrl: "https://chandrasekharreddy-basireddy.github.io/portfolio-v3",
  location: "India",
  availability: "Open to software engineering internships",
  intro:
    "I'm a Computer Science student at Sai University. I learn by building — when I want to understand a system, I build a working version of it and let the hard parts teach me.",
  // Interests pulled from the projects and coursework on this site — kept short on purpose.
  exploring: ["Backend systems", "Interactive web", "Data structures & algorithms", "Automation tooling"],
} as const;

export type Site = typeof site;
