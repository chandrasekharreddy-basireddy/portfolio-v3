import styles from "./visuals.module.css";

/**
 * Stylised map of the actual portfolio-3d world: a ~70 m trail from the
 * mountain camp (north) to the final viewpoint (south), past the six real
 * information stations.
 */
export function WorldVisual() {
  return (
    <>
      <div className={styles.mapFrame}>
        <svg
          className={styles.worldMap}
          viewBox="0 0 340 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Map of the portfolio world: a trail running from the mountain camp in the north, past the skills forest, project district and university campus, to the final viewpoint in the south"
        >
          {/* terrain contour hints */}
          <path d="M40 210 Q 90 170 70 120 T 120 30" stroke="#e2ded4" fill="none" />
          <path d="M60 235 Q 110 195 95 145 T 140 45" stroke="#e2ded4" fill="none" />
          <path d="M270 220 Q 240 185 265 150 T 235 90" stroke="#e2ded4" fill="none" />

          {/* water: pond + river */}
          <ellipse cx="252" cy="88" rx="34" ry="18" fill="#e7ebee" />
          <path d="M252 106 C 250 140 230 150 210 158" stroke="#cfd8de" strokeWidth="3" fill="none" />

          {/* the trail */}
          <path
            d="M118 40 C 150 60 96 84 128 104 C 158 122 90 132 124 152 C 158 172 210 168 236 196 C 250 211 258 222 262 232"
            stroke="#191713"
            strokeWidth="1.5"
            strokeDasharray="5 4"
            fill="none"
          />

          {/* stations */}
          {[
            { x: 118, y: 40, n: "01", t: "CAMP · ABOUT" },
            { x: 84, y: 84, n: "02", t: "SKILLS FOREST" },
            { x: 158, y: 122, n: "03", t: "PROJECT DISTRICT" },
            { x: 100, y: 152, n: "04", t: "UNIVERSITY" },
            { x: 196, y: 168, n: "05", t: "WAYSTATION" },
            { x: 262, y: 232, n: "06", t: "VIEWPOINT" },
          ].map((s) => (
            <g key={s.n}>
              <circle cx={s.x} cy={s.y} r="5.5" fill="#f7f6f2" stroke="#a8490e" strokeWidth="1.2" />
              <circle cx={s.x} cy={s.y} r="1.6" fill="#a8490e" />
              <text
                x={s.x + 11}
                y={s.y - 6}
                fontFamily="IBM Plex Mono, monospace"
                fontSize="7.5"
                letterSpacing="0.08em"
                fill="#191713"
              >
                {s.t}
              </text>
            </g>
          ))}

          {/* north marker */}
          <g>
            <path d="M310 26 v-12 M310 14 l-3.5 5 M310 14 l3.5 5" stroke="#67625a" strokeWidth="1.2" />
            <text x="310" y="42" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="8" fill="#67625a">
              N
            </text>
          </g>
        </svg>
      </div>

      <div className={styles.mapCaption}>
        <span className={styles.vLabel}>Trail · ~70 m · 6 stations</span>
        <span className={styles.vLabel}>Day/night · 4 seasons</span>
      </div>
    </>
  );
}
