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
    tagline: "Course exams and progress tracking",
    summary:
      "A course platform with timed exams, server-side scores, progress tracking, and certificates that can be checked by QR code.",
    status: "Live",
    stack: ["FastAPI", "PostgreSQL", "Redis", "Next.js"],
    links: [
      { label: "Visit the live site", url: "https://survivalschool.vercel.app", kind: "live" },
      { label: "View on GitHub", url: "https://github.com/chandrasekharreddy-basireddy/survivalschool", kind: "source" },
    ],
    overview:
      "I built Survival School as a place to run timed course exams and keep track of results. It also has course chat and certificates with QR verification.",
    problem:
      "I wanted practice to feel closer to sitting an exam: there should be a timer, a clear point when answers are submitted, and a result students can look up afterwards.",
    approach:
      "I made the API grade each submission instead of accepting a score calculated in the browser. PostgreSQL keeps exam results; Redis is used for the real-time features.",
    implementation: [
      {
        heading: "Exam submissions",
        body: "The API checks answers when an exam is submitted and enforces the time limit. The browser sends answers; it doesn't send a score to save.",
      },
      {
        heading: "Accounts",
        body: "Accounts keep each student's exam state, points, badges, results, and certificates attached to the right person.",
      },
      {
        heading: "Progress and certificates",
        body: "Students earn points and badges as they work. Each certificate has a QR code that can be checked against the stored result.",
      },
      {
        heading: "Schedules and course chat",
        body: "Courses can show timetables, and students can use a real-time chat channel to coordinate around their exams.",
      },
    ],
    decisions: [
      {
        title: "Keep grading on the API",
        body: "It would have been less work to calculate the score in the browser. I kept grading in the API so a modified client can't submit its own mark.",
      },
      {
        title: "Keep saved results in PostgreSQL",
        body: "Redis is useful for the real-time features, but exams and certificates need to remain available. I store those records in PostgreSQL.",
      },
      {
        title: "Start with the course workflow",
        body: "I focused on exams, schedules, results, and course chat instead of trying to turn the first version into a complete campus platform.",
      },
    ],
    whatBroke: [
      {
        heading: "Getting the data model wrong",
        body: "I was learning databases while building the app. I made assumptions about how results would be queried, then found those assumptions didn't fit the questions I needed to answer. I rebuilt parts of the schema.",
      },
      {
        heading: "Testing beyond the happy path",
        body: "Some problems only became obvious when exams had real submissions and more than one person was using the app. I had to think about how saved results behaved, not just whether a page loaded.",
      },
    ],
    lessons: [
      "I now think about how I will read data before I settle on a schema.",
      "Anything that affects a student's result belongs on the server.",
      "I count deployment and the problems it reveals as part of building the feature.",
    ],
  },
  {
    slug: "signal-lite",
    index: "02",
    year: "2026",
    name: "Signal-Lite",
    tagline: "A messaging app, still in development",
    summary:
      "I'm working through token rotation, conversation permissions, and reconnecting without losing messages.",
    status: "In development",
    stack: ["FastAPI", "PostgreSQL", "Redis", "Next.js", "Docker"],
    links: [
      { label: "View on GitHub", url: "https://github.com/chandrasekharreddy-basireddy/Runnerup--chat", kind: "source" },
    ],
    overview:
      "Signal-Lite is a chat app I'm building. I'm using it to work through login and session handling, permissions, and keeping messages in sync when a connection drops.",
    problem:
      "A chat screen is easy to draw. The less visible parts take more thought: who can read a conversation, what happens when a session expires, and how a reconnect catches up.",
    approach:
      "I started with server-side checks: validate the session, check conversation membership, then allow the socket or message request. Rotating refresh tokens and message cursors handle other failure cases.",
    implementation: [
      {
        heading: "Phone/OTP authentication",
        body: "Login codes are single-use, expire quickly, and have attempt limits. I rate-limit by phone number and IP, compare code hashes in constant time, and return the same response whether a number is registered or not.",
      },
      {
        heading: "Sessions and refresh-token handling",
        body: "Short-lived access tokens use a separate refresh token stored as a digest. Each refresh rotates the token; if an old one is reused, I revoke its token family. The refresh cookie is HttpOnly and SameSite=Strict, with CSRF and origin checks on the cookie-authenticated routes.",
      },
      {
        heading: "Conversation permissions",
        body: "The API checks membership and role before returning conversations, messages, or attachments. It uses server-side identity and permissions rather than trusting IDs or roles supplied by the browser.",
      },
      {
        heading: "Real-time messaging",
        body: "A one-use Redis ticket authenticates each WebSocket connection without putting a token in the URL. Messages get sequence numbers and client IDs so the app can avoid duplicates and catch up after reconnecting.",
      },
      {
        heading: "Uploads and storage",
        body: "Uploads go to private object storage using temporary signed URLs. Before a file is made available, the server checks its size and file type; downloads also use short-lived links.",
      },
      {
        heading: "The chat interface",
        body: "The Next.js app keeps the access token in memory, refreshes sessions quietly, and virtualizes long message lists. It shows send and delivery states, retries failed messages, and reconnects with backoff.",
      },
      {
        heading: "Infrastructure",
        body: "Docker Compose brings up PostgreSQL, Redis, MinIO, the API, a worker, the web app, and nginx. Request logs and security events are kept separately.",
      },
    ],
    decisions: [
      {
        title: "Use opaque refresh tokens",
        body: "I store a digest of a random refresh token instead of making the refresh token another JWT. That gives me a server-side record I can rotate and revoke.",
      },
      {
        title: "Keep tokens out of WebSocket URLs",
        body: "URLs can end up in logs. The client asks for a one-use Redis ticket, then uses that ticket to establish the socket connection.",
      },
      {
        title: "Check access before search results",
        body: "Search should not reveal a message to someone who can't open its conversation. I apply the membership check to search results too.",
      },
      {
        title: "No AI anywhere in the product",
        body: "I left generated replies and summaries out. I wanted this project to focus on the chat and session mechanics.",
      },
    ],
    whatBroke: [
      {
        heading: "The session edge cases",
        body: "Refresh rotation, CSRF checks, rate limits, and frontend retries all affect the same flow. I found problems by testing the full login-and-reconnect path, not by looking at each piece in isolation.",
      },
      {
        heading: "Keeping the scope manageable",
        body: "There is always another feature to add to a chat app. Push notifications, moderation, channel discovery, malware scanning, and end-to-end encryption are still unfinished; I haven't presented them as working features.",
      },
    ],
    lessons: [
      "A permission check matters on every route, not just the obvious ones.",
      "A reconnect needs a way to ask what arrived while the client was away.",
      "It is better to mark unfinished work than make a placeholder look complete.",
    ],
  },
  {
    slug: "saiu-v2",
    index: "03",
    year: "2026",
    name: "SaiU V2",
    tagline: "An offline-first toolkit for university life",
    summary:
      "A timetable and planning PWA that reads a live university schedule, works offline, and helps find free time between classes.",
    status: "Source available",
    stack: ["JavaScript", "Service Worker", "Google Sheets", "Node.js"],
    links: [
      { label: "View on GitHub", url: "https://github.com/chandrasekharreddy-basireddy/SaiU-V2", kind: "source" },
    ],
    overview:
      "SaiU V2 is a student companion built around the university timetable. It loads the schedule from a published Google Sheet, then adds timetable search, free-time checks, calendar export, and a small planner.",
    problem:
      "Timetable information is only useful if it is easy to check between classes and still available when the connection drops. I wanted to keep the timetable quick to open while adding a few things students repeatedly need.",
    approach:
      "The app reads the published schedule as CSV and caches a parsed copy for offline use. Small separate modules handle timetable questions, the planner, calendar export, and saved student preferences.",
    implementation: [
      {
        heading: "Timetable from a live sheet",
        body: "The app reads published Google Sheets CSV data, filters it by school and year, and shows current and upcoming classes. It keeps a matching cached timetable so the schedule is still available offline.",
      },
      {
        heading: "Find the gaps",
        body: "The timetable logic checks for overlapping classes and finds free periods. The app can also export a schedule as an .ics calendar file.",
      },
      {
        heading: "Planning and saved state",
        body: "A planner, notifications, schedule sharing, and progress features sit alongside the timetable. Student preferences and planner state are saved locally.",
      },
      {
        heading: "Offline support and checks",
        body: "A service worker caches the app shell and timetable data. The repository includes Node tests, source checks, and a GitHub Pages deployment workflow.",
      },
    ],
    decisions: [
      {
        title: "Keep the timetable useful offline",
        body: "The live sheet can be unreachable, so the app keeps a local timetable cache and falls back to it when fetching fails.",
      },
      {
        title: "Don't put Google sign-in in the way",
        body: "The published sheet is read as CSV in the app; students don't need a Google account just to look up a class.",
      },
      {
        title: "Build the timetable first",
        body: "The timetable remains the main screen. The planner, sharing, and progress features add to it rather than replacing the quick class lookup.",
      },
    ],
    whatBroke: [
      {
        heading: "When the sheet can't be reached",
        body: "A live data source can fail or change shape. The loader has to handle bad or missing rows and still give the student a usable cached timetable.",
      },
      {
        heading: "Making the extra features fit",
        body: "The project grew from a timetable into a larger student toolkit. Keeping the timetable easy to reach while adding planner and progress views is still a design constraint.",
      },
    ],
    lessons: [
      "A small offline cache changes how dependable a timetable feels.",
      "CSV is easy to publish, but the app still needs to validate the rows it receives.",
      "A student app can accumulate features quickly; the first screen still needs to do its job quickly.",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
