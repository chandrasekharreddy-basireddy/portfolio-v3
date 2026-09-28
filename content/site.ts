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
  heroLine: "I'm Chandra. I study computer science and build things outside class.",
  heroSub:
    "I’m in my second year at Sai University. This site is where I keep the projects I’ve made so far, including a few that are still unfinished.",
  buildNote: "Thanks for taking a look.",
} as const;

export type Site = typeof site;
