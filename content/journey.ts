export type JourneyEntry = {
  period: string;
  title: string;
  place: string;
  detail?: string;
  kind: "education" | "project";
};

export const journey: JourneyEntry[] = [
  {
    period: "2024 — Present",
    title: "B.Tech Computer Science",
    place: "Sai University",
    detail: "Focused on systems, data structures, backend engineering, and product-minded web development. CGPA: 9.33.",
    kind: "education",
  },
  {
    period: "2026",
    title: "Chandra's World",
    place: "Three.js · Interactive frontend",
    detail: "Built a walkable 3D portfolio world to understand scene composition, animation, frame-budgeting, and real-time browser performance.",
    kind: "project",
  },
  {
    period: "2026",
    title: "Signal-Lite",
    place: "FastAPI · PostgreSQL · Redis · Next.js",
    detail: "Designed a security-first messaging platform around auth, refresh-token rotation, authorization, and reliable realtime delivery.",
    kind: "project",
  },
  {
    period: "2025 — 2026",
    title: "Survival School",
    place: "FastAPI · PostgreSQL · Redis · Next.js",
    detail: "Built a learning and assessment platform modeled on real course workflows, with a strong focus on scoring integrity and deployment reality.",
    kind: "project",
  },
  {
    period: "Class XII",
    title: "Bhashyam Junior College",
    place: "975 / 1000",
    kind: "education",
  },
  {
    period: "Class X",
    title: "Bhashyam High School",
    place: "560 / 600",
    kind: "education",
  },
];
