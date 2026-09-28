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
    detail: "Coursework across programming, data structures and web development — most of it ends up applied somewhere in my projects. CGPA 9.33.",
    kind: "education",
  },
  {
    period: "2026",
    title: "Chandra's World",
    place: "Three.js · Interactive frontend",
    detail: "An explorable 3D portfolio world — my way of understanding character animation, scenes and real-time browser performance.",
    kind: "project",
  },
  {
    period: "2026",
    title: "Signal-Lite",
    place: "FastAPI · PostgreSQL · Redis · Next.js",
    detail: "A security-first messaging platform built to work out how real chat systems actually work — auth, tokens, WebSockets and all.",
    kind: "project",
  },
  {
    period: "2025 — 2026",
    title: "Survival School",
    place: "FastAPI · PostgreSQL · Redis · Next.js",
    detail: "A learning and assessment platform that started as a way to make exam practice less repetitive — and became an education in databases, auth and deployment.",
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
