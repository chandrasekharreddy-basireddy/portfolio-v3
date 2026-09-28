type HeroDiagramProps = {
  className?: string;
};

/**
 * Static architecture sketch of the stack my projects are actually built on.
 * Pure SVG — no animation, no dependencies, sharp at any size.
 */
export function HeroDiagram({ className }: HeroDiagramProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 360 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Diagram: a Next.js client talking to a FastAPI backend backed by PostgreSQL and Redis, with a WebSocket channel between client and backend"
    >
      {/* frame */}
      <rect x="0.5" y="0.5" width="359" height="459" stroke="#cdc6b8" />

      {/* column guides */}
      <line x1="120.5" y1="1" x2="120.5" y2="459" stroke="#e2ded4" strokeDasharray="2 4" />
      <line x1="239.5" y1="1" x2="239.5" y2="459" stroke="#e2ded4" strokeDasharray="2 4" />

      {/* node: client */}
      <rect x="28" y="34" width="136" height="56" fill="#f7f6f2" stroke="#191713" />
      <text x="40" y="57" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#67625a">
        CLIENT
      </text>
      <text x="40" y="73" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#191713">
        Next.js / React
      </text>

      {/* node: api */}
      <rect x="196" y="34" width="136" height="56" fill="#191713" />
      <text x="208" y="57" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#a29c91">
        API
      </text>
      <text x="208" y="73" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#f7f6f2">
        FastAPI
      </text>

      {/* connector: client → api */}
      <path d="M164 62 H188" stroke="#191713" strokeWidth="1" />
      <path d="M188 62 L183 59 M188 62 L183 65" stroke="#191713" strokeWidth="1" />

      {/* label on connector */}
      <text x="176" y="52" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="8" fill="#a29c91">
        http
      </text>

      {/* connector: api → db */}
      <path d="M264 90 V150" stroke="#191713" strokeWidth="1" />
      <path d="M264 150 L261 145 M264 150 L267 145" stroke="#191713" strokeWidth="1" />

      {/* node: postgres */}
      <rect x="196" y="150" width="136" height="56" fill="#f7f6f2" stroke="#191713" />
      <text x="208" y="173" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#67625a">
        SOURCE OF TRUTH
      </text>
      <text x="208" y="189" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#191713">
        PostgreSQL
      </text>

      {/* connector: api → redis (angled) */}
      <path d="M196 90 L92 150" stroke="#191713" strokeWidth="1" />
      <path d="M92 150 L92.4 144.4 M92 150 L96.9 146.6" stroke="#191713" strokeWidth="1" />

      {/* node: redis */}
      <rect x="28" y="150" width="136" height="56" fill="#f7f6f2" stroke="#191713" />
      <text x="40" y="173" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#67625a">
        REAL-TIME
      </text>
      <text x="40" y="189" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#191713">
        Redis pub/sub
      </text>

      {/* websocket loop: client ←→ backend */}
      <path d="M96 90 V122 H264 V90" stroke="#a8490e" strokeWidth="1" />
      <path d="M264 90 L261 95 M264 90 L267 95" stroke="#a8490e" strokeWidth="1" />
      <path d="M96 90 L99 95 M96 90 L93 95" stroke="#a8490e" strokeWidth="1" />
      <text x="180" y="117" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="8" fill="#a8490e">
        websocket
      </text>

      {/* notes column */}
      <line x1="28" y1="248" x2="332" y2="248" stroke="#e2ded4" />

      <text x="28" y="278" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#a29c91">
        RULES
      </text>
      <text x="28" y="304" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#191713">
        01 — server owns the score
      </text>
      <text x="28" y="326" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#191713">
        02 — identity is never
      </text>
      <text x="28" y="344" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#191713">
        &nbsp;&nbsp;&nbsp;&nbsp;client-supplied
      </text>
      <text x="28" y="366" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#191713">
        03 — durable state lives
      </text>
      <text x="28" y="384" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#191713">
        &nbsp;&nbsp;&nbsp;&nbsp;in postgres
      </text>
      <text x="28" y="406" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#191713">
        04 — fall back, never fail
      </text>
      <text x="28" y="428" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#191713">
        &nbsp;&nbsp;&nbsp;&nbsp;silently
      </text>
    </svg>
  );
}
