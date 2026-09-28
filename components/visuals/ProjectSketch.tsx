import styles from "./ProjectSketch.module.css";

type ProjectSketchProps = {
  slug: string;
  name: string;
};

function ExamSketch() {
  return (
    <svg viewBox="0 0 520 320" role="img" aria-label="Sketch of an exam submission being checked and saved">
      <path className={styles.pencil} d="M70 83 C113 78 156 80 198 82 M74 88 C112 86 153 87 194 86" />
      <path className={styles.pencilLight} d="M73 99 L179 99 M72 108 L158 108" />
      <text className={styles.label} x="73" y="68">student takes exam</text>
      <path className={styles.arrow} d="M216 93 C246 91 266 94 292 92" />
      <path className={styles.arrowHead} d="M284 86 L294 92 L284 98" />
      <path className={styles.box} d="M305 54 C349 51 408 54 450 55 L448 129 C403 131 350 130 306 128 Z" />
      <path className={styles.pencilLight} d="M318 75 L427 75 M318 88 L410 88" />
      <text className={styles.label} x="318" y="113">API checks answers</text>
      <path className={styles.arrow} d="M378 145 C379 169 380 181 380 201" />
      <path className={styles.arrowHead} d="M374 193 L380 203 L386 193" />
      <ellipse className={styles.box} cx="380" cy="246" rx="77" ry="35" />
      <path className={styles.pencilLight} d="M327 239 C353 233 405 234 431 239 M329 248 C357 244 402 245 430 249" />
      <text className={styles.label} x="337" y="267">saved result</text>
      <path className={styles.noteLine} d="M73 225 C125 218 175 220 227 226" />
      <text className={styles.note} x="74" y="214">the browser doesn't decide the score</text>
      <path className={styles.noteLine} d="M226 218 C257 199 270 161 310 133" />
    </svg>
  );
}

function ChatSketch() {
  return (
    <svg viewBox="0 0 520 320" role="img" aria-label="Sketch showing chat messages checked against conversation membership before delivery">
      <path className={styles.box} d="M54 77 C99 72 166 75 211 77 L209 144 C163 147 100 146 55 144 Z" />
      <text className={styles.label} x="71" y="101">send message</text>
      <path className={styles.pencilLight} d="M72 115 L170 115 M72 127 L146 127" />
      <path className={styles.arrow} d="M228 109 C256 106 272 109 299 108" />
      <path className={styles.arrowHead} d="M291 102 L301 108 L291 114" />
      <path className={styles.box} d="M310 70 C354 67 413 71 460 70 L458 153 C412 155 359 153 311 154 Z" />
      <text className={styles.label} x="330" y="98">check membership</text>
      <text className={styles.small} x="330" y="119">server-side</text>
      <path className={styles.pencilLight} d="M329 132 L431 132" />
      <path className={styles.arrow} d="M382 170 C381 185 382 194 382 204" />
      <path className={styles.arrowHead} d="M376 197 L382 207 L388 197" />
      <path className={styles.box} d="M310 214 C354 211 413 214 458 214 L456 279 C410 281 357 279 311 280 Z" />
      <text className={styles.label} x="330" y="239">authorized?</text>
      <text className={styles.small} x="330" y="258">yes → deliver</text>
      <text className={styles.small} x="330" y="274">no → stop</text>
      <text className={styles.note} x="67" y="262">permissions are checked before delivery</text>
      <path className={styles.noteLine} d="M68 270 C110 280 185 279 248 247" />
    </svg>
  );
}

function TimetableSketch() {
  return (
    <svg viewBox="0 0 520 320" role="img" aria-label="Diagram of a timetable moving from a published sheet into an offline student planner">
      <path className={styles.box} d="M55 70 C96 68 151 71 195 70 L195 162 C150 164 99 162 56 163 Z" />
      <text className={styles.label} x="77" y="98">published sheet</text>
      <text className={styles.small} x="77" y="120">rows of classes</text>
      <path className={styles.pencilLight} d="M77 135 L169 135 M77 148 L153 148" />

      <path className={styles.arrow} d="M207 116 C236 114 253 116 281 115" />
      <path className={styles.arrowHead} d="M273 109 L283 115 L273 121" />

      <path className={styles.box} d="M295 62 C340 60 398 63 451 62 L449 161 C401 163 347 160 296 162 Z" />
      <text className={styles.label} x="316" y="91">timetable</text>
      <text className={styles.small} x="316" y="113">next class · conflicts</text>
      <text className={styles.small} x="316" y="133">free time · calendar</text>
      <path className={styles.pencilLight} d="M316 145 L424 145" />

      <path className={styles.arrow} d="M372 177 C372 196 372 206 372 223" />
      <path className={styles.arrowHead} d="M366 216 L372 226 L378 216" />
      <path className={styles.box} d="M283 235 C331 232 413 235 462 234 L461 281 C411 283 336 281 284 282 Z" />
      <text className={styles.label} x="303" y="260">saved for offline use</text>

      <text className={styles.note} x="57" y="239">still there between classes,</text>
      <text className={styles.note} x="57" y="260">even when the network isn't</text>
      <path className={styles.noteLine} d="M75 268 C116 285 209 283 269 265" />
    </svg>
  );
}

export function ProjectSketch({ slug, name }: ProjectSketchProps) {
  const note =
    slug === "survival-school"
      ? "Scoring flow"
      : slug === "signal-lite"
        ? "Permission check"
        : "Timetable flow";
  const sketch =
    slug === "survival-school" ? (
      <ExamSketch />
    ) : slug === "signal-lite" ? (
      <ChatSketch />
    ) : (
      <TimetableSketch />
    );

  return (
    <figure className={styles.sheet}>
      <figcaption className={styles.caption}>
        <span>{note}</span>
        <span>{name}</span>
      </figcaption>
      <div className={styles.drawing}>{sketch}</div>
    </figure>
  );
}
