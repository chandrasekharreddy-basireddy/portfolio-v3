export type SkillGroup = {
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Python", "C", "JavaScript", "TypeScript"],
  },
  {
    label: "Frontend",
    items: ["HTML", "CSS", "React", "Next.js", "Tailwind", "Three.js"],
  },
  {
    label: "Backend",
    items: ["FastAPI", "PostgreSQL", "Redis", "Docker"],
  },
  {
    label: "Tools",
    items: ["Git", "GitHub Actions", "Vercel", "Power BI", "n8n"],
  },
  {
    label: "CS Fundamentals",
    items: ["Data structures & algorithms", "Problem solving", "Systems understanding"],
  },
];
