export type ProjectLink = {
  label: string;
  url: string;
  kind: "live" | "source";
};

export type Project = {
  slug: string;
  index: string;
  year: string;
  name: string;
  tagline: string;
  summary: string;
  status: string;
  stack: string[];
  links: ProjectLink[];
  overview: string;
  problem: string;
  approach: string;
  implementation: { heading: string; body: string }[];
  decisions: { title: string; body: string }[];
  whatBroke: { heading: string; body: string }[];
  lessons: string[];
};

export const projects: Project[] = [
  {
    slug: "survival-school",
    index: "01",
    year: "2025–2026",
    name: "Survival School",
    tagline: "A learning and assessment platform for university courses",
    summary:
      "Timed MCQ exams with server-authoritative scoring, QR-verifiable certificates, points, badges, timetables and real-time chat. Built as a full-stack web app for university exam practice.",
    status: "Live",
    stack: ["FastAPI", "PostgreSQL", "Redis", "Next.js"],
    links: [
      { label: "Visit the live site", url: "https://survivalschool.vercel.app", kind: "live" },
      { label: "View on GitHub", url: "https://github.com/chandrasekharreddy-basireddy/survivalschool", kind: "source" },
    ],
    overview:
      "Survival School is a web platform for running MCQ-driven practice and assessment. Timed exams, a scoring system, certificates, and the features a course actually needs around them: schedules, points, badges and chat. It runs live today, and it is the project where I learned most of what I know about building a real full-stack application.",
    problem:
      "Exam practice at university is repetitive and disconnected. Question banks live in one place, timers exist nowhere, and results come back on paper. Practising under real exam conditions needs a clock, an enforced submission, and a score you can trust. I wanted one place where a course could set timed MCQ papers and students could rehearse them properly.",
    approach:
      "I built it as a product rather than a script: a FastAPI backend, PostgreSQL as the source of truth, Redis for the real-time paths, and a Next.js frontend. One principle held throughout. The server owns every number. Scores are computed server-side at submission; the client sends answers, never marks.",
    implementation: [
      {
        heading: "Server-authoritative scoring",
        body: "Exam answers are evaluated entirely on the backend at submission time, and timed exams enforce their window server-side. The score a student sees is the score the database recorded, not a value the browser decided.",
      },
      {
        heading: "Accounts and authentication",
        body: "User accounts with session handling protect exam state, personal points and badge progress. Results and certificates belong to the person who earned them.",
      },
      {
        heading: "Points, badges and verifiable certificates",
        body: "Progress is a first-class part of the platform. Points accumulate from completed work, badges recognise milestones, and certificates carry QR verification, so a printed certificate can be checked against the database rather than taken on faith.",
      },
      {
        heading: "Timetables and real-time chat",
        body: "Courses get schedules. Students get a Redis-backed real-time chat channel for the coordination that actually happens around exams.",
      },
    ],
    decisions: [
      {
        title: "The client never grades itself",
        body: "Scoring quizzes in the browser would have been simpler. Keeping every mark server-side cost real work up front, but it makes results worth having. It also set the pattern I later applied to auth in Signal-Lite.",
      },
      {
        title: "PostgreSQL as the single source of truth",
        body: "Redis accelerates the real-time paths. Anything that must survive lives in Postgres: submissions, scores, certificates. That separation kept the data model honest and made the QR verification of certificates possible in the first place.",
      },
      {
        title: "Scope held to a course's real needs",
        body: "A platform like this can grow forever. I kept the feature set to what a university course actually uses for exam practice, and left the rest out on purpose.",
      },
    ],
    whatBroke: [
      {
        heading: "Learning three hard things at once",
        body: "This project was my introduction to databases, auth and deployment at the same time. Most of the hard days were schema design questions and decisions about where state actually lives. Wrong assumptions about how results would be queried showed up later as queries I couldn't write, and I rebuilt parts of the schema more than once.",
      },
      {
        heading: "Bugs that only appeared with real data",
        body: "The defects that taught me the most didn't show up with test fixtures. They showed up once real exams, real submissions and real concurrent users existed.",
      },
    ],
    lessons: [
      "Designing a schema for real usage teaches more than any tutorial.",
      "Server-authoritative design isn't extra work. It's the same work done in the right place.",
      "Deployment is part of the product. A feature that isn't running isn't finished.",
    ],
  },
  {
    slug: "signal-lite",
    index: "02",
    year: "2026",
    name: "Signal-Lite",
    tagline: "A security-first real-time messaging platform",
    summary:
      "A chat platform built the careful way. Phone/OTP login, rotating refresh tokens, server-side authorization on every resource, and WebSocket fan-out over Redis. Docker Compose infrastructure, with a CI-enforced policy of no AI features in the product surface.",
    status: "In development",
    stack: ["FastAPI", "PostgreSQL", "Redis", "Next.js", "Docker"],
    links: [
      { label: "View on GitHub", url: "https://github.com/chandrasekharreddy-basireddy/Runnerup--chat", kind: "source" },
    ],
    overview:
      "Signal-Lite started as a simple question: how do chat applications actually work? Building the answer turned into a systematic project where security is the primary feature, not something added at the end. The backend runs FastAPI with async SQLAlchemy, PostgreSQL as the durable store, Redis for pub/sub and rate limiting, and private object storage for uploads. The frontend is Next.js with TypeScript and Tailwind.",
    problem:
      "Chat looks like the simplest app imaginable until you start asking real questions. What happens when a token is stolen? When a message races a reconnect? When a client asks for a conversation it shouldn't see? I wanted to build the version of a chat app where those questions all have explicit answers, and to understand each mechanism by implementing it rather than trusting a framework to do it quietly.",
    approach:
      "Every mechanism was implemented deliberately, from first principles where it mattered. How sessions are issued, how refresh tokens rotate, how a WebSocket connection is authorised, how a message becomes durable. The guiding rule is that no route trusts a client-supplied identity, and it is enforced at the API layer rather than by convention in the frontend.",
    implementation: [
      {
        heading: "Phone/OTP authentication",
        body: "HMAC-hashed single-use codes with short TTLs, attempt ceilings, and per-phone, per-IP and global sliding-window rate limits. Codes are compared in constant time. Responses are identical whether or not an account exists, so the login flow doesn't leak which numbers are registered.",
      },
      {
        heading: "Sessions and refresh-token handling",
        body: "Ten-minute access JWTs paired with opaque 256-bit refresh tokens, stored only as SHA-256 digests. Refresh tokens rotate on every use and live in an HttpOnly/Secure/SameSite=Strict cookie scoped to the refresh path. Each belongs to a token family: reuse of a rotated token revokes the whole family and writes a security event. A double-submit CSRF token plus origin checking guards the cookie-authenticated endpoints.",
      },
      {
        heading: "Authorization on every resource",
        body: "Every conversation, message, attachment and admin resource resolves through a membership or role check against server-side state. No route trusts a client-supplied user id, role or conversation id. RBAC covers both system roles and per-conversation roles, resolved to explicit permission sets.",
      },
      {
        heading: "Real-time messaging",
        body: "WebSocket connections authenticate through a single-use Redis ticket handshake, so no token ever sits in the query string. Per-connection subscription authorization, payload size caps and rate limits, heartbeats, and Redis pub/sub fan-out. Messages get server-assigned sequence numbers, idempotency on a client message id, cursor pagination, and a sync_after cursor replay for reconnects.",
      },
      {
        heading: "Uploads and storage",
        body: "Files upload through presigned PUTs to private object storage under random keys. A server-side finalize step verifies real size and magic bytes before anything becomes reachable. Display filenames are sanitized, and downloads go through short-lived signed URLs.",
      },
      {
        heading: "Frontend behaviour",
        body: "The Next.js client keeps the access token in memory with silent refresh, renders a virtualized message list, and sends optimistically with explicit SENDING, SENT, DELIVERED and READ states plus a FAILED retry. Typing indicators, presence, reconnect with exponential backoff and jitter, and message content rendered as plain text only.",
      },
      {
        heading: "Infrastructure",
        body: "Docker Compose runs the whole stack: Postgres, Redis, MinIO, the API, a worker, the web app, and nginx for TLS termination, with a least-privilege database role. Structured JSON logging carries request ids, with a separate audit log and security event log.",
      },
    ],
    decisions: [
      {
        title: "Opaque refresh tokens over more JWTs",
        body: "Refresh tokens are random 256-bit values stored as digests, not JWTs. Rotation and family-based reuse detection become a database lookup instead of a cryptographic puzzle, and revocation actually revokes.",
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
        body: "No smart replies, no summaries, no assistants. The repository enforces this in CI. It is a deliberate engineering constraint, not a marketing position.",
      },
    ],
    whatBroke: [
      {
        heading: "Getting security details right simultaneously",
        body: "Token rotation, CSRF, rate limiting and authorization interact. Several bugs only appeared when testing flows end to end. The interplay between silent refresh in the frontend and family revocation on the backend was the worst of them.",
      },
      {
        heading: "Scope discipline in a large system",
        body: "A messaging platform is unbounded. The remaining phases are scaffolded with real interfaces but deliberately not finished: push notifications, a moderation dashboard, channel discovery, malware scanning, E2EE key transport. A build-order roadmap tracks them so nothing gets half-built.",
      },
    ],
    lessons: [
      "Most web security is a small set of invariants applied without exception. The work is in never making an exception.",
      "Real-time systems need explicit reconciliation. Sequence numbers, idempotency and cursor replay exist because networks fail in the middle of things.",
      "Scaffolding an honest interface beats faking a finished feature.",
    ],
  },
  {
    slug: "chandras-world",
    index: "03",
    year: "2026",
    name: "Chandra's World",
    tagline: "A 3D portfolio you can walk through",
    summary:
      "A real-time Three.js world: a guided trail from a mountain camp to a final viewpoint, with a full day/night cycle, four seasons, weather, wildlife, achievements, and a headless CI harness that walks the entire world on every push.",
    status: "Live",
    stack: ["Three.js", "JavaScript", "GitHub Actions"],
    links: [
      { label: "Visit the live site", url: "https://chandrasekharreddy-basireddy.github.io/portfolio-3d/", kind: "live" },
      { label: "View on GitHub", url: "https://github.com/chandrasekharreddy-basireddy/portfolio-3d", kind: "source" },
    ],
    overview:
      "Instead of another scrolling page, I turned my portfolio into a small explorable 3D world built with Three.js. A rigged character walks a trail of about seventy metres from a mountain camp down to a final viewpoint, passing six information stations that hold the actual portfolio content: about, skills, projects, education, contact.",
    problem:
      "I didn't know how real-time 3D on the web works. Scenes, rigs, animation blending, lighting, the frame budget. Reading about it wasn't going to close that gap, and a portfolio is the one project where the subject is already me. So it became the testbed. Build a world where the content lives inside the environment, and let the engineering problems surface themselves.",
    approach:
      "The world is the interface. The default experience is a scroll-driven guided walk where stations open their content cards as you reach them. A free-walk mode with WASD, run, jump and an interaction key exists for people who want to explore, and a static fallback page serves the same content without WebGL. Content and engine are separated cleanly: all portfolio data lives in one module that every UI in the world reads from.",
    implementation: [
      {
        heading: "The world",
        body: "Terrain, vegetation, a river with a waterfall and a pond, a full day/night cycle, four seasons and weather. Zones give the trail structure: a camp at the summit, a skills forest with fourteen inspectable crystals, a project district with rotating architecture holograms, a small university campus, a waystation that tracks discovery, and a viewing deck with a telescope at the end.",
      },
      {
        heading: "Wildlife and characters",
        body: "A rigged character with a walk cycle, plus a fox that wanders, idles and follows you, a wolf patrol, a horse, a peacock, a toucan, a monkey that hops between rocks, birds that land and take off, fish and butterflies. The behaviour is deliberately simple, small state machines. Believable motion comes from timing and variety, not complexity.",
      },
      {
        heading: "Modes and persistence",
        body: "Guided tour, free walk, photo mode that saves a PNG, a cinematic camera, jump-to navigation and a pause menu. Progress persists in localStorage, so the world remembers stations visited, orbs collected, achievements and playtime.",
      },
      {
        heading: "Performance",
        body: "Quality presets, an FPS watchdog that steps quality down once on struggling devices, pooled footprints and decals, and a throttled minimap. Three.js is vendored rather than loaded from a CDN, so the world works offline and never races a third-party script.",
      },
      {
        heading: "Headless CI testing",
        body: "Every push runs a headless harness on GitHub Actions that boots the real page and drives the full journey, every station through the ending, plus free walk, skill inspection, project dossiers, game modes, seasons and persistence. The build fails on any runtime error.",
      },
    ],
    decisions: [
      {
        title: "Content in one module",
        body: "Every card, board, quest and dialog renders from a single data module. The 3D world, the fallback page and the test harness all consume the same source of truth. That is also how the CI harness can assert the content actually appears.",
      },
      {
        title: "A no-WebGL fallback",
        body: "If WebGL isn't available, a static page serves the same content. A portfolio that renders nothing for some visitors is worse than a plain page that renders for everyone.",
      },
      {
        title: "Vendored Three.js",
        body: "One file, no CDN dependency, works offline. For a single-page experience this was a straightforward trade: dependency freshness was worth less than reliability.",
      },
    ],
    whatBroke: [
      {
        heading: "Character animation",
        body: "Making a rigged model walk convincingly was the hardest problem in the project. Footfall timing, blending between idle and walk, turning. It is still a little rough, but I understand every part of it.",
      },
      {
        heading: "Frame budget",
        body: "Lighting, water, wildlife and decals compete for the same sixteen milliseconds. The FPS watchdog and pooling exist because early versions ran beautifully on my machine and badly on phones.",
      },
    ],
    lessons: [
      "Real-time 3D is mostly budgeting. Everything you add is paid for in frame time.",
      "Automated testing of an interactive experience is possible when content and engine are separated properly.",
      "Playful constraints solve design problems. A trail, seasons and a fox give a world reasons to be explored.",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
