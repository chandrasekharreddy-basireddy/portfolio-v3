export type ProjectLink = {
  label: string;
  url: string;
  kind: "live" | "source";
};

export type ImplementationNote = {
  heading: string;
  body: string;
};

export type Decision = {
  title: string;
  body: string;
};

export type Project = {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  summary: string;
  status: string;
  year: string;
  stack: string[];
  links: ProjectLink[];
  overview: string;
  problem: string;
  approach: string;
  implementation: ImplementationNote[];
  decisions: Decision[];
  challenges: ImplementationNote[];
  lessons: string[];
};

export const projects: Project[] = [
  {
    slug: "survival-school",
    index: "01",
    name: "Survival School",
    tagline: "A learning and assessment platform for university courses",
    summary:
      "Timed MCQ exams with server-authoritative scoring, QR-verifiable certificates, points and badges, timetables and real-time chat — built as a full-stack web app for university exam practice.",
    status: "Live · actively developed",
    year: "2025 — 2026",
    stack: ["FastAPI", "PostgreSQL", "Redis", "Next.js"],
    links: [
      { label: "Visit the live site", url: "https://survivalschool.vercel.app", kind: "live" },
      { label: "View source on GitHub", url: "https://github.com/chandrasekharreddy-basireddy/survivalschool", kind: "source" },
    ],
    overview:
      "Survival School is a web platform for running MCQ-driven practice and assessment: timed exams, a scoring system, certificates, and the surrounding features a course actually needs — schedules, points, badges and chat. It runs live today and is the project where I learned most of what I know about building a real full-stack application.",
    problem:
      "Exam practice at university is repetitive and disconnected — question banks in one place, timers nowhere, results on paper. Practising under real exam conditions (a clock, an enforced submission, a score you can trust) shouldn't require anyone to print anything. I wanted a single place where a course could set timed MCQ papers and students could actually rehearse them.",
    approach:
      "I built it as a proper product rather than a script: a FastAPI backend with PostgreSQL as the source of truth, Redis for the real-time and caching paths, and a Next.js frontend. The principle I held throughout: the server owns every number. Scores are computed server-side when an exam is submitted — the client sends answers, never marks.",
    implementation: [
      {
        heading: "Server-authoritative scoring",
        body: "Exam answers are evaluated entirely on the backend at submission time. Timed exams enforce their window server-side, so the score a student sees is the score the database recorded — not a value the browser decided.",
      },
      {
        heading: "Authentication and accounts",
        body: "User accounts with session handling protect exam state, personal points and badge progress, so results and certificates belong to the person who earned them.",
      },
      {
        heading: "Points, badges and certificates",
        body: "Progress is a first-class part of the platform: points accumulate from completed work, badges recognise milestones, and certificates are issued with QR verification so a printed certificate can be checked against the database rather than taken on faith.",
      },
      {
        heading: "Timetables and real-time chat",
        body: "Courses get schedules, and students get a real-time chat channel (Redis-backed) for the coordination that actually happens around exams.",
      },
    ],
    decisions: [
      {
        title: "The client never grades itself",
        body: "It would have been far simpler to score quizzes in the browser. Keeping every mark server-side costs more work up front but makes results worth having — and it set the pattern I later applied to auth in Signal-Lite.",
      },
      {
        title: "PostgreSQL as the single source of truth",
        body: "Redis accelerates the real-time paths, but anything that must survive — submissions, scores, certificates — lives in Postgres. That separation kept the data model honest.",
      },
    ],
    challenges: [
      {
        heading: "Learning databases, auth and deployment at the same time",
        body: "This project was my introduction to all three. Most of the hard days were schema design questions and 'where does this state actually live' decisions — the kind of thing you only feel once the data is real.",
      },
    ],
    lessons: [
      "Designing a schema for real usage teaches more than any tutorial — wrong assumptions show up as queries you can't write.",
      "Server-authoritative design isn't extra work; it's the same work done in the right place.",
      "Deployment is part of the product. A feature that isn't running isn't finished.",
    ],
  },
  {
    slug: "signal-lite",
    index: "02",
    name: "Signal-Lite",
    tagline: "A security-first real-time messaging platform",
    summary:
      "A chat platform built the careful way: phone/OTP login, rotating refresh tokens, server-side authorization on every resource, and WebSocket fan-out over Redis — with Docker Compose infrastructure and a CI-enforced policy of no AI features in the product surface.",
    status: "In development · source available",
    year: "2026",
    stack: ["FastAPI", "PostgreSQL", "Redis", "Next.js", "Docker"],
    links: [
      { label: "View source on GitHub", url: "https://github.com/chandrasekharreddy-basireddy/Runnerup--chat", kind: "source" },
    ],
    overview:
      "Signal-Lite started as a simple question — how do chat applications actually work? — and turned into a systematic build of one, with security treated as the primary feature rather than something added at the end. The backend runs on FastAPI with async SQLAlchemy, PostgreSQL as the durable store, Redis for pub/sub and rate limiting, and private object storage for uploads. The frontend is Next.js with TypeScript and Tailwind.",
    problem:
      "Chat looks like the simplest app imaginable until you start asking what happens when a token is stolen, when a message races a reconnect, or when a client asks for a conversation it shouldn't see. I wanted to build the version of a chat app where those questions all have explicit answers, and understand each mechanism by implementing it rather than trusting a framework to do it quietly.",
    approach:
      "Every mechanism was implemented deliberately, from first principles where it mattered: how sessions are issued, how refresh tokens rotate, how a WebSocket connection is authorised, how a message becomes durable. The guiding rule — never trust a client-supplied identity — is enforced at the API layer, not by convention in the frontend.",
    implementation: [
      {
        heading: "Phone / OTP authentication",
        body: "HMAC-hashed single-use codes with short TTLs, attempt ceilings, and per-phone, per-IP and global sliding-window rate limits. Codes are compared in constant time, and responses are identical whether or not an account exists — so the login flow doesn't leak which numbers are registered.",
      },
      {
        heading: "Session and refresh-token handling",
        body: "Ten-minute access JWTs paired with opaque 256-bit refresh tokens stored only as SHA-256 digests. Refresh tokens rotate on every use, live in an HttpOnly/Secure/SameSite=Strict cookie scoped to the refresh path, and belong to a token family — reuse of a rotated token revokes the whole family and writes a security event. A double-submit CSRF token plus origin checking guards the cookie-authenticated endpoints.",
      },
      {
        heading: "Authorization on every resource",
        body: "Every conversation, message, attachment and admin resource resolves through a membership or role check against server-side state. No route trusts a client-supplied user id, role or conversation id. RBAC covers both system roles and per-conversation roles, resolved to explicit permission sets.",
      },
      {
        heading: "Real-time messaging",
        body: "WebSocket connections authenticate through a single-use Redis ticket handshake — no token in the query string — with per-connection subscription authorization, payload size caps and rate limits, heartbeats, and Redis pub/sub fan-out. Messages get server-assigned sequence numbers, idempotency on a client message id, cursor pagination, and a sync_after cursor replay for reconnects.",
      },
      {
        heading: "Uploads and storage",
        body: "Files upload through presigned PUTs to private object storage under random keys. A server-side finalize step verifies real size and magic bytes before anything becomes reachable, display filenames are sanitized, and downloads happen through short-lived signed URLs.",
      },
      {
        heading: "Frontend behaviour",
        body: "The Next.js client keeps the access token in memory with silent refresh, renders a virtualized message list, sends optimistically with explicit SENDING → SENT → DELIVERED → READ and a FAILED + retry state, shows typing indicators and presence, reconnects with exponential backoff and jitter, and renders message content as plain text only.",
      },
      {
        heading: "Infrastructure",
        body: "Docker Compose runs the whole stack — Postgres, Redis, MinIO, the API, a worker, the web app and nginx for TLS termination — with a least-privilege database role. Structured JSON logging carries request ids, with a separate audit log and security event log.",
      },
    ],
    decisions: [
      {
        title: "Opaque refresh tokens over more JWTs",
        body: "Refresh tokens are random 256-bit values stored as digests, not JWTs. That makes rotation and family-based reuse detection a database lookup instead of a cryptographic puzzle, and revocation actually revokes.",
      },
      {
        title: "Redis tickets for WebSocket auth",
        body: "Passing a token in the WebSocket query string puts credentials in logs. A single-use ticket exchanged during the handshake keeps the credential out of URLs while still authorising each connection against server-side state.",
      },
      {
        title: "Membership-filtered search",
        body: "Full-text search runs through the same membership checks as normal reads before it touches the index. A search that returns a message you can't otherwise see is the same bug as an unauthorized GET.",
      },
      {
        title: "No AI anywhere in the product",
        body: "No smart replies, no summaries, no assistants. It's a policy the repository enforces in CI — a deliberate engineering constraint, not a marketing position.",
      },
    ],
    challenges: [
      {
        heading: "Scope discipline in a large system",
        body: "A messaging platform is unbounded. The remaining phases — push notifications, a moderation dashboard, channel discovery, malware scanning, E2EE key transport — are scaffolded with real interfaces but deliberately not finished, tracked in a build-order roadmap rather than half-built.",
      },
      {
        heading: "Getting security details right simultaneously",
        body: "Token rotation, CSRF, rate limiting and authorization interact. Several bugs only appeared when testing flows end-to-end — for example, the interplay between silent refresh in the frontend and family revocation on the backend.",
      },
    ],
    lessons: [
      "Most web security is a small set of invariants applied without exception — the work is in never making an exception.",
      "Real-time systems need explicit reconciliation: sequence numbers, idempotency and cursor replay exist because networks fail in the middle of things.",
      "Scaffolding an honest interface beats faking a finished feature.",
    ],
  },
  {
    slug: "chandras-world",
    index: "03",
    name: "Chandra's World",
    tagline: "A 3D portfolio you can walk through",
    summary:
      "A real-time Three.js world — a guided trail from a mountain camp to a final viewpoint — with a full day/night cycle, four seasons, weather, wildlife, achievements and a headless CI harness that walks the entire world on every push.",
    status: "Live · source available",
    year: "2026",
    stack: ["Three.js", "JavaScript", "GitHub Actions"],
    links: [
      { label: "Walk through the world", url: "https://chandrasekharreddy-basireddy.github.io/portfolio-3d/", kind: "live" },
      { label: "View source on GitHub", url: "https://github.com/chandrasekharreddy-basireddy/portfolio-3d", kind: "source" },
    ],
    overview:
      "Instead of another scrolling page, I turned my portfolio into a small explorable 3D world built with Three.js (r128, vendored locally): a rigged character walks a trail of about seventy metres from a mountain camp down to a final viewpoint, passing six information stations that hold the actual portfolio content — about, skills, projects, education, contact.",
    problem:
      "I didn't know how real-time 3D on the web actually works — scenes, rigs, animation blending, lighting, the frame budget. Reading about it wasn't going to close that gap. A portfolio is the one project where the subject is already me, so it became the testbed: build a world where the content lives inside the environment, and let the engineering problems surface themselves.",
    approach:
      "The world is the interface. The default experience is a scroll-driven guided journey — scroll to walk, and stations open their content cards as you reach them. A free-walk mode (WASD, run, jump, an interaction key) exists for people who want to explore, and a static classic.html fallback serves the same content without WebGL. Content and engine are separated cleanly: all portfolio data lives in one module that every UI in the world reads from.",
    implementation: [
      {
        heading: "World and atmosphere",
        body: "Terrain, vegetation, a river with a waterfall and a pond, a full day/night cycle, four seasons and weather. Zones give the trail structure: a camp at the summit, a skills forest with fourteen inspectable crystals, a project district with rotating architecture holograms, a small university campus, a waystation that tracks discovery, and a deck with a telescope at the end.",
      },
      {
        heading: "Characters and wildlife",
        body: "A rigged character with a walk cycle, plus a fox that wanders, idles and follows you, a wolf patrol, a horse, a peacock, a toucan, a monkey that hops between rocks, birds that land and take off, fish and butterflies. Behaviour is deliberately simple — small state machines — because believable motion comes from timing and variety, not complexity.",
      },
      {
        heading: "Modes and persistence",
        body: "Guided tour, free walk, photo mode (which saves a PNG), a cinematic camera, jump-to navigation and a pause menu. Progress — stations visited, orbs collected, achievements, playtime — persists in localStorage, so the world remembers where you left off.",
      },
      {
        heading: "Performance engineering",
        body: "Quality presets, an FPS watchdog that steps quality down once on struggling devices, pooled footprints and decals, and a throttled minimap. Three.js is vendored rather than loaded from a CDN, so the world works offline and never races a third-party script.",
      },
      {
        heading: "Testing a 3D scene in CI",
        body: "Every push runs a headless harness on GitHub Actions that boots the real page, drives the full journey — intro, every station, the ending — plus free walk, skill inspection, project dossiers, game modes, seasons and persistence, and fails the build on any runtime error.",
      },
    ],
    decisions: [
      {
        title: "Content in one module, world reads from it",
        body: "Every card, board, quest and dialog renders from a single data module. The 3D world, the fallback page and the test harness all consume the same source of truth, which is also how the CI harness can assert the content actually appears.",
      },
      {
        title: "A no-WebGL fallback instead of a loader wall",
        body: "If WebGL isn't available, classic.html serves the same content as a static page. A portfolio that renders nothing for some visitors is worse than a plain page that renders for everyone.",
      },
      {
        title: "Vendored Three.js",
        body: "One file, no CDN dependency, works offline. For a single-page experience this was a straightforward trade — dependency freshness was worth less than reliability.",
      },
    ],
    challenges: [
      {
        heading: "Character animation from scratch",
        body: "Making a rigged model walk convincingly — footfall timing, blending between idle and walk, turning — was the hardest purely creative-technical problem. It's still rough, but it's mine and I understand every part of it.",
      },
      {
        heading: "Frame budget on mid-range hardware",
        body: "Lighting, water, wildlife and decals compete for the same 16ms. The FPS watchdog and pooling exist because early versions of the world ran beautifully on my machine and badly on phones.",
      },
    ],
    lessons: [
      "Real-time 3D is mostly budgeting — everything you add is paid for in frame time.",
      "Automated testing of an interactive experience is possible if content and engine are separated properly.",
      "Playful constraints (a trail, seasons, a fox) solve design problems — they give a world reasons to be explored.",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
