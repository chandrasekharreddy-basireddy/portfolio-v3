export type JourneyEntry = {
  period: string;
  title: string;
  place: string;
  detail?: string;
  kind: "education" | "project";
};

export const journey: JourneyEntry[] = [
  {
    period: "Class X",
    title: "Bhashyam High School",
    place: "560 / 600",
    kind: "education",
  },
  {
    period: "Class XII",
    title: "Bhashyam Junior College",
    place: "975 / 1000",
    kind: "education",
  },
  {
    period: "2024 — Present",
    title: "B.Tech Computer Science",
    place: "Sai University",
    detail: "B.Tech Computer Science student. CGPA: 9.33.",
    kind: "education",
  },
  {
    period: "2025 — 2026",
    title: "Survival School",
    place: "FastAPI · PostgreSQL · Redis · Next.js",
    detail: "An assessment platform with timed exams, server-side scoring, progress tracking, and QR-checkable certificates.",
    kind: "project",
  },
  {
    period: "2026",
    title: "Signal-Lite",
    place: "FastAPI · PostgreSQL · Redis · Next.js",
    detail: "A chat app project focused on login, token rotation, permissions, and WebSocket delivery.",
    kind: "project",
  },
  {
    period: "2026",
    title: "SaiU V2",
    place: "JavaScript · Offline-first PWA",
    detail: "A timetable and planner for students, with offline support and calendar export.",
    kind: "project",
  },
  {
    period: "2026",
    title: "Chandra's World",
    place: "Three.js · Interactive portfolio",
    detail: "A small 3D world I made to try real-time graphics in the browser. It has a guided tour, free walk, and a plain fallback page.",
    kind: "project",
  },
];
